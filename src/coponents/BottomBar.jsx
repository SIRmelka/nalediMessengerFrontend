import React, { useContext, useRef, useState, useEffect } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiFillCamera } from 'react-icons/ai'
import { IoMdSend, IoMdCloseCircle } from 'react-icons/io'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import { userContext, socket } from '../context'

function BottomBar() {
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
  const [curentMessage, setCurentMessage] = useState()
  const [curentImage, setCurentImage] = useState()
  const [selectedFile, setSelectedFile] = useState(false)
  const [previewLink, setPreviewLink] = useState()
  const imageRef = useRef()
  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append('upload_preset', 'sirMelka')

  useEffect(() => {
    if (!selectedFile) return setPreviewLink(null)
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      setPreviewLink(reader.result)
    }
  }, [selectedFile])

  const sendMessage = async () => {
    setSending(true)
    messageSent.play()
    setCurentMessage('')
    setPreviewLink('')
    selectedFile !== ''
      ? await axios
          .post(
            'https://api.cloudinary.com/v1_1/drfvs4cyj/image/upload/',
            formData
          )
          .then((res) => {
            setCurentImage(res.data.secure_url)
            setSelectedFile('')
          })
      : ''
    await axios({
      method: 'post',
      url: `${host}/api/messages/newmessage/${selectedGroup}?from=${userId}&to=${selectedUser}`,
      headers: {
        Authorization: token,
      },
      data: {
        message: curentMessage,
        media: curentImage,
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
      {previewLink ? (
        <div className="image-preview">
          <div
            className="image"
            style={{ backgroundImage: `url(${previewLink})` }}
          >
            <IoMdCloseCircle
              className="close"
              onClick={() => setSelectedFile('')}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="text-zone">
        <BsEmojiSmile onClick={() => setPutEmoji(!putEmoji)} />
        <input
          onClick={() => setPutEmoji(false)}
          onChange={(e) => {
            setCurentMessage(e.target.value)
          }}
          value={curentMessage}
        />
        <input
          ref={imageRef}
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="image-input"
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
