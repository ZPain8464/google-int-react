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
    id: cookies.get('user_id'),
    name: cookies.get("name"),
  }, authToken);
}

const LogoutButton = ({ logout }) => (<button className="logout-button" onClick={logout}>Logout</button>);

const App = () => {
  const logout = () => {
    cookies.remove('token');
    cookies.remove('name');
    cookies.remove('user_id');
    cookies.remove('code');

    window.location.reload();
  }

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client}>
        <div className="sidebar">
        <LogoutButton logout={logout} />
        </div>
        <div>
          <ChannelContainer />
        </div>
      </Chat>
    </div>
  );
}

export default App;
