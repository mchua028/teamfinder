import React from 'react';
import Button from '@mui/material/Button';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null, profile: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '354231947558-rejnigbpiav1e811b1h231im0ob2fofh.apps.googleusercontent.com',
          scope: 'email', // and whatever else passed as a string...
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.handleAuthChange();
          this.auth.isSignedIn.listen(this.handleAuthChange);
        });
    });
  }

  handleAuthChange = () => {
    console.log('result:',this.auth);
    this.setState({ isSignedIn: this.auth.isSignedIn.get(), profile: this.auth.currentUser.get() });
    console.log('profile:',this.state.profile);
  };

  handleSignIn = () => {
    this.auth.signIn();
  };

  handleSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <div>
            <Button variant="contained" onClick={this.handleSignOut}>Sign out</Button>
            {this.state.profile.getBasicProfile().getName()}
        </div>
      );
    } else {
      return <Button variant="contained" onClick={this.handleSignIn}>Sign in with Google</Button>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;