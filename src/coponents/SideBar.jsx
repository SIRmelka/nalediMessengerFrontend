import React, { useContext } from 'react';
import { userContext } from '../context';
import {AiFillMessage} from 'react-icons/ai'
import {HiUserGroup} from 'react-icons/hi'

import {IoLogOut} from 'react-icons/io5'
const SideBar = () => {

    const {setIsConnected,setSearchingContacts} = useContext(userContext)



    return (
        <div className='side-bar'>
            <div className='picture' style={{backgroundImage:`url(https://static.toiimg.com/photo/83890825/83890825.jpg?v=3)`}}>
                
            </div>
            <div className='navigation'>
                <div className='icons' onClick={()=>setSearchingContacts(false)}>
                    <AiFillMessage/>
                </div>
                <div className='icons' onClick={()=>setSearchingContacts(true)}>
                    <HiUserGroup/>
                </div>
            </div>
            <div className='logout' onClick={()=>{setIsConnected(false);localStorage.removeItem('token')}}>
                <IoLogOut/>
            </div>
        </div>
    );
};

export default SideBar;