import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'

function Navbar({searchTerm, setSearchTerm, user}) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-mc bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1"/>
        <input 
          type="text" 
          placeholder="Search..."
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
        
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block w-12 md:w-12 rounded-full">
          <img src={user?.image} alt="user" className='w-12 md:w-12 rounded-full' />
        </Link>
        <Link to="create-pin" className="bg-black text-white rounded-lg w-14 h-11 md:w-14 md:h-11 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
