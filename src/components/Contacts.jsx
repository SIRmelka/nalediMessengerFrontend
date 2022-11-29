/* eslint-disable */
import React, { useContext, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FiMoreVertical } from 'react-icons/fi'
import ContactCard from './ContactCard'
import { useState } from 'react'
import axios from 'axios'
import { userContext, socket } from '../context'
import ContactLoader from './ContactLoader'

const Contacts = () => {
  const {
    host,
    token,
    userId,
    selectedGroup,
    setSelectedGroup,
    conversations,
    setConversations,
    searchingContacts,
    setSearchingContacts,
    selectedUser,
    setSelectedUser,
    setSending,
    lastMessage,
  } = useContext(userContext)

  const [userList, setUserList] = useState([])

  useEffect(() => {
    socket.on('newmessage', () => {
      allconversations()
    })
  }, [])

  const allconversations = () => {
    axios({
      method: 'get',
      url: `${host}/api/messages/conversations/${userId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((users) => {
        setConversations(users.data)
        setSending(false)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    allconversations()
  }, [lastMessage, selectedUser])

  useEffect(() => {
    axios({
      method: 'get',
      url: `${host}/users`,
      headers: {
        Authorization: token,
      },
    })
      .then((users) => setUserList(users.data))
      .catch((err) => console.log(err))
  }, [selectedUser])

  const startDiscussion = (id) => {
    axios({
      method: 'get',
      url: `${host}/api/messages/startDiscussion?firstUser=${id}&secondUser=${userId}`,
      headers: {
        Authorization: token,
      },
    })
      .then((conv) => {
        setSelectedGroup(conv.data._id)
        setSearchingContacts(false)
        console.log(selectedGroup)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="contacts">
      <div className="search-bar">
        <BiSearch className="search-icon" />
        <input type="text" placeholder="Search"></input>
        <FiMoreVertical className="more-icon" />
      </div>

      {!searchingContacts ? (
        <div className="contact-list">
          <h4>Recents</h4>
          {conversations.length ? (
            conversations.map((conversation, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedGroup(conversation._id)
                  }}
                >
                  <ContactCard
                    avatar={
                      conversation.users[0]._id === userId
                        ? conversation.users[1].profile
                        : conversation.users[0].profile
                    }
                    message={
                      conversation.messages.length != 0
                        ? conversation.messages[
                            conversation.messages.length - 1
                          ].message
                        : 'Brouillon'
                    }
                    username={
                      conversation.users[0]._id === userId
                        ? conversation.users[1].firstName
                        : conversation.users[0].firstName
                    }
                  />
                </div>
              )
            })
          ) : (
            <ContactLoader />
          )}
        </div>
      ) : (
        <div className="users">
          <h4>Utilisateurs</h4>
          <div>
            {userList.map((user, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    {
                      if (userId !== user._id) {
                        startDiscussion(user._id)
                        setSelectedUser(user._id)
                      } else {
                        alert('you')
                      }
                    }
                  }}
                >
                  <ContactCard
                    avatar={user.profile != '' ? user.profile : ''}
                    username={user.firstName + ' ' + user.lastName}
                    message={user._id === userId ? 'Vous' : ''}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Contacts
