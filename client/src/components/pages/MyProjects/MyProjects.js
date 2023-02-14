import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import { Box,CircularProgress,Container,Tab,Tabs,Typography,Button} from "@mui/material";
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
        <Box sx={{ p: 3 }}>
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

    //TODO: get projects axios.get
      
      const rows = [];
    
    return !isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
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
            <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',marginTop:'20px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}>
                    <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="Ongoing" {...a11yProps(0)} />
                    <StyledTab label="Closed" {...a11yProps(1)} />
                    </StyledTabs>
                </Box>
                <TabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650,backgroundColor:'transparent'}}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell align="right">Vacancies filled</TableCell>
                            <TableCell align="right">Date created</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.projectName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.projectName}
                            </TableCell>
                            <TableCell align="right">{row.vacanciesFilled}</TableCell>
                            <TableCell align="right">{row.dateCreated}</TableCell>
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
}