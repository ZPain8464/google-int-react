import React, { useEffect, useState } from 'react';
import { Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, useChatContext, useChannelStateContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const ChannelContainer = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {

            const googleAuthToken = cookies.get('googleToken');
            if (!googleAuthToken) {
                console.log("no google auth")
            const params = new URLSearchParams(window.location.search.substring(1));
            let code = params.get("code");
            cookies.set("code", code);
            
            const URL = `http://localhost:3001/auth/googleauth`;
            fetch(URL, {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
             }, 
                body: JSON.stringify({code: code})
                }).then((res) => res.json()).then((gt) => {
                    const googleToken = gt.token;
                    cookies.set('googleToken', googleToken);
                    // const gToken = localStorage('gToken', `${googleToken}`)
                    });    
            }              
    });

    const { client } = useChatContext();
    const { name, id } = client.user;
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