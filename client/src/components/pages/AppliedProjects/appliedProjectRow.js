import React from 'react';
import { Button, Grid, Stack, Typography, styled, Avatar, ButtonBase, TableRow, TableCell, Box,IconButton,Chip } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useHistory } from "react-router-dom";
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

export default function AppliedProjectRow({ application, isOffered, onSelect }) {
    const token = getTokenFromStorage();
    const confirm = useConfirm();

    const history= useHistory();

    console.log(application);

    const { projectId,status,createdBy, createdAt,updatedAt } = application;
    // const { projectName,type,category,relatedKeywords,briefDescription,progressAndFuture,skills,vacancies,createdBy} = projectId;

    const applicationStatus = { NEW: { label: 'New!', background: 'orange.light', text: 'orange.dark' }, OFFERED: { label: 'Offered', background: 'orange.light', text: 'orange.dark' }, ACCEPTED: { label: 'Confirmed', background: 'green.light', text: 'green.dark' }, APPLICATION_REJECTED: { label: 'Application Rejected', background: 'red.light', text: 'red.dark' }, OFFER_REJECTED: { label: 'Offer Rejected', background: 'red.light', text: 'red.dark' } }


    console.log(projectId + " " + createdBy);
    console.log(projectId.createdBy);
    console.log(projectId.createdBy.name);

    const handleAccept = () => {
      confirm({ title: "Are you sure? You cannot undo this action.", 
                confirmationText: "Confirm", allowClose: false, dialogProps:{sx:{color:'#fff'}},titleProps:{sx:{color:'#fff'}},contentProps:{sx:{color:'#fff'}},
                confirmationButtonProps:{sx:{textTransform: "none",color: "secondary.main",borderRadius: 30,fontSize: 15,paddingX:3}},
                cancellationButtonProps:{sx:{textTransform: "none",color: "lightGray.main",borderRadius: 30,fontSize: 15,paddingX:3}}
               })
        .then(() => {
          //set status of application to offered in backend
          axios.put("http://localhost:3002/api/v1/application/" + application._id,
            {
              status: "ACCEPTED"
            },
            {
              headers: ({
                Authorization: 'Bearer ' + token
              })
            })
            .then((res) => {
              console.log('res.data:', res.data);
              alert("Successfully accepted offer for: "+application.projectId.projectName+"!");
            })
            .catch((e) => {
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
        })
        .catch(() => {
          //do nothing
        });
    }
  
    const handleReject = () => {
      confirm({ title: "Are you sure? You cannot undo this action.", 
                confirmationText: "Confirm", allowClose: false, dialogProps:{sx:{color:'#fff'}},titleProps:{sx:{color:'#fff'}},contentProps:{sx:{color:'#fff'}},
                confirmationButtonProps:{sx:{textTransform: "none",color: "secondary.main",borderRadius: 30,fontSize: 15,paddingX:3}},
                cancellationButtonProps:{sx:{textTransform: "none",color: "lightGray.main",borderRadius: 30,fontSize: 15,paddingX:3}} 
              })
        .then(() => {
          //set status of application to offered in backend
          axios.put("http://localhost:3002/api/v1/application/" + application._id,
            {
              status: "OFFER_REJECTED"
            },
            {
              headers: ({
                Authorization: 'Bearer ' + token
              })
            })
            .then((res) => {
              console.log('res.data:', res.data);
              alert("Successfully rejected offer for: "+application.projectId.projectName+"!");
            })
            .catch((e) => {
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
        })
        .catch(() => {
          //do nothing
        });
    }


    return ( 
      <TableRow
        key={application._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" width='80%'>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar {...stringAvatar(projectId.createdBy.name)} />
            <Stack direction="column" spacing={2}>
                <Box>
                  <Typography variant="subtitle1" 
                              sx={{ color: 'turquoise.main',
                                    '&:hover': {cursor: 'pointer'} }} 
                              onClick={onSelect}
                  >
                    {projectId.projectName}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                    {projectId.createdBy.name}
                  </Typography>
                  <Stack direction="row" spacing={0} marginTop={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {projectId.relatedKeywords.map((keyword)=>(
                      <Chip label={keyword} color="lightGray" size="small" sx={{color:"gray.main"}}/>
                      ))}
                  </Stack>
                  <Stack direction="row" spacing={1} marginTop={1}>
                      <Typography variant="subtitle3" sx={{ color: 'lightGray.main' }}>
                          {Math.ceil(((new Date()).getTime()-(new Date(createdAt)).getTime())/(1000*3600*24))} days ago |
                      </Typography>
                      <Typography variant="subtitle3" sx={{ color: 'green.bright' }}>
                          {projectId.vacancies} vacancies left
                      </Typography>
                  </Stack>
              </Box>
              {(isOffered)? (
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "green.bright",
                    paddingX: '15%'
                  }}
                  onClick={handleAccept}
                >
                  <Typography variant="subtitle2" sx={{color: "green.dark"}}>Accept</Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "lightGray.main",
                    paddingX: '15%'
                  }}
                  onClick={handleReject}
                >
                  <Typography variant="subtitle2" sx={{color:"gray.main"}}>Decline</Typography>
                </Button>
              </Stack>
              ) :(<Box sx={{height:0}}></Box>)}
              
            </Stack>
            

          </Stack>
          
        </TableCell>
        {(isOffered)?(
          <TableCell width='20%' sx={{verticalAlign:'top',paddingTop:'25px'}}>
          <Typography variant="subtitle2" sx={{ color: applicationStatus[status].text, backgroundColor: applicationStatus[status].background, borderRadius: 2, padding: '5px'}}>
              {applicationStatus[status].label}
            </Typography>
        </TableCell>
        ):(
          <TableCell width='20%'>
          <Typography variant="subtitle2" sx={{ color: applicationStatus[status].text, backgroundColor: applicationStatus[status].background, borderRadius: 2, padding: '5px'}}>
              {applicationStatus[status].label}
            </Typography>
        </TableCell>
        )}
        
      </TableRow>


    );
  
}