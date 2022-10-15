import React, { useContext, useEffect } from 'react';
import {BiSearch} from 'react-icons/bi'
import {FiMoreVertical} from 'react-icons/fi'
import ContactCard from './ContactCard';
import { useState } from 'react';
import axios from 'axios';
import { userContext } from '../context';
const Contacts = () => {

    const {host,token,userId,setSelectedGroup,conversations,setConversations,sending,setLastMessage} = useContext(userContext)

    useEffect(()=>{
        getConversations()
        
    },[sending])

    const getConversations = async()=>{

        await axios({
            method:'get',
            url:`${host}/api/messages/conversations`,
            headers:{
                'Authorization' : token
            }
        })
        .then(users=>setConversations(users.data))
        .catch(err => console.log(err))
        console.log('reload messages');
        setLastMessage(Date.now())

    }

    return (
        <div className='contacts'>

            <div className='search-bar'>

                <BiSearch className='search-icon'/>
                <input type="text" placeholder='Search'></input>
                <FiMoreVertical className='more-icon'/>

            </div>

            <div className='contact-list'>
                <h4>Recents</h4>
                {
                    conversations.length?
                    conversations.map((conversation)=>{
                        return <div  onClick={()=>{setSelectedGroup(conversation._id)}}>

                        <ContactCard 
                        avatar={conversation.users[0]._id==userId?conversation.users[1].profile:conversation.users[0].profile}
                        message={conversation.messages.length!=0?conversation.messages[conversation.messages.length-1].message.substring(0,25)+"...":"Brouillon"}
                        username={
                            conversation.users[0]._id==userId?conversation.users[1].firstName:conversation.users[0].firstName
                        }
                       
    
                        />
                        </div>
                    }):""
                }
                

            </div>
        </div>
    );
};

export default Contacts;