import React, { useContext, useState } from 'react';
import axios from 'axios'
import LogInput from '../coponents/LogInput';
import SignInput from '../coponents/SignInput';
import { userContext } from '../context';


const Login = () => {

const host = "http://localhost:3001/users/login"


const {setIsConnected,setUserId} = useContext(userContext)

const [connexionMessage,setConexionMessage] = useState({})
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [firstname,setFirstname] = useState("")
const [lastname,setLasttname] = useState("")
const [age,setAge] = useState("")
const [profile,setprofile] = useState("")
const [method,setMethod] = useState('signin')

const submit = ()=>{
    axios({
        method: 'post',
        url: host,
        data: {
          email: email,
          password: password
        }
    })
    .then((message) => {
        setConexionMessage({message:"ok",status:message.status})
        localStorage.setItem('token',message.data.token)
        console.log(message);
        localStorage.setItem('userId',message.data.userId)
        setIsConnected(true)
    })
    .catch((err) => {
        setConexionMessage({message:err.response.data,status:err.response.status})
    })
}
console.log(connexionMessage);
    return (
        <div className='login'>
           <div className='left-section'></div>
           <div className='right-section'>
                <div className='topper'>
                <h1>Naledi Messenger</h1>
                <img src='https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg'></img>
                </div>
                

                <form onSubmit={(event)=>{event.preventDefault();submit()}} className={connexionMessage.status==401?'form-error':""}>
                    {
                        method=="signin"?
                        <LogInput
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        />:
                        <SignInput/>
                    }

                {
                    connexionMessage.status==401?
                    <p className='error-message'>{connexionMessage.message}</p>:""
                }

                <button> Se connecter</button> 
                </form>

                <div className='footer'>
                    <span >Mot de passe oublié</span>
                    {method=='signin'?
                    <span onClick={()=>setMethod('signup')}>S'inscrire</span>:
                    <span onClick={()=>setMethod('signin')}>Se connecter</span>}
                </div>
           </div>
        </div>
    );
};

export default Login;