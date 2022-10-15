import React, { useContext,useEffect, useState } from 'react';
import MessageTile from './MessageTile';
import ScrollToBottom from 'react-scroll-to-bottom'
import { userContext } from '../context';
import axios from 'axios';
import BottomBar from './BottomBar';

const Messages = () => {

    const {host,token,selectedGroup,setSelectedUser,userId,conversations,lastMessage} = useContext(userContext)

    const [messages,setMessages] = useState([])
    const [loader,setLoader] = useState(true)

    useEffect(()=>{

        conversations.map((element)=>{
         element._id==selectedGroup&&
               setMessages(element)
        })

        setLoader(false)
    },[selectedGroup,lastMessage])

    messages.users?
        messages.users[0]._id==userId?setSelectedUser(messages.users[1]._id): setSelectedUser(messages.users[0]._id):console.log("");
    return (
        <div className='messages'>
            <div className='messages-pannel'>
                <div className='chat-info'>

                    
                    <div className='discussion-avatar' style={{backgroundImage:`url(${!loader?messages.users[0].id!=userId?messages.users[1].profile:messages.users[0].profile:""})`}}>

                    </div>
                    <div className='about-discussion'>
                        <p className='username'>{!loader?messages.users[0].id!=userId?messages.users[1].firstName:messages.users[0].firstName:""}</p>
                        <p>online</p>
                    </div>
                </div>
                <ScrollToBottom className="scroller">
                <div className='chat-section'>
                   
                   {
                    messages.length!=0?
                    messages.messages.map((message)=>{
                        return  <MessageTile 
                        from={message.from==userId?"other-messages":""}
                        display={message.from==userId?"you":"other"}
                        pointer={message.from==userId?"other":"me"}
                        message={message.message}
                        />

                    }):""
                   }
                   
                    
    
                </div></ScrollToBottom>
               <BottomBar/>
            </div>
        </div>
    );
};

export default Messages;