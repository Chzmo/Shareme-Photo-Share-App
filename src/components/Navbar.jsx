import React from 'react'
import {Link, useNavigate, UseNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'

function Navbar({serchTerm, setSearchTerm, user}) {
  const navigate = useNavigate();

  if(!user) return null

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch />bvcbc
      </div>
    </div>
  )
}

export default Navbar