import React, { useContext, useEffect } from 'react';
import {BiSearch} from 'react-icons/bi'
import {FiMoreVertical} from 'react-icons/fi'
import ContactCard from './ContactCard';
import { useState } from 'react';
import axios from 'axios';
import { userContext } from '../context';

const Contacts = () => {

    const {host,token,
        userId,setSelectedGroup,
        conversations,setConversations,
        sending,setLastMessage,
        searchingContacts,setSearchingContacts,
        selectedUser,setSelectedUser
    } = useContext(userContext)

    const [userList,setUserList,lastMessage] = useState([])


    useEffect(()=>{
            axios({
            method:'get',
            url:`${host}/api/messages/conversations`,
            headers:{
                'Authorization' : token
            }
        })
        .then(users=>setConversations(users.data))
        .catch(err => console.log(err))
        setLastMessage(Date.now())
        console.log('reload messages');
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

        console.log('rendering');
    },[selectedUser])

    console.log(userId);

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
            console.log(conv)
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
                    }):""
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
                                      {console.log('actual selected user',selectedUser)}
                                <ContactCard
                                avatar={user.profile!=''?user.profile:"https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"}
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