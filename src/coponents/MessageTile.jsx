import React from 'react';

const MessageTile = ({from,pointer,message,display}) => {
    return (
        <div className={`message ${display}`}>
            <div className={`message-tile ${from}`}>
                <p> {message}</p>          
                <div className={`pointer  ${pointer}`}></div>
            </div>
        </div>
    );
};

export default MessageTile;