import React from 'react';
import { Button, Grid, Stack, Typography, styled, Avatar, ButtonBase, TableRow, TableCell, Box } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

import axios from 'axios';

import { getTokenFromStorage } from '../../utils/user-localstorage.util';


// const HeaderGrid = styled(Grid)({
//   marginBottom: 1,
//   "&.MuiGrid-item": {
//     paddingLeft: 0,
//   },
//   "&.MuiGrid-root.MuiGrid-root": {
//     marginLeft: 0,
//   },
// });

// const ApplicantGrid = styled(Grid)({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "&.MuiGrid-item.MuiGrid-item": {
//     paddingTop: 0,
//     paddingLeft: 0,
//   },
// });

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

export default function ApplicantRow({ applicant, projectName, isNew, onSelect }) {
  const token = getTokenFromStorage();

  const { url } = useRouteMatch();
  const confirm = useConfirm();

  const isVisible = isNew ? 'visible' : 'hidden';

  const applicationStatus = { NEW: { label: 'New!', background: 'orange.light', text: 'orange.dark' }, OFFERED: { label: 'Offered', background: 'orange.light', text: 'orange.dark' }, ACCEPTED: { label: 'Confirmed', background: 'green.light', text: 'green.dark' }, APPLICATION_REJECTED: { label: 'Application Rejected', background: 'red.light', text: 'red.dark' }, OFFER_REJECTED: { label: 'Offer Rejected', background: 'red.light', text: 'red.dark' } }

  const handleOffer = () => {
    confirm({ title: "Are you sure? You cannot undo this action.", 
              confirmationText: "Confirm", allowClose: false, dialogProps:{sx:{color:'#fff'}},titleProps:{sx:{color:'#fff'}},contentProps:{sx:{color:'#fff'}},
              confirmationButtonProps:{sx:{textTransform: "none",color: "secondary.main",borderRadius: 30,fontSize: 15,paddingX:3}},
              cancellationButtonProps:{sx:{textTransform: "none",color: "lightGray.main",borderRadius: 30,fontSize: 15,paddingX:3}}
             })
      .then(() => {
        //set status of application to offered in backend
        axios.put("http://localhost:3002/api/v1/application/" + applicant._id,
          {
            status: "OFFERED"
          },
          {
            headers: ({
              Authorization: 'Bearer ' + token
            })
          })
          .then((res) => {
            console.log('res.data:', res.data);
            alert("Successfully made an offer to "+applicant.createdBy.name+" for: "+projectName+"!");
          })
          .catch((e) => {
            alert(e);
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
        axios.put("http://localhost:3002/api/v1/application/" + applicant._id,
          {
            status: "APPLICATION_REJECTED"
          },
          {
            headers: ({
              Authorization: 'Bearer ' + token
            })
          })
          .then((res) => {
            console.log('res.data:', res.data);
            alert("Successfully rejected application by "+applicant.createdBy.name+" for: "+projectName+"!");
          })
          .catch((e) => {
            alert(e);
          }
          );
      })
      .catch(() => {
        //do nothing
      });
  }



  // if (!applicant) {
  //   return (
  //     <Typography sx={{ color: "lightGray.main" }} >No applicants</Typography>
  //   );
  // } else {
    const { status, createdBy, createdAt } = applicant;
    const { name, email, age, occupation, schOrEmployer, purpose, skills } = createdBy;

    console.log(status + " " + createdBy);
    console.log('application status:',applicationStatus[status]);
    console.log(name + " " + email);

    return ( (!isNew)?(
      <TableRow
        key={email}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" width='80%'>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar {...stringAvatar(name)} />
            <Stack direction="column" spacing={2}>
              <Box>
                <Typography variant="subtitle1" 
                            sx={{ color: 'turquoise.main',
                                  '&:hover': {cursor: 'pointer'} }} 
                            onClick={onSelect}
                >
                  {name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                  {occupation}, {schOrEmployer}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          
        </TableCell>
        <TableCell width='20%'>
          <Box>
            <Typography variant="subtitle2" sx={{ color: applicationStatus[status].text, backgroundColor: applicationStatus[status].background, borderRadius: 2, padding: '5px'}}>
              {applicationStatus[status].label}
            </Typography>
          </Box>
          
        </TableCell>
      </TableRow>
    ):(
      <TableRow
        key={email}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" width='80%'>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar {...stringAvatar(name)} />
            <Stack direction="column" spacing={2}>
              <Box>
                <Typography variant="subtitle1" 
                            sx={{ color: 'turquoise.main',
                                  '&:hover': {cursor: 'pointer'} }} 
                            onClick={onSelect}
                >
                  {name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                  {occupation}, {schOrEmployer}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "green.bright",
                    paddingX: '15%'
                  }}
                  onClick={handleOffer}
                >
                  <Typography variant="subtitle2" sx={{color: "green.dark"}}>Offer</Typography>
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
            </Stack>
          </Stack>
          
        </TableCell>
        <TableCell width='20%' sx={{verticalAlign:'top',paddingTop:'25px'}}>
          <Typography variant="subtitle2" sx={{ color: applicationStatus[status].text, backgroundColor: applicationStatus[status].background, borderRadius: 2, padding: '5px'}}>
              {applicationStatus[status].label}
            </Typography>
        </TableCell>
      </TableRow>
    )
      // <Grid
      //   container
      //   item
      //   spacing={2}
      //   sx={{
      //     marginY: 1,
      //     "&.MuiGrid-item": {
      //       paddingY: 0,
      //       paddingLeft: 0,
      //     },
      //     "&.MuiGrid-root": {
      //       marginLeft: 0,
      //     },
      //   }}
      // >
      //   <Grid item xs={1.5}>
      //       <Avatar {...stringAvatar(name)} />
      //   </Grid>
      //   <Grid item xs={5}>
      //       <Stack direction="column">
      //           <ButtonBase variant="subtitle1" sx={{color:'turquoise.main'}} onClick={onSelect}>
      //               {name}
      //           </ButtonBase>
      //           <Typography variant="subtitle2" sx={{color:'#fff'}}>
      //               {occupation}, {schOrEmployer}
      //           </Typography>  
      //     </Stack>        
      //   </Grid>
      //   <Grid item xs={2}>
      //     <Typography variant="subtitle2" sx={{color:'#fff'}}>
      //       {applicationStatus[status]}
      //     </Typography>
      //   </Grid>

      //   <Grid item xs={12} sx={{visibility:isVisible}}>
      //     <Button
      //       variant="contained"
      //       sx={{
      //         textTransform: "none",
      //         borderRadius: 10,
      //         backgroundColor: "green.main",
      //         marginRight:10,
      //       }}
      //       onClick={handleOffer}
      //     >
      //       <Typography sx={{color: "green.contrastText"}}>Offer</Typography>
      //     </Button>
      //     <Button
      //       variant="contained"
      //       sx={{
      //         textTransform: "none",
      //         borderRadius: 10,
      //         backgroundColor: "lightGray.main",
      //       }}
      //       onClick={handleReject}
      //     >
      //       <Typography sx={{color:"lightGray.contrastText"}}>Decline</Typography>
      //     </Button>
      //   </Grid>
      // </Grid>

    );
  // }
}