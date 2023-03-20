import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import AppliedProjectsList from './appliedProjectsList';
import FloatingChatBox from '../../FloatingChatBox';
import { Box,CircularProgress,Container,Typography,Button,Stack,Chip,Link as MuiLink,Dialog,Grid} from "@mui/material";
import { useConfirm } from "material-ui-confirm";

import { Redirect,Link,useParams } from "react-router-dom";
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

export default function AppliedProjects(props) {
    const isLoggedIn=getTokenFromStorage()? true: false;
    const token=getTokenFromStorage();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return !isLoggedIn ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ):(
        <Container>
            <Header headerText='Applied Projects'/>
            <Stack direction="column" spacing={2} sx={{marginTop:'20px'}}>
                <Box sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',padding:1 }}>
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'secondary.main' }}> */}
                        <StyledTabs value={value} onChange={handleChange}>
                        <StyledTab label="Confirmed" {...a11yProps(0)} />
                        <StyledTab label="Applied" {...a11yProps(1)} />
                        <StyledTab label="Offered" {...a11yProps(2)} />
                        <StyledTab label="Rejected Applications" {...a11yProps(3)} />
                        <StyledTab label="Rejected Offers" {...a11yProps(4)} />
                        </StyledTabs>
                </Box>
                <Box 
                sx={{ width: '100%', borderRadius: '16px',backgroundColor:'gray.main',padding:1 }}
                >
                    <TabPanel value={value} index={0} sx={{padding:0}}>
                        <AppliedProjectsList category='ACCEPTED' />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AppliedProjectsList category='NEW' />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <AppliedProjectsList category='OFFERED' />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <AppliedProjectsList category='APPLICATION_REJECTED' />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <AppliedProjectsList category='OFFER_REJECTED' />
                    </TabPanel>
                    
                </Box>
            </Stack>
            {/* <FloatingChatBox /> */}
            
        </Container>
            
      )
    
}