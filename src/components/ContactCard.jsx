import React from 'react'

function ContactCard({ avatar, username, message }) {
  return (
    <div className="contact-card">
      <span className="avatar" style={{ backgroundImage: `url(${avatar})` }} />
      <div className="message-preview">
        {/* <span class="new"><BsDot/></span> */}
        <p className="contact-name">{username}</p>
        <p className="last-message">{message}</p>
      </div>
    </div>
  )
}

export default ContactCard
