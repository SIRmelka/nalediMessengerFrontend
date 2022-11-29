import React, { useContext } from 'react'
import Contacts from '../components/Contacts'
import Messages from '../components/Messages'
import SideBar from '../components/SideBar'
import { userContext } from '../context'

const Home = () => {
  const { selectedGroup } = useContext(userContext)
  return (
    <div className="home">
      <SideBar />
      <Contacts />
      {selectedGroup.length != 0 ? (
        <Messages />
      ) : (
        <div className="no-message messages"></div>
      )}
    </div>
  )
}

export default Home
