import React, {useState, useEffect} from 'react'
import {MdDownloadOffline} from 'react-icons/md'
import {Link, useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import {client, urlFor} from '../client'
import MansonryLayout from './MasonryLayout'
import {pinDetailMorePinQuery,  pinDetailQuery} from '../utils/data'
import Spinner from './Spinner'
import { data } from 'autoprefixer'

function PinDetail() {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const {pinId} = useParams();
  
  const fetchPinDetails = () =>{
    let query = pinDetailQuery(pinId);

    if (query){
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0])

          if(data[0]){
            query = pinDetailMorePinQuery(data[0]);
            client.fetch(query)
              .then((res)=> setPins(res));
          }
        })
    }
  }

  useEffect(()=>{
    fetchPinDetails();
  },[pinId])

  if(!pinDetail) return <Spinner message="Loading pins"/>

  return (
    <div className="flex xl:flex-row flex-col m-auto bg-white" style={{maxWidth:'1500px', borderRadius:'32px'}}>
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          className="rounded-t-3xl rounded-b-lg"
          alt='user-post'
        />
      </div>
    </div>
  )
}

export default PinDetail