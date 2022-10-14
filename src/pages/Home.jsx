import React from 'react';
import Contacts from '../coponents/Contacts';
import Messages from '../coponents/Messages';
import SideBar from '../coponents/SideBar';

const Home = () => {

    return (
        <div className='home'>
            <SideBar/>
            <Contacts/>
            <Messages/>
        </div>
    );
};

export default Home;