import React, { useContext } from 'react';
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdSend} from 'react-icons/io'
import { userContext,socket } from '../context';
import axios from 'axios';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'

const BottomBar = () => {
    
    const {selectedGroup,selectedUser,userId,host,token,setSending,putEmoji,setPutEmoji,setLastMessage} = useContext(userContext)
    // console.log(curentMessage)
    const [curentMessage,setCurentMessage] = useState()
  
    const sendMessage = async() =>{
        setSending(true)
        setCurentMessage("")
        await axios({
            method:'post',
            url:`${host}/api/messages/newmessage/${selectedGroup}?from=${userId}&to=${selectedUser}`,
            headers:{
                'Authorization' : token
            },
            data:{
                message: curentMessage,
                media:""
            }
        })
        .then(message=>{
            socket.emit('sendmessage', curentMessage )

        })
        .catch(err => console.log(err))
        
        setLastMessage(Date.now)
    }

    return (
        <div className='bottom-section'>
            {
                putEmoji?
                    <div className='emojis'>
                        <EmojiPicker onEmojiClick={(emojiData,e)=>{
                        setCurentMessage(curentMessage+" "+emojiData.emoji)
                        }}/>
                    </div>:""
            }
       
             
        <div className='text-zone'>
            <BsEmojiSmile onClick={()=>setPutEmoji(!putEmoji)}/>
            <input onClick={()=>setPutEmoji(false)} onChange={(e)=>{setCurentMessage(e.target.value)}} value={curentMessage}>
            </input>
            <AiFillCamera/>
        </div>
        <div className='send-icon' onClick={()=>sendMessage()}>
            <IoMdSend/>
        </div>
    </div>
    );
};

export default BottomBar;