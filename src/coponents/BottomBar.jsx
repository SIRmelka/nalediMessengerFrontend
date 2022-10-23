import React, { useContext } from 'react';
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdCloseCircle, IoMdSend} from 'react-icons/io'
import { userContext,socket } from '../context';
import axios from 'axios';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'
import { useFileUpload } from 'use-file-upload';

const BottomBar = () => {
    
    const {selectedGroup,selectedUser,userId,host,token,setSending,putEmoji,setPutEmoji,setLastMessage,messages,setMessages} = useContext(userContext)
    // console.log(curentMessage)
    const [curentMessage,setCurentMessage] = useState()
    const [file,setFile] = useFileUpload()
    const [selectedFile,setSelectedFile] = useState(false)
    const [media,setMedia] = useState()
    const fileReader = new FileReader();
  
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
                media:selectedFile
            }
        })
        .then(message=>{
            const data = {
                date: Date.now(),
                from: userId,
                media:"",
                message: curentMessage,
                seen: false
            }
            socket.emit('sendmessage', curentMessage )
            console.log(messages);
            messages.messages.push(data)
            setSending(false)
            setLastMessage(Date.now)

        })
        .catch(err => console.log(err))
        
        
    }

    function printFile(file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          console.log(evt.target.result);
        };
        reader.readAsText(file);
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
            {
            file?
            selectedFile!==''?
            <div className='image-preview'>
                <div  className='image' style={{backgroundImage:`url(${file.source})`}}>
                    <IoMdCloseCircle className='close' onClick={()=>setSelectedFile('')}/>
                </div>
            </div>:""
            :""
            }    
             
        <div className='text-zone'>
            <BsEmojiSmile onClick={()=>setPutEmoji(!putEmoji)}/>
            <input onClick={()=>setPutEmoji(false)} onChange={(e)=>{setCurentMessage(e.target.value)}} value={curentMessage}>
            </input>
            <AiFillCamera onClick={()=>{
                setFile()
                setSelectedFile(file.source)
                }}/>
        </div>
        <div className='send-icon' onClick={()=>sendMessage()}>
            <IoMdSend/>
        </div>

    </div>
    );
};

export default BottomBar;