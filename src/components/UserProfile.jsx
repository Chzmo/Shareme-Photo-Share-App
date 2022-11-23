import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {googleLogout } from '@react-oauth/google'

import{userCreatedPinsQuery, userQuery, userSavedPinsQuery} from './../utils/data'
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { AiOutlineLogout } from 'react-icons/ai'

const randomImage = "https://source.unsplash.com/1600x900/?programming/nature,photography,technology"
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');
  
  const navigate = useNavigate();
  const {userId} = useParams();

  useEffect(()=>{
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) =>{
        setUser(data[0]); 
      })

  }, [userId])

  useEffect(()=>{
    if(text === "created"){
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }else{
      const saveddPinsQuery = userSavedPinsQuery(userId);

      client.fetch(saveddPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }

  }, [text, userId])

  
  if (!user){
    return <Spinner message={`Loading Profile...`} />
  }

  const logout = () =>{
    googleLogout()
    localStorage.clear()
    navigate('/login');
  }

  console.log(userId, user._id)
  return (
    <div className="relative pb-2 h-2 justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center">
            <img 
              src={randomImage}
              alt="user-profile"
              className='w-full mt-2 h-370 2xl:h-510 shadow-lg object-cover '
            />
            <img 
            src={user.image}
              alt="user-profile"
              className='rounded-full w-20 h-20 -mt-10 shadow-xl' 
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {(userId === user?._id && userId !== null) && (
                
                <button
                    type='button'
                    className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                    onClick={logout}
                    >
                    <AiOutlineLogout color="red" fontSize={21} />
                </button>
                  
              )}
            </div>
          </div>
          <div className="text-center mg-7">
            <button
              type='button'
              onClick={(e)=>{
                setText(e.target.textContent.toLowerCase())
                setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles }`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e)=>{
                setText(e.target.textContent.toLowerCase())
                setActiveBtn('saved')
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles }`}
            >
              Saved
            </button>
          </div>
          <div className="px-2">
            {pins?.length ? (
              <MasonryLayout pins={pins} />
            ):(
              <div className='flex font-bold justify-center items-center text-xl w-full mt-8'>No pins found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile