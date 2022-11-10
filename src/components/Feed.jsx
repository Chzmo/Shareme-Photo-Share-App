import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'


function Feed() {
  const [loading, setLoading] = useState(false);

  if (!loading) return <Spinner message="We are adding new ideas"/>
  return (
    <div>Feed</div>
  )
}

export default Feed