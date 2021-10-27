import React, { useState } from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import GoogleLogin from "react-google-login";
require("dotenv").config();


const cookies = new Cookies();

const initialState = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
}

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const responseGoogle = (googleRes) => {
    const data = googleRes.profileObj;
    console.clear()
    console.log(`Google auth response ${googleRes}`)
    const URL = `http://localhost:3001/auth/login`;


    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ data: data, token: googleRes.tokenId })
    }).then((res) => res.json()).then((userData) => {

      const { name, email, token, userId, url } = userData;
      console.log(userData)
      cookies.set('name', name);
      cookies.set('email', email);
      cookies.set('token', token);
      cookies.set('userId', userId);
      window.location.assign(url)
      // window.location.reload();


    });
  }

  return (
    <div className="auth__form-container">
      <span>Sign up With Google:
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
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