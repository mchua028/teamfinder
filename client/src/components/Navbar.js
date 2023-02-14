import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { getUserFromStorage, getTokenFromStorage } from './utils/user-localstorage.util';


const pages = {'My Projects':'/my-projects', 'Projects':'/my-projects', 'People':'/my-projects'};
const accountpages = {'Profile':'/edit-profile', 'Applied Projects':'/applied-projects', 'Logout':'/logout'};

function NavBar(props) {
    const isLoggedIn=getTokenFromStorage()? true: false;
    const isVisible=isLoggedIn? 'visible':'hidden';
    const user=getUserFromStorage();
    console.log(user);
    const userName=user? user.split(',')[0]:'';
    const userEmail=user? user.split(',')[1]:'';
    
    const themePalette = useTheme().palette;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    
    const history = useHistory();
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToProfile = () => {
        handleCloseUserMenu();
        history.push("/edit-profile")
    }

    const navigateToAccountPages = (page) => {
        handleCloseUserMenu();
        console.log(accountpages[page]);
        history.push(accountpages[page]);
    }

    const navigateToPages = (page) => {
        // handleCloseNavMenu();
        console.log(pages[page]);
        history.push(pages[page]);
    }

    return (
        <AppBar position='sticky' sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                // fontSize: 26,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                teamFinder
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, visibility: isVisible }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                visibility={isLoggedIn}
                >
                <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        "& .MuiPaper-root": {
                            backgroundColor: themePalette.secondary.main
                        } 
                    }}
                >
                {/* {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))} */}
                    <MenuItem>
                        <ListItemIcon>
                            <EditIcon /> 
                        </ListItemIcon>
                        My Projects
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        Projects
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        People
                    </MenuItem>
                </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                // fontSize: 26,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                teamFinder
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right', paddingRight: '10px', visibility: isVisible }}>
                {Object.keys(pages).map((page) => (
                <Button
                    // key={page}
                    // onClick={navigateToPages(page)}
                    component={Link} to={pages[page]}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    visibility= {isLoggedIn}
                >
                    {page}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0, visibility: isVisible }}>
                <Tooltip title="Me" 
                visibility= {isLoggedIn}
                >
                <IconButton size="small" onClick={handleOpenUserMenu}>
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#FFFFFF" }}/>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px', 
                    "& .MuiPaper-root": {
                    backgroundColor: themePalette.secondary.main
                  }  
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))} */}
                    <Typography align='center' > Hi, {userName} </Typography>
                    <MenuItem 
                    component={Link}
                    to="/edit-profile"
                        // onClick={navigateToProfile}
                    >
                        <ListItemIcon>
                            <EditIcon /> 
                        </ListItemIcon>
                        
                        Edit Profile
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        Applied Projects
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {/* <GoogleAuth /> */}
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default NavBar;