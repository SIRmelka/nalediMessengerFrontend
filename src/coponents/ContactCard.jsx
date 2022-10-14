import React from 'react';

const ContactCard = ({avatar,username,message}) => {
    return (
        <div className='contact-card'>
                    <span className='avatar' style={{backgroundImage:`url(${avatar})`}}></span>
                    <div className='message-preview'>
                        <p className='contact-name'>{username}</p>
                        <p className='last-message'>{message}</p>
                    </div>

        </div>
    );
};

export default ContactCard;