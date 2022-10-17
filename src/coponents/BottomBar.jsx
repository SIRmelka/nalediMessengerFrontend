import React, { useContext } from 'react';
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdSend} from 'react-icons/io'
import { userContext } from '../context';
import axios from 'axios';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'

const BottomBar = () => {
    
    const {selectedGroup,selectedUser,userId,host,token,setSending,sending,putEmoji,setPutEmoji} = useContext(userContext)
    // console.log(curentMessage)
    const [curentMessage,setCurentMessage] = useState()
  
    const sendMessage = async() =>{
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
            // setSending(sending+1)
            console.log(message)
            setCurentMessage("")
        })
        .catch(err => console.log(err))
        
        
        setSending(sending+1)
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