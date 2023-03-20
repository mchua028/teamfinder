import React from 'react';
import { Button, Grid, Stack, Typography, styled, Avatar, ButtonBase, TableRow, TableCell, Box,IconButton,Chip } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, useRouteMatch } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

import axios from 'axios';

import { getTokenFromStorage } from '../../utils/user-localstorage.util';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  console.log('name', name);
  const nameInitials=(name.includes(' '))? name.split(' ')[0][0]+name.split(' ')[1][0]:name[0];
//   if(name.includes(' ')){
//     const nameInitials=name.split(' ')[0][0]+name.split(' ')[1][0];
//   }
//   else{
//     const nameInitials=name[0]
//   }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    children: nameInitials,
  };
}

export default function ProjectRow({ project, onSelect }) {
  const token = getTokenFromStorage();

    const { projectName,type,category,briefDescription,progressAndFuture,vacancies,relatedKeywords,skills, createdBy, createdAt } = project;
    const { name } = createdBy;

    console.log(projectName + " " + createdBy);
    console.log(name);

    return ( 
      <TableRow
        key={project._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" width='80%'>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar {...stringAvatar(name)} />
            <Box>
                <Typography variant="subtitle1" 
                            sx={{ color: 'turquoise.main',
                                  '&:hover': {cursor: 'pointer'} }} 
                            onClick={onSelect}
                >
                  {projectName}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                  {name}
                </Typography>
                <Stack direction="row" spacing={0} marginTop={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {relatedKeywords.map((keyword)=>(
                    <Chip label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                    ))}
                </Stack>
                <Stack direction="row" spacing={1} marginTop={1}>
                    <Typography variant="subtitle3" sx={{ color: 'lightGray.main' }}>
                        {Math.ceil(((new Date()).getTime()-(new Date(createdAt)).getTime())/(1000*3600*24))} days ago |
                    </Typography>
                    <Typography variant="subtitle3" sx={{ color: 'green.bright' }}>
                        {vacancies} vacancies left
                    </Typography>
                </Stack>
            </Box>
          </Stack>
          
        </TableCell>
        <TableCell width='10%' sx={{verticalAlign:'top'}}>
            <IconButton aria-label="bookmark">
                <BookmarkBorderIcon sx={{color:'secondary.main'}}/>
            </IconButton>
        </TableCell>
      </TableRow>


    );
  
}