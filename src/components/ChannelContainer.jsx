import React, { useEffect } from 'react';
import { Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import '../App.css';
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const ChannelContainer = () => {
    useEffect(() => {
            const params = new URLSearchParams(window.location.search.substring(1));
            let code = params.get("code");
            cookies.set("code", code);
            
            const URL = `http://localhost:3001/auth/googleauth`;
            fetch(URL, {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
             }, 
                body: JSON.stringify({code: code, email: cookies.get("email")})
                }).catch(error => console.log(error) )        
 
    });

    const { client } = useChatContext();
    const { id } = client.user;
    const type = 'messaging';
    const channelName = 'business'
    const channel = client.channel(type, channelName, {
        name: channelName,
        members: [id]
    });

    return (
        <div>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </div>
    )
}

export default ChannelContainer;