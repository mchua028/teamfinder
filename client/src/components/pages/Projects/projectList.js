import React,{useState,useEffect} from 'react';
import { Button, Grid, Stack, Container, Typography, TextField,Autocomplete,styled, Avatar, ButtonBase, TableRow, TableCell, TableHead,TableBody,TableContainer,Paper,Table,Box,IconButton,Chip,CircularProgress } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useRouteMatch } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import ProjectRow from './projectRow';
import TextInput from '../../TextInput';
import AutocompleteInput from '../../AutocompleteInput';


import axios from 'axios';

import { getTokenFromStorage } from '../../utils/user-localstorage.util';

export default function ProjectList({ category }) {
    const token=getTokenFromStorage();
    const confirm = useConfirm();

    const [projectDetails,setProjectDetails]=useState();

    const showProjectDetails=(row)=>{
        setProjectDetails(row);
    }

    const handleApply=(projectId)=>{
        console.log('applying to project '+projectId);
        confirm({ title: "Are you sure?",
        // description: "You cannot undo this action.", 
                    confirmationText: "Confirm", allowClose: false, dialogProps:{sx:{color:'#fff'}},titleProps:{sx:{color:'#fff'}},contentProps:{sx:{color:'#fff'}},
                    confirmationButtonProps:{sx:{textTransform: "none",color: "secondary.main",borderRadius: 30,fontSize: 15,paddingX:3}},
                    cancellationButtonProps:{sx:{textTransform: "none",color: "lightGray.main",borderRadius: 30,fontSize: 15,paddingX:3}} 
                })
        .then(() => {
            //set status of application to applied in backend
            axios.post("http://localhost:3002/api/v1/application/addApplication",
            {
                projectId: projectId,
                status: "NEW"
            },
            {
                headers: ({
                Authorization: 'Bearer ' + token
                })
            })
            .then((res) => {
                console.log('res.data:', res.data);
                alert("Applied to project successfully!");

            })
            .catch((e) => {
                alert(e);
            }
            );
        })
        .catch(() => {
            //do nothing
        });
    }
    
    const [projects,setProjects]=useState();
    const [appliedProjects,setAppliedProjects]=useState();

    const [searchNameField,setSearchNameField]=useState('');
    const [searchKeywordsField,setSearchKeywordsField]=useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);


    useEffect(() => {
       function fetchData() {
        if (category!=''){
          axios.get("http://localhost:3002/api/v1/project/byCategory/"+category,
                          {
                            headers: ({
                                Authorization: 'Bearer ' + token
                            })
                          })
                          .then((res)=>{
                            console.log('res.data:',res.data);
                            setProjects(res.data);
                          })
                          .catch((e)=>{
                            alert(e);
                          }
                          );
        }
        else{
            axios.get("http://localhost:3002/api/v1/project/",
                          {
                            headers: ({
                                Authorization: 'Bearer ' + token
                            })
                          })
                          .then((res)=>{
                            console.log('res.data:',res.data);
                            setProjects(res.data);
                          })
                          .catch((e)=>{
                            alert(e);
                          }
                          );
        }
        axios.get("http://localhost:3002/api/v1/application/user",
                          {
                            headers: ({
                                Authorization: 'Bearer ' + token
                            })
                          })
                          .then((res)=>{
                            console.log('res.data:',res.data);
                            const appliedProjectIds=res.data.map((appliedProject)=>{
                                return appliedProject.projectId;
                            });
                            setAppliedProjects(appliedProjectIds);
                          })
                          .catch((e)=>{
                            alert('error getting user applications:',e);
                            console.log(e);
                          }
                          );
        
      }
      fetchData();
    }, []);

    useEffect(() => {
        if (searchNameField.length||searchKeywordsField.length) {
          const filterProjects = projects.filter((project) => {
            return project.projectName.toLowerCase().includes(searchNameField.toLowerCase());
          })
          .filter((project)=>{
            return(
                searchKeywordsField.every((keyword) => {
                    return project.relatedKeywords.map((keyword)=>keyword.toLowerCase()).includes(keyword)
                })
            )
          });
          setFilteredProjects(filterProjects);
        } else {
          setFilteredProjects([]);
        }
      }, [searchNameField, searchKeywordsField, projects]);
  
    console.log('projects after useeffect:',projects);
    console.log('projectDetails:',projectDetails);
    console.log('filteredProjects:',filteredProjects);
    console.log('appliedProjects:',appliedProjects);

    return ((!projects)? (
        <Box sx={{textAlign:'center'}}>
              <CircularProgress sx={{color:"primary.contrastText"}}/>
        </Box>
      ):(
        <Box>
            <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'transparent',border:1,borderColor:'secondary.main',padding:2,height:'60px',mb:2,display: 'flex',alignItems:'center' }}>
                {/* <Stack direction="row" spacing={3} alignItems='center'> */}
                <Grid container spacing={3}>
                    <Grid item xs={0.8} alignItems='center' display='flex'>
                        <SearchIcon sx={{color:'lightGray.translucent'}}/>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField
                        fullWidth
                        size="small"
                        sx={{
                            input: {color: '#fff'},
                            '& label': {
                                color: '#fff',
                                '&.Mui-focused':{
                                color: '#fff',
                                }
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 10,
                                border:0,
                                backgroundColor: 'lightGray.translucent',
                                '& fieldset': {
                                    border: 0,
                                },
                                '&:hover fieldset': {
                                    border:0,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'lightGray.translucent',
                                },
                            },
                            
                        }}
                        label="Name"
                        autoComplete="searchNameField"
                        name="searchNameField"
                        value={searchNameField}
                        onChange={(e) => setSearchNameField(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Autocomplete
                        fullWidth
                        size="small"
                        sx={{
                            input: {color: '#fff'},
                            '& label': {
                                color: '#fff',
                                '&.Mui-focused':{
                                color: '#fff',
                                }
                            },
                            '& .MuiButtonBase-root':{
                                color: '#fff',
                                backgroundColor: 'lightGray.translucent',
                            },
                            '& .MuiIconButton-root':{
                                backgroundColor: 'transparent',
                            },
                            '& .MuiSvgIcon-root':{
                                color: '#fff',
                            },
                            
                            '& .MuiOutlinedInput-root': {
                                border:0,
                                borderRadius: 10,
                                backgroundColor: 'lightGray.translucent',
                                height: '40px', overflow: 'auto',
                                '& fieldset': {
                                    border:0,
                                    height: '40px', overflow: 'auto'
                                },
                                '&:hover fieldset': {
                                    border:0,
                                    height: '40px', overflow: 'auto'
                                },
                                '&.Mui-focused fieldset': {
                                    border:0,
                                    height: '40px', overflow: 'auto'
                                }
                            }
                        }}
                        name="searchKeywordsField"
                        multiple
                        freeSolo
                        options={[].map((option) => option)}
                        onChange={(event, newValue) => {
                            setSearchKeywordsField(newValue);
                            console.log(searchKeywordsField);
                        }}
                    
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Keywords"
                            />
                        )}
                        ListboxProps={{
                            style: { color: "#fff",height: '40px', overflow: 'auto' }
                        }}
                        />
                    </Grid>
                </Grid>
                
        </Box>
        <Stack direction="row">
            <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                    <Table sx={{backgroundColor:'transparent'}}>
                        {/* <TableHead>
                        <TableRow sx={{borderBottom:1,borderColor:"secondary.main"}}>
                            <TableCell sx={{color:'#fff'}}>Name</TableCell>
                            <TableCell sx={{color:'#fff'}}>Status</TableCell>                               
                        </TableRow>
                        </TableHead> */}
                        <TableBody sx={{overflow: "auto", height: "200px"}}>
                        {
                            // filteredProjects.length ?
                            (searchNameField.length||searchKeywordsField.length)?
                            filteredProjects.map((row) => (                                        
                                <ProjectRow project={row} onSelect={() => showProjectDetails(row)}></ProjectRow>                                       
                        )) :
                                projects.map((row) => (                                        
                                    <ProjectRow project={row} onSelect={() => showProjectDetails(row)}></ProjectRow>                                       
                            ))
                            }

                        {/* {projects.map((row) => (                                        
                                <ProjectRow project={row} onSelect={() => showProjectDetails(row)}></ProjectRow>                                       
                        ))} */}
                        </TableBody>
                    </Table>
            </TableContainer>
            <Container sx={{width:"55%", margin:0,height:'500px',overflow:'auto'}}>
                {(!projectDetails) ? (
                    <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose a project to view</Typography>
                ):(
                        <Stack>
                            <Typography variant="title1" color="turquoise.main">
                                {projectDetails.projectName}
                            </Typography>
                            <Typography variant="subtitle2" color="#fff">
                                by {projectDetails.createdBy.name}
                            </Typography>
                            <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                {projectDetails.relatedKeywords.map((keyword)=>(
                                <Typography variant='subtitle3' color='lightGray.main'>#{keyword}</Typography> 
                                // label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                ))}
                            </Stack>
                            {(appliedProjects.includes(projectDetails._id)) ? (
                                <Button
                                // disabled
                                // onClick={()=> handleApply(projectDetails._id)}
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "lightGray.main",
                                    color: "black",
                                    textTransform: "none",
                                    borderRadius: 30,
                                    fontSize: 15,
                                    width: '20%',
                                    align: 'right'
                                    // display: 'flex',
                                }}
                                >
                                Applied
                                </Button>
                            ): (
                                <Button
                                onClick={()=> handleApply(projectDetails._id)}
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "secondary.main",
                                    color: "black",
                                    textTransform: "none",
                                    borderRadius: 30,
                                    fontSize: 15,
                                    width: '20%',
                                    align: 'right'
                                    // display: 'flex',
                                }}
                                >
                                Apply
                                </Button>
                            ) }
                            
                            <Typography color="secondary.main">
                                Vacancies
                            </Typography>
                            <Typography color="primary.contrastText" sx={{mb:1}}>
                                {projectDetails.vacancies}
                            </Typography>
                            <Typography color="secondary.main">
                                Type of project
                            </Typography>
                            <Typography color="primary.contrastText" sx={{mb:1}}>
                                {projectDetails.type}
                            </Typography>
                            <Typography color="secondary.main">
                                Technical category
                            </Typography>
                            <Typography color="primary.contrastText" sx={{mb:1}}>
                                {projectDetails.category}
                            </Typography>
                            <Typography color="secondary.main">
                                Skills required
                            </Typography>
                            <Stack direction="row" spacing={0} marginBottom={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                {projectDetails.skills.map((skill)=>(
                                <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                ))}
                            </Stack>
                            <Typography color="secondary.main">
                                Brief description
                            </Typography>
                            <Typography color="primary.contrastText" sx={{mb:1}}>
                                {projectDetails.briefDescription}
                            </Typography>
                            <Typography color="secondary.main">
                                Progress and future plans
                            </Typography>
                            <Typography color="primary.contrastText" sx={{mb:1}}>
                                {projectDetails.progressAndFuture}
                            </Typography>

                        </Stack>
                
                )}
            </Container>
        </Stack>
        </Box>
        
    )
    )
}