import React, { useState }from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'react-router-dom'
import {MdDownloadForOfline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

import { urlFor } from '../client'

function Pin({pin:{postedBy, image, _id, destination}}) {
const [postHoverd, setPostHoverd] = useState(false);
const [savingPost, setSavingPost] = useState(false);
const navigate = useNavigate();
  return (
    <div className='m-2'>
        <div
            onMouseEnter={() => setPostHoverd(true)}
            onMouseLeave={() => setPostHoverd(false)}
            onClick={()=> navigate(`/pin-detail/${_id}`)}
            className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
            <img src={urlFor(image).width(250).url()} alt="user-post" className='rounded-lg w-full'/>
            {postHoverd && (
                <div 
                    className="absolute top-0 w-full flex flex-col justify-between p-1 pr-2 pt-2 z-50"
                    style={{ height:'100%' }}
                >
                    <div className="flex items-center justify-between">
                    
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Pin