import React, { useEffect, useState } from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useNavigate, useParams} from 'react-router-dom'
import {GooglrLogout} from 'react-google-login'

import{userCreatedPinsQuery, userQuery, userSavedPinsQuery} from './../utils/data'
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology/programming"

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [text, setText] = useState('Created');
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

  if (!user){
    return <Spinner message={`Loading Profile...`} />
  }
  return (
    <div className="relative pb-2 h-2 justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center">
            <img 
              src={randomImage}
              alt="user-profile"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile