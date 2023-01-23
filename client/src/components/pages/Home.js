import React, {useEffect, useState} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Redirect } from "react-router-dom";

import '../../App.css';
// import Cards from '../Cards';
// import HeroSection from '../HeroSection';
// import Footer from '../Footer';
import GoogleAuth from '../GoogleAuth';
import { Snackbar, Alert } from "@mui/material";


function Home(props) {
  const { isLoggedIn,user } = props;
  // const [ profile, setProfile ] = useState([]);
  // const open=false;
  // const clientId = '354231947558-rejnigbpiav1e811b1h231im0ob2fofh.apps.googleusercontent.com';

  // useEffect(() => {
  //    const initClient = () => {
  //          gapi.client.init({
  //          clientId: clientId,
  //          scope: ''
  //        });
  //     };
  //     gapi.load('client:auth2', initClient);
  // });

//   const onSuccess = (res) => {
//     console.log('success:', res);
//     open=true;
//   };
//   const onFailure = (err) => {
//       console.log('failed:', err);
//       open=true;
//   };

//   const handleCloseSnackbar = (err) => {
//     open=false;
// };
  
  // const logOut = () => {
  //   setProfile(null);
  // };
  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : (
    <>
    

    {/*
      <div className='hero-container'>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          An error occurred. Please try again.
        </Alert>
      </Snackbar>

      </div>
  */}
    </>
  );
}

export default Home;
