import React from 'react';

const SignInput = ({firstname,setFirstname,lastname,setLastname, age, setAge,email,setEmail,password,setPassword,}) => {
    return (
       <>
       <input 
        type='text'
        placeholder='Firstname'
        value={firstname}
        onChange={(event)=>{setFirstname(event.target.value)}}
        ></input>

        <input 
        type='text'
        placeholder='Lastname'
        value={lastname}
        onChange={(event)=>{setLastname(event.target.value)}}
        ></input>

        <input 
        type='text'
        placeholder='age'
        value={age}
        onChange={(event)=>{setAge(event.target.value)}}
        ></input>

       <input 
        type="email" 
        placeholder='E-mail address'
        value={email}
        onChange={(event)=>{setEmail(event.target.value)}}
        ></input>
        
        <input 
        type='password' 
        placeholder='Password'
        value={password}
        onChange={(event)=>{setPassword(event.target.value)}}
        ></input>
       </>
    );
};

export default SignInput;