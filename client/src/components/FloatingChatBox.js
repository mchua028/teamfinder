import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Fab, IconButton, Paper, TextField,Box } from "@mui/material";
import { Send } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';

// const useStyles = makeStyles((theme) => ({
//   chatContainer: {
//     position: "fixed",
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//     zIndex: 1000,
//     "& .MuiPaper-root": {
//       maxWidth: "400px",
//       maxHeight: "400px",
//       overflow: "auto",
//       padding: theme.spacing(2),
//       borderRadius: "10px",
//     },
//   },
// }));

const FloatingChatBox = () => {
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


  return (
    <Fab sx={{
      position: "fixed",
      bottom: 2,
      right: 2,
      zIndex: 1000,
      "& .MuiPaper-root": {
        minWidth: "400px",
        minHeight: "400px",
        overflow: "auto",
        padding: 2,
        borderRadius: "10px",
      },
      }}>
        <IconButton onClick={handleChat} visbility={(open)?'hidden':'visible'}>
          <ChatIcon sx={{color:'gray.main'}}/>
        </IconButton>
        {(open)?(
          <Paper elevation={3}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          <form onSubmit={handleMessageSend}>
            <TextField name="message" label="Type a message" fullWidth />
            <IconButton type="submit" aria-label="send">
              <Send />
            </IconButton>
          </form>
        </Paper>
        ):(
          <Box sx={{height:0,width:0}}></Box>
      )}
      
    </Fab>
  );
};

export default FloatingChatBox;
