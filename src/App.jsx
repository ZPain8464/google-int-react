import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "./App.css"
import Cookies from "universal-cookie";

import Auth from "./components/Auth"
import ChannelContainer from "./components/ChannelContainer";

const apiKey = "stream_api_key";

const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();

const authToken = cookies.get('token')

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get("name"),
  }, authToken);
}



const LogoutButton = ({ logout }) => (<button onClick={logout}>Logout</button>);

const GetCal = ({ getCal }) => {

  return (
    <div>
      <button onClick={getCal}>Get Cal</button>
    </div>
  )
}

const App = () => {

  const logout = (response) => {
    // Logs out of app by removing token from cookies

    cookies.remove('token');
    cookies.remove('name');
    cookies.remove('userId');
    cookies.remove('code');
    cookies.remove('googleToken');
    

    window.location.reload();
  }

  const getCal = () => {
    const token = cookies.get("googleToken")
    const URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    fetch(URL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res)=>res.json()).then((data)=> { 
      console.log(data)
    })
  }

  if (!authToken) return <Auth />
  

  return (
    <div className="app__wrapper">
    <Chat client={client}>
        <LogoutButton logout={logout}/>
        <GetCal getCal={getCal}/>
      <div>
        <ChannelContainer />
      </div>
    </Chat>
    </div>
  );
}

export default App;
