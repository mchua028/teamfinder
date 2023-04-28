import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import ApplicantRow from './applicantRow';
import { Box,CircularProgress,Container,Typography,Button,Stack,Chip,Link as MuiLink,Dialog,Grid} from "@mui/material";
import { useConfirm } from "material-ui-confirm";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';

import { Redirect,Link,useParams,useHistory } from "react-router-dom";
import axios from 'axios';

import {getUserFromStorage} from '../../utils/user-localstorage.util';
import {getTokenFromStorage} from '../../utils/user-localstorage.util';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProjectDetails(props) {
    const isLoggedIn=getTokenFromStorage()? true: false;
    const token=getTokenFromStorage();
    const history= useHistory();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [applicantDetails,setApplicantDetails]=useState();

    const showApplicantDetails=(row)=>{
        setApplicantDetails(row);
    }
    
  const [project,setProject]=useState();
  const [applications,setApplications]=useState();

  const { projectId } = useParams();

  console.log('projectid:',projectId);

  useEffect(() => {
     function fetchData() {
      // You can await here
        axios.get("http://localhost:3002/api/v1/project/byId/"+projectId,
                        {
                          headers: ({
                              Authorization: 'Bearer ' + token
                          })
                        })
                        .then((res)=>{
                          console.log('res.data:',res.data);
                          setProject(res.data);
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
        axios.get("http://localhost:3002/api/v1/application/project/"+projectId,
                        {
                          headers: ({
                              Authorization: 'Bearer ' + token
                          })
                        })
                        .then((res)=>{
                          console.log('applications data:',res.data);
                          setApplications(res.data);
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

  console.log('project after useeffect:',project);
  console.log('applications after useeffect:',applications);
  console.log('applicantDetails:',applicantDetails);

    return !isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : ( (!project||!applications)? (
        <Box sx={{textAlign:'center'}}>
              <CircularProgress sx={{color:"primary.contrastText"}}/>
        </Box>
      ):(
        <Container>
            <Header headerText={project.projectName}/>
            
            <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',marginTop:'20px',padding:1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}>
                    <Stack direction="column" spacing={1} marginTop={1}>
                        <Box>
                            <Stack direction="row" spacing={1} marginTop={1}>
                                <Box>
                                    <Typography color="secondary.main">
                                        Name of project
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.projectName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        Type of project
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.type}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        Technical Category
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.category}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        Related Keywords
                                    </Typography>
                                    <Stack direction="row" spacing={1} marginTop={1}>
                                        {project.relatedKeywords.map((keyword)=>(
                                        <Chip label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                        ))}
                                    </Stack>

                                </Box>
                            </Stack>
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={1} marginTop={1}>
                                <Box>
                                    <Typography color="secondary.main">
                                        Brief Description
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.briefDescription}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        Progress & Future Plans
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.progressAndFuture}
                                    </Typography>

                                </Box>
                            </Stack>

                        </Box>
                        <Box>
                            <Stack direction="row" spacing={1} marginTop={1}>
                                <Box>
                                    <Typography color="secondary.main">
                                        Skills Required
                                    </Typography>
                                    <Stack direction="row" spacing={1} marginTop={1}>
                                        {project.skills.map((skill)=>(
                                        <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                        ))}
                                    </Stack>

                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        No. of Vacancies
                                    </Typography>
                                    <Typography color="primary.contrastText">
                                        {project.vacancies}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography color="secondary.main">
                                        New teammates
                                    </Typography>

                                </Box>
                            </Stack>

                        </Box>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',marginTop:'20px',padding:1 }}>
              
                <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}>
                    <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="Confirmed Offers" {...a11yProps(0)} />
                    <StyledTab label="New Applications" {...a11yProps(1)} />
                    <StyledTab label="Offers" {...a11yProps(2)} />
                    <StyledTab label="Rejected Applications" {...a11yProps(3)} />
                    <StyledTab label="Rejected Offers" {...a11yProps(4)} />
                    </StyledTabs>
                </Box>
                <TabPanel value={value} index={0} sx={{padding:0}}>
                    <Stack direction="row">
                        <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            {/* <OnHoverScrollContainer> */}
                                <Table sx={{backgroundColor:'transparent'}}>
                                    <TableHead>
                                    <TableRow sx={{borderBottom:1,borderColor:"secondary.main"}}>
                                        <TableCell sx={{color:'#fff'}}>Name</TableCell>
                                        <TableCell sx={{color:'#fff'}}>Status</TableCell>
                                        {/* <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={1.5}
                                            // sx={{
                                            // marginBottom: 1,
                                            // "&.MuiGrid-item": {
                                            //     paddingLeft: 0,
                                            // },
                                            // "&.MuiGrid-root.MuiGrid-root": {
                                            //     marginLeft: 0,
                                            // },
                                            // }}
                                        >
                                            <Grid item xs={6.5}>
                                                <Typography variant="subtitle1" color="#fff">Name</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="subtitle1" color="#fff">Status</Typography>
                                            </Grid>
                                        </Grid> */}
                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody sx={{overflow: "auto", height: "200px"}}>
                                    {applications.filter(application=>application.status==="ACCEPTED").map((row) => (
                                        // <TableRow 
                                        // key={row._id}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <ApplicantRow applicant={row} projectName={project.projectName} isNew={false} onSelect={() => showApplicantDetails(row)}></ApplicantRow>
                                        // </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            {/* </OnHoverScrollContainer> */}
                            
                        </TableContainer>
                        <Container sx={{width:"55%", margin:0,height:'500px',overflow:'auto'}}>
                            {(!applicantDetails) ? (
                                <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose an applicant to view</Typography>
                            ):(
                                // <OnHoverScrollContainer>
                                    <Stack>
                                        <Typography color="secondary.main">
                                            Name
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.name}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Email
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.email}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Age
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.age}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Occupation
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.occupation}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            School/Employer
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.schOrEmployer}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Purpose of joining teamFinder
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.purpose}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Skills
                                        </Typography>
                                        <Stack direction="row" spacing={1} marginTop={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        
                                        
                                    </Stack>
                                // </OnHoverScrollContainer>
                            
                            )}
                        </Container>
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Stack direction="row">
                        <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            {/* <OnHoverScrollContainer> */}
                                <Table sx={{backgroundColor:'transparent'}}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color:'#fff'}}>Name</TableCell>
                                        <TableCell sx={{color:'#fff'}}>Status</TableCell>
                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {applications.filter(application=>application.status==="NEW").map((row) => (
                                        <ApplicantRow applicant={row} projectName={project.projectName} isNew={true} onSelect={() => showApplicantDetails(row)}></ApplicantRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            {/* </OnHoverScrollContainer> */}
                            
                        </TableContainer>
                        <Container sx={{width:"55%", margin:0,height:'500px',overflow:'auto'}}>
                            {(!applicantDetails) ? (
                                <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose an applicant to view</Typography>
                            ):(
                                // <OnHoverScrollContainer>
                                    <Stack>
                                        <Typography color="secondary.main">
                                            Name
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.name}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Email
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.email}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Age
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.age}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Occupation
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.occupation}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            School/Employer
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.schOrEmployer}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Purpose of joining teamFinder
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.purpose}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Skills
                                        </Typography>
                                        <Stack direction="row" spacing={1} marginTop={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        
                                       
                                        
                                    </Stack>
                                // </OnHoverScrollContainer>
                            
                            )}
                        </Container>
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <Stack direction="row">
                        <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            {/* <OnHoverScrollContainer> */}
                                <Table sx={{backgroundColor:'transparent'}}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color:'#fff'}}>Name</TableCell>
                                        <TableCell sx={{color:'#fff'}}>Status</TableCell>
                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {applications.filter(application=>application.status==="OFFERED").map((row) => (
                                        <ApplicantRow applicant={row} projectName={project.projectName} isNew={false} onSelect={() => showApplicantDetails(row)}></ApplicantRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            {/* </OnHoverScrollContainer> */}
                            
                        </TableContainer>
                        <Container sx={{width:"55%", margin:0,height:'500px',overflow:'auto'}}>
                            {(!applicantDetails) ? (
                                <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose an applicant to view</Typography>
                            ):(
                                // <OnHoverScrollContainer>
                                    <Stack>
                                        <Typography color="secondary.main">
                                            Name
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.name}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Email
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.email}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Age
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.age}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Occupation
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.occupation}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            School/Employer
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.schOrEmployer}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Purpose of joining teamFinder
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.purpose}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Skills
                                        </Typography>
                                        <Stack direction="row" spacing={1} marginTop={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        
                                        
                                    </Stack>
                                // </OnHoverScrollContainer>
                            
                            )}
                        </Container>
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={3}>
                <Stack direction="row">
                        <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            {/* <OnHoverScrollContainer> */}
                                <Table sx={{backgroundColor:'transparent'}}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color:'#fff'}}>Name</TableCell>
                                        <TableCell sx={{color:'#fff'}}>Status</TableCell>
                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {applications.filter(application=>application.status==="APPLICATION_REJECTED").map((row) => (
                                        <ApplicantRow applicant={row} projectName={project.projectName} isNew={false} onSelect={() => showApplicantDetails(row)}></ApplicantRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            {/* </OnHoverScrollContainer> */}
                            
                        </TableContainer>
                        {/* <Container sx={{width:"55%", margin:0}}>
                            {(!applicantDetails) ? (
                                <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose an applicant to view</Typography>
                            ):(
                                <OnHoverScrollContainer>
                                    <Stack>
                                        <Typography color="secondary.main">
                                            Name
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.name}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Email
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.email}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Age
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.age}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Occupation
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.occupation}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            School/Employer
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.schOrEmployer}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Purpose of joining teamFinder
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.purpose}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Skills
                                        </Typography>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        
                                    </Stack>
                                </OnHoverScrollContainer>
                            
                            )}
                        </Container> */}
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={4}>
                <Stack direction="row">
                        <TableContainer component={Paper} sx={{width:"45%",borderRadius:0,borderRight:1,borderRightColor:"lightGray.main",height:'500px',overflow:'auto'}}>
                            {/* <OnHoverScrollContainer> */}
                                <Table sx={{backgroundColor:'transparent'}}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell width="80%" sx={{color:'#fff'}}>Name</TableCell>
                                        <TableCell width="20%" sx={{color:'#fff'}}>Status</TableCell>
                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {applications.filter(application=>application.status==="OFFER_REJECTED").map((row) => (
                                        <ApplicantRow applicant={row} projectName={project.projectName} isNew={false} onSelect={() => showApplicantDetails(row)}></ApplicantRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            {/* </OnHoverScrollContainer> */}
                            
                        </TableContainer>
                        {/* <Container sx={{width:"55%", margin:0}}>
                            {(!applicantDetails) ? (
                                <Typography sx={{color:"lightGray.main"}} alignItems="center" >Choose an applicant to view</Typography>
                            ):(
                                <OnHoverScrollContainer>
                                    <Stack>
                                        <Typography color="secondary.main">
                                            Name
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.name}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Email
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.email}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Age
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.age}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Occupation
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.occupation}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            School/Employer
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.schOrEmployer}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Purpose of joining teamFinder
                                        </Typography>
                                        <Typography color="primary.contrastText">
                                            {applicantDetails.createdBy.purpose}
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Skills
                                        </Typography>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        <Stack direction="row" spacing={1} marginTop={1}>
                                            {applicantDetails.createdBy.skills.map((skill)=>(
                                            <Chip label={skill} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                            ))}
                                        </Stack>
                                        
                                    </Stack>
                                </OnHoverScrollContainer>
                            
                            )}
                        </Container> */}
                    </Stack>
                </TabPanel>
            </Box>
        </Container>
            
      )
    )
}