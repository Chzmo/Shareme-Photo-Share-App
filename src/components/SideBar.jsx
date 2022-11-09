import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {IoIoArrowforward} from 'react-icons/io';

import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold boarder-r-2 boarder-black transition-all duration-200 ease-in-out capitalize'

const catergories = [
  {name: 'Animals'},
  {name: 'wallpapers'},
  {name: 'Photography'},
  {name: 'Gaminh'},
  {name: 'Coding'},
]

const SideBar = ({user, closedToggle}) =>{
  const handleCloseSidebar = () => {
    if(closedToggle) closedToggle(false)
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link 
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className='w-full'/>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover catergories</h3>
          {catergories.slice(0, catergories.length - 1).map((catergory) => (
            <NavLink
            to={`/category/${catergory.name}`}
              className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={catergory.name}
            >
              {catergory.name}
            </NavLink>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar