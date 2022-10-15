import React, { useContext, useState } from 'react';
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdSend} from 'react-icons/io'
import { userContext } from '../context';
import axios from 'axios';

const BottomBar = () => {
    
    const {conversations,selectedGroup,selectedUser,userId,host,token,setSending,sending} = useContext(userContext)
    const [message,setMessage] = useState()
    console.log(message)
    const sendMessage = async() =>{
        
       
        await axios({
            method:'post',
            url:`${host}/api/messages/newmessage/${selectedGroup}?from=${userId}&to=${selectedUser}`,
            headers:{
                'Authorization' : token
            },
            data:{
                message: message,
                media:""
            }
        })
        .then(message=>{
            // setSending(sending+1)
            console.log(message)
            setMessage("")
        })
        .catch(err => console.log(err))
        
        
        setSending(sending+1)
        // console.log('')
    }


    return (
        <div className='bottom-section'>
        <div className='text-zone'>
            <BsEmojiSmile/>
            <input onChange={(e)=>{setMessage(e.target.value)}} value={message}>
            </input>
            <AiFillCamera/>
        </div>
        <div className='send-icon' onClick={(e)=>sendMessage(e)}>
            <IoMdSend/>
        </div>
    </div>
    );
};

export default BottomBar;