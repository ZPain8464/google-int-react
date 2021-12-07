import React from 'react';
import Cookies from "universal-cookie";
import GoogleLogin from "react-google-login";
require("dotenv").config();


const cookies = new Cookies();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Auth = () => {

  const responseGoogle = (googleRes) => {
    const data = googleRes.profileObj;
    console.log(`Google auth response ${googleRes}`)
    const URL = `http://localhost:3001/auth/login`;


    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ data: data, token: googleRes.tokenId })
    }).then((res) => res.json()).then((userData) => {

      const { name, email, token, user_id, url } = userData;
      cookies.set('name', name);
      cookies.set('email', email);
      cookies.set('token', token);
      cookies.set('user_id', user_id);
      window.location.assign(url)
    });
  }

  return (
    <div className="auth__form-container">
      <span><p className="signup-text">Sign Up With Google:</p>
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"

          />
        </div>
      </span>
    </div>
  )
}

export default Auth;