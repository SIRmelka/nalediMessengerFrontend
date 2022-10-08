import React, { useState } from 'react';
import styled   from 'styled-components'
import axios from 'axios'


const Login = () => {

const host = "http://localhost:3001/user/login"

const [connexionMessage,setConexionMessage] = useState()

const submit = ()=>{
    axios({
        method: 'post',
        url: host,
        data: {
          email: 'melkabotale1@gmail.com',
          password: 'matrezelda'
        }
    })
    .then(message => console.log(message))
    .catch(err => console.log(err))
}

    return (
        <div className='login'>
           <div className='left-section'E>
           </div>
           <div className='right-section'>
                <div className='topper'>
                <h1>Naledi Messenger</h1>
                <img src='https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg'></img>
                </div>
                

                <form onSubmit={(event)=>{event.preventDefault();submit()}}>
                <input placeholder='E-mail address'></input>
                <input type='Password' placeholder='Password'></input>
                <button> Se connecter</button> 
                </form>

                <div className='footer'>
                    <span>Mot de passe oublié</span>
                    <span>S'inscrire</span>
                </div>
           </div>
        </div>
    );
};

export default Login;