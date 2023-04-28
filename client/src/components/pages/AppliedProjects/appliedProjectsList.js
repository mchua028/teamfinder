import React,{useState,useEffect} from 'react';
import { Button, Grid, Stack, Container, Typography, TextField,Autocomplete,styled, Avatar, ButtonBase, TableRow, TableCell, TableHead,TableBody,TableContainer,Paper,Table,Box,IconButton,Chip,CircularProgress } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useRouteMatch,useHistory } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import AppliedProjectRow from './appliedProjectRow';
import TextInput from '../../TextInput';
import AutocompleteInput from '../../AutocompleteInput';
import Header from '../../Header';


import axios from 'axios';

import { getTokenFromStorage } from '../../utils/user-localstorage.util';

export default function AppliedProjectsList({ category }) {
    const token=getTokenFromStorage();
    const confirm = useConfirm();
    const history= useHistory();
    const isOffered=(category=='OFFERED')? true:false;

    const [projectDetails,setProjectDetails]=useState();

    const showProjectDetails=(row)=>{
        setProjectDetails(row);
    }

    const [projects,setProjects]=useState();

    useEffect(() => {
       function fetchData() {
        axios.get("http://localhost:3002/api/v1/application/user",
                          {
                            headers: ({
                                Authorization: 'Bearer ' + token
                            })
                          })
                          .then((res)=>{
                            console.log('res.data:',res.data);
                            setProjects(res.data.filter((project)=>project.status==category));
                          })
                          .catch((e)=>{
                            console.log(e.code);
                            if(e.code==='ERR_BAD_REQUEST'){
                            localStorage.clear();
                            history.push('/');
                            window.location.reload();
                            }
                            else{
                            alert('An unspecified error occured.');
                            }
                          }
                          );
      
      }
      fetchData();
    }, []);

    console.log('projects after useeffect:',projects);
    console.log('projectDetails:',projectDetails);

    return ((!projects)? (
        <Box sx={{textAlign:'center'}}>
              <CircularProgress sx={{color:"primary.contrastText"}}/>
        </Box>
      ):(
        <Box>
                <Stack direction="row">
                    <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            <Table sx={{backgroundColor:'transparent'}}>
                               
                                <TableBody sx={{overflow: "auto", height: "200px"}}>
                                {
                                    projects.map((row) => (                                        
                                        <AppliedProjectRow application={row} isOffered={isOffered} onSelect={() => showProjectDetails(row)}></AppliedProjectRow>                                       
                                ))
                                }
                                </TableBody>
                            </Table>
                    </TableContainer>
                    <Container sx={{width:"55%", margin:0,height:'500px',overflow:'auto'}}>
                        {(!projectDetails) ? (
                            <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose a project to view</Typography>
                        ):(
                                <Stack>
                                    <Typography variant="title1" color="turquoise.main">
                                        {projectDetails.projectId.projectName}
                                    </Typography>
                                    <Typography variant="subtitle2" color="#fff">
                                        by {projectDetails.projectId.createdBy.name}
                                    </Typography>
                                    <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                        {projectDetails.projectId.relatedKeywords.map((keyword)=>(
                                        <Typography variant='subtitle3' color='lightGray.main'>#{keyword}</Typography> 
                                        // label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                        ))}
                                    </Stack>
                                    
                                    <Typography color="secondary.main">
                                        Vacancies
                                    </Typography>
                                    <Typography color="primary.contrastText" sx={{mb:1}}>
                                        {projectDetails.projectId.vacancies}
                                    </Typography>
                                    <Typography color="secondary.main">
                                        Type of project
                                    </Typography>
                                    <Typography color="primary.contrastText" sx={{mb:1}}>
                                        {projectDetails.projectId.type}
                                    </Typography>
                                    <Typography color="secondary.main">
                                        Technical category
                                    </Typography>
                                    <Typography color="primary.contrastText" sx={{mb:1}}>
                                        {projectDetails.projectId.category}
                                    </Typography>
                                    <Typography color="secondary.main">
                                        Skills required
                                    </Typography>
                                    <Stack direction="row" spacing={0} marginBottom={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                        {projectDetails.projectId.skills.map((skill)=>(
                                        <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                        ))}
                                    </Stack>
                                    <Typography color="secondary.main">
                                        Brief description
                                    </Typography>
                                    <Typography color="primary.contrastText" sx={{mb:1}}>
                                        {projectDetails.projectId.briefDescription}
                                    </Typography>
                                    <Typography color="secondary.main">
                                        Progress and future plans
                                    </Typography>
                                    <Typography color="primary.contrastText" sx={{mb:1}}>
                                        {projectDetails.projectId.progressAndFuture}
                                    </Typography>

                                </Stack>
                        
                        )}
                    </Container>
                </Stack>
        </Box>
        
        
        
    )
    )
}