import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import ProjectList from './projectList';
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

import { Redirect,Link,useParams } from "react-router-dom";
import axios from 'axios';

import {getUserFromStorage} from '../../utils/user-localstorage.util';
import {getTokenFromStorage} from '../../utils/user-localstorage.util';

import FloatingChatBox from '../../FloatingChatBox';


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

export default function Projects() {
    const isLoggedIn=getTokenFromStorage()? true: false;
    const token=getTokenFromStorage();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [projectDetails,setProjectDetails]=useState();

    const showProjectDetails=(row)=>{
        setProjectDetails(row);
    }
    
  const [projects,setProjects]=useState();

  console.log('projectDetails:',projectDetails);

    return !isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ):(
        <Container>
            <Header headerText='Available Projects'/>
            <Stack direction="row" spacing={2} sx={{marginTop:'20px'}}>
                <Box sx={{ width: '20%', borderRadius: '16px',backgroundColor:'gray.main',padding:1 }}>
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}> */}
                        <StyledTabs value={value} onChange={handleChange} orientation='vertical'>
                        <StyledTab label="All category" {...a11yProps(0)} />
                        <StyledTab label="Software engineering" {...a11yProps(1)} />
                        <StyledTab label="Data analytics" {...a11yProps(2)} />
                        <StyledTab label="Machine learning/AI" {...a11yProps(3)} />
                        <StyledTab label="Robotics" {...a11yProps(4)} />
                        <StyledTab label="Game development" {...a11yProps(5)} />
                        <StyledTab label="IoT" {...a11yProps(6)} />
                        <StyledTab label="AR/VR" {...a11yProps(7)} />
                        <StyledTab label="Others" {...a11yProps(8)} />
                        </StyledTabs>
                    {/* </Box> */}
                </Box>
                <Box 
                sx={{ width: '80%', borderRadius: '16px',backgroundColor:'gray.main',padding:1 }}
                >
                    <TabPanel value={value} index={0} sx={{padding:0}}>
                        <ProjectList category='' />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProjectList category='Software engineering' />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ProjectList category='Data analytics' />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ProjectList category='Machine learning/AI' />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ProjectList category='Robotics' />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <ProjectList category='Game development' />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <ProjectList category='IoT' />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <ProjectList category='AR/VR' />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <ProjectList category='Others' />
                    </TabPanel>
                    
                </Box>
            </Stack>
            
        </Container>
      )
    
}