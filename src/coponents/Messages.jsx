import React, { useContext, useEffect, useState } from 'react'
import MessageTile from './MessageTile'
import ScrollToBottom from 'react-scroll-to-bottom'
import { userContext, socket } from '../context'
import BottomBar from './BottomBar'

const Messages = () => {
  const {
    selectedGroup,
    selectedUser,
    setSelectedUser,
    userId,
    conversations,
    sending,
    messages,
    setMessages,
  } = useContext(userContext)

  const [loader, setLoader] = useState(true)

  const audiofile = new Audio('/messageIn.mp3')

  const allmessages = () => {
    conversations.map(async (element) => {
      return (await element._id) === selectedGroup && setMessages(element)
    })
    setLoader(false)
  }

  useEffect(() => {
    allmessages()
  }, [messages, selectedGroup])

  useEffect(() => {
    socket.on('newmessage', () => {
      allmessages()
      audiofile.play()
    })
  }, [socket])

  messages.users
    ? messages.users[0]._id === userId
      ? setSelectedUser(messages.users[1]._id)
      : setSelectedUser(messages.users[0]._id)
    : ''

  return (
    <div className="messages">
      <div className="messages-pannel">
        <div className="chat-info">
          <div
            className="discussion-avatar"
            style={{
              backgroundImage: `url(${
                !loader
                  ? messages.users
                    ? messages.users[0]._id === selectedUser
                      ? messages.users[0].profile
                      : messages.users[1].profile
                    : ''
                  : ''
              })`,
            }}
          ></div>
          <div className="about-discussion">
            <p className="username">
              {!loader
                ? messages.users
                  ? messages.users[0]._id === selectedUser
                    ? messages.users[0].firstName
                    : messages.users[1].firstName
                  : ''
                : ''}
            </p>
            <p>online</p>
          </div>
        </div>
        <ScrollToBottom className="scroller">
          <div className="chat-section">
            {messages.length !== 0
              ? messages.messages.map((message, index) => {
                  return (
                    <MessageTile
                      key={index}
                      from={message.from === userId ? 'other-messages' : ''}
                      display={message.from === userId ? 'you' : 'other'}
                      pointer={message.from === userId ? 'other' : 'me'}
                      message={message.message}
                      image={message.media}
                    />
                  )
                })
              : ''}

            {sending ? (
              <MessageTile
                from={'other-messages sending'}
                display={'you'}
                pointer={'other'}
                message={'...sending'}
              />
            ) : (
              ''
            )}
          </div>
        </ScrollToBottom>

        <BottomBar />
      </div>
    </div>
  )
}

export default Messages
