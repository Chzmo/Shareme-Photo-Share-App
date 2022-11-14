import React,{useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

import { client } from '../client';
import Spinner from './Spinner'
import { categories } from '../utils/data'
import NoWorkResult from 'postcss/lib/no-work-result';

function CreatePin() {
  const [tittle, setTittle] = useState('');
  const [about, setAbout] = useState('');
  const [destinatio, setDestinatio] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)
  
  const navigate = useNavigate();

  const uploadImage = (e) => {
    const {type, name} = e.target.files[0];
    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpg' || type === 'image/gif' || type === 'image/tiff'){
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], {contentType:type, filename:Date.now()})
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) =>{
          console.log('Image upload error', error)
        })
    }else{
      setWrongImageType(true);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all fields.
        </p>
      )}
      <div className="flex flex-col justify-center items-center bg-white p-3 w-full lg:p-5 lg:w-4/5 lg:flex-row">
        <div className="bg-secondaryColor p-3 flex flex-0 7 w-full">
          <div className="flex justify-center flex-col border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner messege=""/>}
            {wrongImageType && <p>Wrong Image Type</p>}
            {!imageAsset ? (
              <label htmlFor="">
                <div className='flex flex-col items-center h-full'>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <AiOutlineCloudUpload />
                  </p>
                  <p className="text-lg">Click to upload</p>
                </div>
                <p className="mt-32 text-gray-400">
                  Use high quality JPG, SVG, GIF or TIFF less than 20 MB
                </p>
                </div>
                <input 
                  type="file" 
                  name='upload-image'
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ):(
              <div className="relative h-full">
                <img 
                  src={imageAsset?.url}
                  alt="uploaded-pic" 
                  className='h-full w-full '
                 />
                 <button
                  type='butoon'
                 >
                  
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin