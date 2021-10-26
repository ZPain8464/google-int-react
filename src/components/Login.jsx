import React from "react";
import { GoogleLogin, useGoogleLogin } from "react-google-login";

const clientId = "google_client_id"

function Login() {
    const onSuccess = (res) => {
      console.log('Login Success: currentUser:', res.profileObj);
      alert(
        `Logged in successfully. Welcome, ${res.profileObj.name}!`
      );
      
    };
  
    const onFailure = (res) => {
      console.log('Login failed: res:', res);
      alert(
        `Failed to login.`
      );
    };
  
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div>
    );
  }
  

export default Login;