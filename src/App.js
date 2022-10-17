import './App.scss';
import Login from './pages/Login';
import { userContext } from './context';
import { useEffect, useState } from 'react';
import Home from './pages/Home';




function App() {

  const [token,setToken] = useState()
  const [isConnected, setIsConnected] = useState()
  const host = process.env.REACT_APP_LOCAL_HOST;

  const [userId,setUserId] = useState()
  const [username,setUsername] = useState()
  const [selectedUser,setSelectedUser] = useState()
  const [selectedGroup,setSelectedGroup] = useState([])
  const [conversations,setConversations] = useState([])
  const [sending,setSending] = useState(0)
  const [lastMessage,setLastMessage] = useState()
  const [curentMessage,setCurentMessage] = useState('')
  const [putEmoji,setPutEmoji] = useState(false)
  const [searchingContacts, setSearchingCotacts] = useState(true)

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
        setUserId,username,selectedUser,
        setSelectedUser,selectedGroup,setSelectedGroup,
        conversations,setConversations,
        sending,setSending,
        lastMessage,setLastMessage,
        curentMessage,setCurentMessage,
        putEmoji,setPutEmoji,
        searchingContacts,setSearchingCotacts
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
