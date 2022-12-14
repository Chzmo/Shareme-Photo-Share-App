import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {client} from '../client';
import {feedQuery, searchQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data)=> {
          setPins(data)
          setLoading(false)
        }) 
    }else{
      client.fetch(feedQuery)
      .then((data)=> {
        setPins(data)
        setLoading(false)
      }) 
    }
  }, [categoryId])
  

  if (loading) return <Spinner message="We are adding new ideas"/>;
  if (!pins?.length) return <div className='flex font-bold justify-center items-center text-xl w-full mt-8'>No pins found</div>;
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed