import React from 'react'

const MessageTile = ({ from, pointer, message, image, display }) => {
  return (
    <div className={`message ${display}`}>
      <div className={`message-tile ${from}`}>
        {image ? <img src={image} className="image-sended"></img> : ''}
        <p> {message}</p>
        <div className={`pointer  ${pointer}`}></div>
      </div>
    </div>
  )
}

export default MessageTile
