import React, { useContext } from 'react';
import { userContext } from '../context';
import Contacts from '../coponents/Contacts';
import Messages from '../coponents/Messages';
import SideBar from '../coponents/SideBar';

const Home = () => {

    const {selectedGroup} = useContext(userContext)
    return (
        <div className='home'>
            <SideBar/>
            <Contacts/>
            {
                selectedGroup.length!=0?
                <Messages/>:<div className='no-message messages'></div>
            }
           
        </div>
    );
};

export default Home;