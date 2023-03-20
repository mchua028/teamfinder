import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import { Box,CircularProgress,Container,Typography,Button,Stack,Chip,Link as MuiLink} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Redirect,Link } from "react-router-dom";
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

export default function MyProjects(props) {
    const isLoggedIn=getTokenFromStorage()? true: false;
    const token=getTokenFromStorage();
    const userFromStorage=getUserFromStorage();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
  const [projects,setProjects]=useState();

  useEffect(() => {
     function fetchData() {
      // You can await here
      const response = axios.get("http://localhost:3002/api/v1/project/myprojects",
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
      // ...
    }
    fetchData();
  }, []);

  console.log('projects after useeffect:',projects);
    
    return !isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : ( !projects? (
        <Box sx={{textAlign:'center'}}>
              <CircularProgress sx={{color:"primary.contrastText"}}/>
        </Box>
      ):(
        <Container>
            <Header headerText="My Projects"/>
            <Button
              component={Link} to="/my-projects/add-project"
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
                + Add Project
            </Button>
            <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',marginTop:'20px',padding:1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}>
                    <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="Ongoing" {...a11yProps(0)} />
                    <StyledTab label="Closed" {...a11yProps(1)} />
                    </StyledTabs>
                </Box>
                <TabPanel value={value} index={0} sx={{padding:0}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650,backgroundColor:'transparent'}}>
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{color:'#fff'}}>Project</TableCell>
                            <TableCell align="right" sx={{color:'#fff'}}>Vacancies filled</TableCell>
                            <TableCell align="right" sx={{color:'#fff'}}>Date created</TableCell>
                            <TableCell align="right" sx={{color:'#fff'}}>Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {projects.map((row) => (
                            <TableRow
                            key={row.projectName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >
                              {/* <Link>{row.projectName}</Link> */}
                              {/* <MuiLink underline="hover" color="turquoise.main" variant="subtitle1">{row.projectName}</MuiLink> */}
                              <Typography variant="subtitle1" sx={{color:'turquoise.main'}} component={Link} to= {`/my-projects/${row._id}`} 
                              // "/my-projects"
                              >
                                {row.projectName}
                              </Typography>
                              <Typography variant="subtitle2" sx={{color:'#fff'}}>
                                {row.category}
                              </Typography>
                              <Stack direction="row" spacing={1} marginTop={1}>
                                {row.relatedKeywords.map((keyword)=>(
                                  <Chip label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                                ))}
                              </Stack>
                                
                                
                            </TableCell>
                            <TableCell align="right" sx={{color:'#fff'}}>{row.vacancies}</TableCell>
                            <TableCell align="right" sx={{color:'#fff'}}>{row.createdAt}</TableCell>
                            <TableCell align="right"><MoreHorizIcon sx={{color: '#fff'}}/></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    closed
                </TabPanel>
            </Box>
        </Container>
            
      )
    )
}