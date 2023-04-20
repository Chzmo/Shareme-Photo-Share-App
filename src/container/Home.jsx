import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components/index';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logo.png';

import {userQuery} from '../utils/data'
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const UserInfo = fetchUser();
  const navigate = useNavigate()
  
  useEffect(() =>{
    if(!UserInfo) navigate('/login');
  }, [])

  useEffect(() => {
    const query = userQuery(UserInfo?.sub);
    client.fetch(query)
      .then((data)=>{
        setUser(data[0]);
        console.log(data[0]);
      })
  }, []);

  useEffect(() =>{
    scrollRef.current.scrollTo(0, 0);
  }, [])
  
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className="hidden md:flex hscreen flex-initial">
        <Sidebar user={user && user}/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
          <Link to="/">
            <img src={logo} alt="logo" className="w-28"/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='rounded-full w-12 h-12'/>
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-shadow z-10 animate-slide-in">
            <div className='absolute w-full flex justify-end'>
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closedToggle={setToggleSidebar}/>
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="*" element={<Pins user = {user && user}/>}/>
          <Route path="/user-profile/:userId" element={<UserProfile />}/>
        </Routes>
      </div>
    </div>
  )
}


export default Home

