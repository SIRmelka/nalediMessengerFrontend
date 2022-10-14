import React from 'react';

const LogInput = ({email,setEmail,password,setPassword}) => {
    return (
        <>
        <input 
                        type="email" 
                        placeholder='E-mail address'
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}
                    ></input>
                    <input 
                        type='Password' 
                        placeholder='Password'
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}
                    ></input>
        </>
    );
};

export default LogInput;