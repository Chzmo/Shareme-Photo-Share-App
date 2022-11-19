import React, { useEffect, useState } from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useNavigate, useParams} from 'react-router-dom'
import {GoogleLogout, GooglrLogout} from 'react-google-login'

import{userCreatedPinsQuery, userQuery, userSavedPinsQuery} from './../utils/data'
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = "https://source.unsplash.com/1600x900/?programming/nature,photography,technology"

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  
  const navigate = useNavigate();
  const {userId} = useParams();
  const clientId = process.env.REACT_APP_GOOGLE_TOKEN;

  useEffect(()=>{
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) =>{
        setUser(data[0]);
        
      })

  }, [userId])

  if (!user){
    return <Spinner message={`Loading Profile...`} />
  }

  const logout = () =>{
    localStorage.clear()
    navigate('/login');
  }

  return (
    <div className="relative pb-2 h-2 justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center">
            <img 
              src={randomImage}
              alt="user-profile"
              className='w-full mt-2 h-370 2xl:h-510 shadow-lg object-cover'
            />
            <img 
              src="https://lh3.googleusercontent.com/a/ALm5wu2rbkWsdWIawdJsa_qGBXbC0_s9a4yUSMcpKRWaNg=s96-c"
              alt="user-profile"
              className='rounded-full w-20 h-2 -mt-h-20 shadow-xl' 
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user?._id && (
                <GoogleLogout
                  clientId = {clientId}
                  render={(renderProps)=>(
                      <button
                          type='button'
                          className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'                         onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          >
                          <AiOutlineLogout color="red" fontSize={21} />
                      </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
              />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile