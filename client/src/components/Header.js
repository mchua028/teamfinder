import React from 'react';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";


// import { useAppSelector } from "common/hooks/use-redux.hook";

// import { selectUser } from "features/auth/user.slice";



export default function Header({headerText}) {
    // const user = useAppSelector(selectUser);
  
    // if (!user) {
    //   return null;
    // }

    return (
      <Box
        sx={{
          display: "block",
          justifyContent: "left",
          paddingTop:'20px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: "lightGray.main",
            textDecoration: "none",
          }}
        >
          {headerText}
        </Typography>
      </Box>
    )
  }