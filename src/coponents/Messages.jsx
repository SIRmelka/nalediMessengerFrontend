import React, { useContext,useEffect, useState } from 'react';
import MessageTile from './MessageTile';
import ScrollToBottom from 'react-scroll-to-bottom'
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdSend} from 'react-icons/io'
import { userContext } from '../context';
import axios from 'axios';

const Messages = () => {

    const {host,token,selectedGroup,userId,conversations} = useContext(userContext)

    const [messages,setMessages] = useState()

    useEffect(()=>{

        conversations.map((element)=>{
            element._id==selectedGroup&&setMessages(element.messages);
        })
    },[selectedGroup])
  
    return (
        <div className='messages'>
            <div className='messages-pannel'>
                <div className='chat-info'>
                    <div className='discussion-avatar' style={{backgroundImage:`url(https://macoiffeuseafro.com/blog/wp-content/uploads/2018/08/viola_davis_800x450_0-620x420.jpg)`}}>

                    </div>
                    <div className='about-discussion'>
                        <p className='username'>Analis kitting</p>
                        <p>online</p>
                    </div>
                </div>
                <ScrollToBottom className="scroller">
                <div className='chat-section'>
                   
                   {
                    messages?
                    messages.map((message)=>{
                        console.log(message)
                        console.log(userId)
                        return  <MessageTile 
                        from={message.from==userId?"other-messages":""}
                        display={message.from==userId?"you":"other"}
                        pointer={message.from==userId?"other":"me"}
                        message={message.message}
                        />

                    }):""
                   }
                   
                    
    
                </div></ScrollToBottom>
                <div className='bottom-section'>
                    <div className='text-zone'>
                        <BsEmojiSmile/>
                        <input>
                        </input>
                        <AiFillCamera/>
                    </div>
                    <div className='send-icon'>
                        <IoMdSend/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;