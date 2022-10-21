import React, { useContext, useEffect } from 'react';
import {BiSearch} from 'react-icons/bi'
import {FiMoreVertical} from 'react-icons/fi'
import ContactCard from './ContactCard';
import { useState } from 'react';
import axios from 'axios';
import { userContext,socket } from '../context';

const Contacts = () => {

    const {host,token,
        userId,setSelectedGroup,
        conversations,setConversations,
        sending,setLastMessage,
        searchingContacts,setSearchingContacts,
        selectedUser,setSelectedUser,
        setSending
       
    } = useContext(userContext)

    const [userList,setUserList,lastMessage] = useState([])

    useEffect(()=>{
        socket.on('newmessage', (data)=>{
            allconversations()
        })
    },[socket])

    const allconversations = ()=>{
        axios({
            method:'get',
            url:`${host}/api/messages/conversations/${userId}`,
            headers:{
                'Authorization' : token
            }
        })
        .then((users)=>{
            setConversations(users.data)
            setSending(false)
            }
        )
        .catch(err => console.log(err))
        setLastMessage(Date.now())
    }

    useEffect(()=>{
            allconversations()
    },[sending,searchingContacts])


    useEffect(()=>{
        axios({
            method:'get',
            url:`${host}/users`,
            headers:{
                'Authorization' : token
            }
        })
        .then(users=>setUserList(users.data))
        .catch(err => console.log(err))

    },[selectedUser])

    const startDiscussion = (id)=>{
        axios({
            method:'get',
            url:`${host}/api/messages/startDiscussion?firstUser=${id}&secondUser=${userId}`,
            headers:{
                'Authorization' : token
            }
        })
        .then(conv=>{
            setSelectedGroup(conv.data._id)
        })
        .catch(err => console.log(err))

     
    }

    return (
        <div className='contacts'>

            <div className='search-bar'>

                <BiSearch className='search-icon'/>
                <input type="text" placeholder='Search'></input>
                <FiMoreVertical className='more-icon'/>

            </div>

            {
                !searchingContacts?
                <div className='contact-list'>
                <h4>Recents</h4>
                {
                    conversations.length?
                    conversations.map((conversation)=>{
                        return <div  onClick={()=>{setSelectedGroup(conversation._id)}}>
                        <ContactCard 
                        avatar={conversation.users[0]._id==userId?conversation.users[1].profile:conversation.users[0].profile}
                        message={conversation.messages.length!=0?conversation.messages[conversation.messages.length-1].message:"Brouillon"}
                        username={
                            conversation.users[0]._id==userId?conversation.users[1].firstName:conversation.users[0].firstName
                        }
                       
    
                        />
                        </div>
                    }):"loading"
                }  
            </div>:
              <div className='users'>
                <h4>Utilisateurs</h4>
                <div>
                    {
                        userList.map((user)=>{
                            return(
                                <div onClick={()=>{

                                    setSelectedUser(user._id)
                                    startDiscussion(user._id)
                           }}>
                                <ContactCard
                                avatar={user.profile!=''?user.profile:""}
                                username={(user.firstName+" "+user.lastName)}
                                />
                                </div>
                            )
                        })
                    }
                    
                </div>

             </div>
            }
            
        </div>
    );
};

export default Contacts;