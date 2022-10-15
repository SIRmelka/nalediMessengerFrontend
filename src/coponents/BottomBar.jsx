import React, { useContext } from 'react';
import {BsEmojiSmile} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import {IoMdSend} from 'react-icons/io'
import { userContext } from '../context';
import axios from 'axios';

const BottomBar = () => {
    
    const {conversations,selectedGroup,selectedUser,userId,host,token,setSending,sending} = useContext(userContext)

    // console.log(selectedGroup,selectedUser,userId);

    const sendMessage = () =>{
        // alert()
        // axios({
        //     method:'post',
        //     url:`${host}/api/messages/newmessage`,
        //     headers:{
        //         'Authorization' : token
        //     }
        // })
        // .then(message=>{
        //     setSending(sending+1)
        //     // console.log(message)
        // })
        // .catch(err => console.log(err))
        setSending(sending+1)
    }


    return (
        <div className='bottom-section'>
        <div className='text-zone'>
            <BsEmojiSmile/>
            <input>
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