import React, { useContext, useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiFillCamera } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import { userContext, socket } from '../context'

function BottomBar() {
  // const [messageIn] = useState(new Audio('../messageIn.mp3'))
  const messageSent = new Audio('/messageSent.mp3')

  const {
    selectedGroup,
    selectedUser,
    userId,
    host,
    token,
    setSending,
    putEmoji,
    setPutEmoji,
    setLastMessage,
    messages,
  } = useContext(userContext)
  // console.log(curentMessage)
  const [curentMessage, setCurentMessage] = useState()
  const [selectedFile] = useState(false)

  const sendMessage = async () => {
    setSending(true)
    messageSent.play()
    setCurentMessage('')
    await axios({
      method: 'post',
      url: `${host}/api/messages/newmessage/${selectedGroup}?from=${userId}&to=${selectedUser}`,
      headers: {
        Authorization: token,
      },
      data: {
        message: curentMessage,
        media: selectedFile,
      },
    })
      .then(() => {
        const data = {
          date: Date.now(),
          from: userId,
          media: '',
          message: curentMessage,
          seen: false,
        }
        socket.emit('sendmessage', curentMessage)
        messages.messages.push(data)
        setSending(false)
        setLastMessage(Date.now)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="bottom-section">
      {putEmoji ? (
        <div className="emojis">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setCurentMessage(`${curentMessage}  ${emojiData.emoji}`)
            }}
          />
        </div>
      ) : (
        ''
      )}
      {/* {file ? (
        selectedFile !== '' ? (
          <div className="image-preview">
            <div
              className="image"
              style={{ backgroundImage: `url(${file.source})` }}
            >
              <IoMdCloseCircle
                className="close"
                onClick={() => setSelectedFile('')}
              />
            </div>
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )} */}

      <div className="text-zone">
        <BsEmojiSmile onClick={() => setPutEmoji(!putEmoji)} />
        <input
          onClick={() => setPutEmoji(false)}
          onChange={(e) => {
            setCurentMessage(e.target.value)
          }}
          value={curentMessage}
        />
        <AiFillCamera onClick={() => {}} />
      </div>
      <div className="send-icon" onClick={() => sendMessage()}>
        <IoMdSend />
      </div>
    </div>
  )
}

export default BottomBar
