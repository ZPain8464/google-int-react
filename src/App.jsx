import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "./App.css"
import Cookies from "universal-cookie";

import Auth from "./components/Auth"
import ChannelContainer from "./components/ChannelContainer";
require("dotenv").config();

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);
const cookies = new Cookies();
const authToken = cookies.get('token')

if (authToken) {
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
    // TODO: use localStorage
    // Logs out of app by removing token from cookies
    cookies.remove('token');
    cookies.remove('name');
    cookies.remove('userId');
    cookies.remove('code');
    cookies.remove('googleToken');

    window.location.reload();
  }

  const getCal = async () => {
    try {
      const token = cookies.get("googleToken")
      const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).json();

      console.log("GET GCAL RESPONSE", res);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client}>
        <LogoutButton logout={logout} />
        <GetCal getCal={getCal} />
        <div>
          <ChannelContainer />
        </div>
      </Chat>
    </div>
  );
}

export default App;
