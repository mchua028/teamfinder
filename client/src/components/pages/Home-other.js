import React, {useEffect, useState} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Redirect } from "react-router-dom";

import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import GoogleAuth from '../GoogleAuth';

function Home() {
  const [ profile, setProfile ] = useState([]);
  const clientId = '354231947558-rejnigbpiav1e811b1h231im0ob2fofh.apps.googleusercontent.com';

  useEffect(() => {
     const initClient = () => {
           gapi.client.init({
           clientId: clientId,
           scope: ''
         });
      };
      gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    console.log('success:', res);
    setProfile(res.profileObj);
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };
  
  const logOut = () => {
    setProfile(null);
  };
  
  return (
    <>
      
      {/* <HeroSection /> */}
      <div className='hero-container'>
        {profile ? (
          //   <Redirect
          //   to={{
          //     pathname: "/edit-profile",
          //   }}
          // />
            <div>
              {/* <img src={profile.imageUrl} alt="user image" /> */}
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <br />
              <br />
              <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            </div>
            ) : (
              <div>
                <h1>Find your dream team.</h1>
                <div className='hero-btns'>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Continue with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                </div>
              </div>
            )}
        {/* <h1>Find your dream team.</h1>
        <div className='hero-btns'>
          <GoogleLogin
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        </div> */}
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
