import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { aiFillCloseCircle } from 'react-icons/ai';
import { link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components/index';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      Home
    </div>
  )
}

export default Home