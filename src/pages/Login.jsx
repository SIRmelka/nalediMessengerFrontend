import React, { useContext, useState } from 'react'
import axios from 'axios'
import LogInput from '../coponents/LogInput'
import SignInput from '../coponents/SignInput'
import { userContext } from '../context'

const Login = () => {
  const host = `${process.env.REACT_APP_LOCAL_HOST}/users/`

  const { setIsConnected, setProfile } = useContext(userContext)

  const [connexionMessage, setConexionMessage] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [method, setMethod] = useState('login')

  const login = () => {
    axios({
      method: 'post',
      url: host + 'login',
      data: {
        email: email,
        password: password,
      },
    })
      .then((message) => {
        setConexionMessage({ message: 'ok', status: message.status })
        localStorage.setItem('token', message.data.token)
        console.log(message)
        localStorage.setItem('userId', message.data.userId)
        localStorage.setItem('profile', message.data.profile)
        setIsConnected(true)
        setProfile(message.data.profile)
      })
      .catch((err) => {
        setConexionMessage({
          message: err.response.data,
          status: err.response.status,
        })
      })
  }

  const signup = () => {
    axios({
      method: 'post',
      url: host + method,
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        profile: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`,
        password: password,
      },
    })
      .then(() => {
        login()
      })
      .catch((err) => {
        console.log(err)
        setConexionMessage({
          message: err.response.data,
          status: err.response.status,
        })
      })
  }

  const submit = () => {
    method === 'login' ? login() : signup()
  }
  return (
    <div className="login">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="topper">
          <h1>Naledi Messenger</h1>
          <img
            src="https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg"
            alt="logo"
          ></img>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
          className={connexionMessage.status === 401 ? 'form-error' : ''}
        >
          {method === 'login' ? (
            <LogInput
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <SignInput
              firstname={firstname}
              setFirstname={setFirstname}
              lastname={lastname}
              setLastname={setLastname}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          )}

          {connexionMessage.status === 401 ? (
            <p className="error-message">{connexionMessage.message}</p>
          ) : (
            ''
          )}

          <button> Se connecter</button>
        </form>

        <div className="footer">
          <span>Mot de passe oublié</span>
          {method === 'login' ? (
            <span onClick={() => setMethod('signup')}>Inscription</span>
          ) : (
            <span onClick={() => setMethod('login')}>Se connecter</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
