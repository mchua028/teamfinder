import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header';
import StyledTabs from '../../StyledTabs';
import StyledTab from '../../StyledTab';
import { Box,CircularProgress,Container,Typography,Button,Stack,Chip,Link as MuiLink,IconButton,} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

import { Redirect,Link,useHistory } from "react-router-dom";
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
    const history= useHistory();

    const [value, setValue] = React.useState(0);
    
    const themePalette = useTheme().palette;
    const [anchorElMore, setAnchorElMore] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenMoreOptions = (event) => {
      setAnchorElMore(event.currentTarget);
    };
    const handleCloseMoreOptions = () => {
      setAnchorElMore(null);
    };
  const [projects,setProjects]=useState();

  useEffect(() => {
     function fetchData() {
      // You can await here
      const response = axios.get("/project/myprojects",
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
                        {projects.filter(project=>project.isOpen==true).map((row) => (
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
                            <TableCell align="right" sx={{color:'#fff'}}>{(new Date(row.createdAt)).toString().split(':')[0]+':'+(new Date(row.createdAt)).toString().split(':')[1]}</TableCell>
                            <TableCell align="right">
                              <Tooltip title="More">
                                <IconButton size="small" onClick={handleOpenMoreOptions}>
                                  <MoreHorizIcon sx={{color: '#fff'}}/>
                                </IconButton>
                              </Tooltip>
                              <Menu
                              sx={{ mt: '45px', 
                                  "& .MuiPaper-root": {
                                  backgroundColor: themePalette.secondary.main
                                }  
                              }}
                              anchorEl={anchorElMore}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(anchorElMore)}
                              onClose={handleCloseMoreOptions}
                              >
                                  
                                  <MenuItem 
                                  component={Link} 
                                  to= {`/my-projects/${row._id}/edit`}
                                  >
                                      <ListItemIcon>
                                          <EditIcon /> 
                                      </ListItemIcon>
                                      
                                      Edit
                                  </MenuItem>
                                  <MenuItem
                                  onClick={handleCloseMoreOptions}
                                  >
                                      <ListItemIcon>
                                          <CloseIcon fontSize="small" />
                                      </ListItemIcon>
                                      Close
                                  </MenuItem>
                              </Menu>
                            </TableCell>
                            </TableRow>
                            
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                        {projects.filter(project=>project.isOpen==false).map((row) => (
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
                            <TableCell align="right" sx={{color:'#fff'}}>{(new Date(row.createdAt)).toString().split(':')[0]+':'+(new Date(row.createdAt)).toString().split(':')[1]}</TableCell>
                            <TableCell align="right">
                              {/* <IconButton onClick={handleMore}>
                                <MoreHorizIcon sx={{color: '#fff'}}/>
                              </IconButton> */}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>
            </Box>
        </Container>
            
      )
    )
}