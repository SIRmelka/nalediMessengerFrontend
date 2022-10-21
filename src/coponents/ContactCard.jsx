import React from 'react';
import { BsDot } from 'react-icons/bs';

const ContactCard = ({avatar,username,message}) => {
    return (
        <div className='contact-card'>
                    
                    <span className='avatar' style={{backgroundImage:`url(${avatar})`}}>
                        
                    </span>
                    <div className='message-preview'>
                        {/* <span class="new"><BsDot/></span> */}
                        <p className='contact-name'>{username}</p>
                        <p className='last-message'>{message}</p>
                    </div>

        </div>
    );
};

export default ContactCard;