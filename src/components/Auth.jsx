import React, {useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import GoogleLogin from "react-google-login";


const cookies = new Cookies();

const initialState = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
}

const clientId = "google_client_id"


const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value});

  // }

  // const switchMode = () => {
  //   setIsSignup((prevIsSignup) => !prevIsSignup)
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { fullName, username, password, email } = form;
    
  //   const URL = `http://localhost:3001/auth/${isSignup ? 'signup' : 'login'}`;
  //   // Send data to backend 
  //   const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}`, {
  //     fullName, username, password, email
  //   });
  //   cookies.set('token', token);
  //   cookies.set('userId', userId);
  //   cookies.set('fullName', fullName);
  //   cookies.set('username', username);

  //   if(isSignup) {
  //     cookies.set('hashedPassword', hashedPassword);
  //   }

  //   window.location.reload();

  // }

  const responseGoogle = (googleRes) => {
    const data = googleRes.profileObj;
    console.log(googleRes)
    const URL = `http://17c30c451fca.ngrok.io/auth/login`;


    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({data: data, token: googleRes.tokenId})
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
          {/* <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
            <p>{isSignup ? 'Sign Up With Email' : 'Sign In'}</p>
              <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                )}
                {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="email">Email</label>
                  <input 
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                )}
                
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="username">Username</label>
                  <input 
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="password">Password</label>
                  <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
               
                {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                )}
                <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
              </form>
                <p>
                  {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
                    <span onClick={switchMode}>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>
            </div>
          </div> */}
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