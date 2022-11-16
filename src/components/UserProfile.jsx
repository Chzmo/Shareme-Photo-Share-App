import React from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useNavigate, useParams} from 'react-router-dom'
import {GooglrLogout} from 'react-google-login'

import{userCreatedPinsQuery, userQuery, userSavedPinsQuery} from './../utils/data'
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState(created);
  
  const navigate = useNavigate();
  const {userId} = useParams();

  if (!user){
    return <Spinner message={`Loading Profile...`} />
  }
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile