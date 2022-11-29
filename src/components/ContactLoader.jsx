import React from 'react'

const count = ['m', 'e', 'l', 'c', 'h', 'i']

function ContactLoader() {
  return (
    <>
      {count.map((element, index) => {
        return (
          <div className="contact-loader" key={index}>
            <div className="inner-loader"></div>
          </div>
        )
      })}
    </>
  )
}

export default ContactLoader
