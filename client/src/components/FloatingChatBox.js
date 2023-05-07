import React, { useState } from "react";
import PropTypes from 'prop-types';
// import { makeStyles } from "@material-ui/core/styles";
import { Fab, IconButton, Paper, TextField,Box,Tooltip,Stack } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Send } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const FloatingChatBox = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [messages, setMessages] = useState([]);
  const [open,setOpen]=useState(false);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message.trim()) {
      setMessages([...messages, message]);
      e.target.reset();
    }
  };

  const handleChat=()=>{
    setOpen(!open);
  }

  // useEffect(() => {
  //   function fetchData() {
  //    // You can await here
  //    const response = axios.get("/project/myprojects",
  //                      {
  //                        headers: ({
  //                            Authorization: 'Bearer ' + token
  //                        })
  //                      })
  //                      .then((res)=>{
  //                        console.log('res.data:',res.data);
  //                        setProjects(res.data);
  //                      })
  //                      .catch((e)=>{
  //                        console.log(e.code);
  //                        if(e.code==='ERR_BAD_REQUEST'){
  //                          localStorage.clear();
  //                          history.push('/');
  //                          window.location.reload();
  //                        }
  //                        else{
  //                          alert('An unspecified error occured.');
  //                        }
  //                      }
  //                      );
  //    // ...
  //  }
  //  fetchData();
  // }, []);


  return (
    // <>
    //   <Fab sx={{
    //   position: "fixed",
    //   bottom: 2,
    //   right: 2,
    //   zIndex: 1000,
    //   "& .MuiPaper-root": {
    //     minWidth: "400px",
    //     minHeight: "400px",
    //     overflow: "auto",
    //     padding: 2,
    //     borderRadius: "10px",
    //   },
    //   }}>
    //     <IconButton onClick={handleChat} sx={{visibility:open?'hidden':'visible'}}>
    //       <ChatIcon sx={{color:'gray.main'}}/>
    //     </IconButton>
    //     {(open)?(
    //       <Paper elevation={3}>
    //       {messages.map((message, index) => (
    //         <div key={index}>{message}</div>
    //       ))}
    //       <form onSubmit={handleMessageSend}>
    //         <TextField name="message" label="Type a message" fullWidth />
    //         <IconButton type="submit" aria-label="send">
    //           <Send />
    //         </IconButton>
    //       </form>
    //     </Paper>
    //     ):(
    //       <Box sx={{height:0,width:0}}></Box>
    //   )}
    //   </Fab>
      <Accordion
      sx={{
        position: 'fixed',
        width: '400px',
        right:20,
        bottom: 0,
        borderRadius: 4,
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{
            backgroundColor: 'orange.main',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <ChatIcon />
          <Typography sx={{paddingLeft:2}}>Chat</Typography>
        </AccordionSummary>
        <AccordionDetails
        sx={{
          backgroundColor: '#fff',
          height: '350px',
        }}
        >
          <Stack direction="row" spacing={2}>
            <Box sx={{ width: '40%' }}>
              <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider',textTransform: 'none',}}
            >
              {
                  messages.map((row) => (                                        
                      <Tab label={messages.name} {...a11yProps(0)}>

                      </Tab>                                       
              ))
              }
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
              <Tab label="Item Five" {...a11yProps(4)} />
              <Tab label="Item Six" {...a11yProps(5)} />
              <Tab label="Item Seven" {...a11yProps(6)} />
              <Tab label="Item Seven" {...a11yProps(7)} />
              <Tab label="Item Seven" {...a11yProps(8)} />
            </Tabs>
            </Box>
            <Box sx={{ width: '60%' }}>
              <TabPanel value={value} index={0}>
                Item One
              </TabPanel>
            </Box>
          </Stack>
            
        
        </AccordionDetails>
      </Accordion>
    
    
  );
};

export default FloatingChatBox;