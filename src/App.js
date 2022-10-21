import './App.scss';
import Login from './pages/Login';
import { userContext } from './context';
import { useEffect, useRef, useState } from 'react';
import Home from './pages/Home';




function App() {

  const [token,setToken] = useState()
  const [isConnected, setIsConnected] = useState()
  const host = process.env.REACT_APP_LOCAL_HOST;

  const [userId,setUserId] = useState()
  const [username,setUsername] = useState()
  const [profile,setProfile] = useState("")
  const [selectedGroup,setSelectedGroup] = useState([])
  const [selectedUser,setSelectedUser] = useState([])
  const [conversations,setConversations] = useState([])
  const [sending,setSending] = useState(false)
  const [lastMessage,setLastMessage] = useState()
  const [curentMessage,setCurentMessage] = useState(' ')
  const [putEmoji,setPutEmoji] = useState(false)
  const [searchingContacts, setSearchingContacts] = useState(false)

  useEffect(()=>{
    if (localStorage.getItem('token')){
      
      setIsConnected(true)
      setToken(localStorage.getItem('token'))
      setUserId(localStorage.getItem('userId'))
    }
  })

  return (
    <div className="App">
      <userContext.Provider value={{
        token,setIsConnected,host,userId,
        setUserId,username,setUsername,
        selectedGroup,setSelectedGroup,
        conversations,setConversations,
        sending,setSending,
        lastMessage,setLastMessage,
        curentMessage,setCurentMessage,
        putEmoji,setPutEmoji,
        searchingContacts,setSearchingContacts,
        selectedUser,setSelectedUser,
        profile,setProfile
        }}>
      {
        isConnected?
        <Home/>:<Login/>
      }
     
     </userContext.Provider>
    </div>
  );
}

export default App;
