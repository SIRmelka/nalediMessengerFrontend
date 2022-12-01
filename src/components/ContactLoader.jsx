import React from 'react'

const count = ['m', 'e', 'l', 'c', 'h', 'i']

function ContactLoader() {
  return (
    <>
      {count.map((element, index) => {
        return (
          <div className="contact-loader" key={index}>
            <div className="circle"></div>
            <div className="right">
              <div className="pre-name"></div>
              <div className="pre-message"></div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ContactLoader
