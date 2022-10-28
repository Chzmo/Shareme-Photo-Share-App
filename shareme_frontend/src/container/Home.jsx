import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { aiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components/index';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logo.png';

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className="hidden md:flex hscreen flex-initial">
        <Sidebar/>
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu fontFamily={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
        <Link to="/">
          <img src={logo} alt="logo" className="w-28"/>
        </Link>
        </div>
    </div>
  )
}

export default Home