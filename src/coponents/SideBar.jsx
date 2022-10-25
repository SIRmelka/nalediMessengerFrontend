import React, { useContext } from 'react'
import { userContext } from '../context'
import { AiFillMessage } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'

import { IoLogOut } from 'react-icons/io5'

const SideBar = () => {
  const { setIsConnected, setSearchingContacts, profile, setProfile } =
    useContext(userContext)

  setProfile(localStorage.getItem('profile'))

  return (
    <div className="side-bar">
      <div
        className="picture"
        style={{ backgroundImage: `url(${profile})` }}
      ></div>
      <div className="navigation">
        <div className="icons" onClick={() => setSearchingContacts(false)}>
          <AiFillMessage />
        </div>
        <div className="icons" onClick={() => setSearchingContacts(true)}>
          <HiUserGroup />
        </div>
      </div>
      <div
        className="logout"
        onClick={() => {
          setIsConnected(false)
          localStorage.removeItem('token')
        }}
      >
        <IoLogOut />
      </div>
    </div>
  )
}

export default SideBar
