import React from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

function Login() {
    const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
    const navigate = useNavigate();
    useEffect(()=>{
        
    })

    const responseGoogle = (response)=>{       
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const {name, googleId, imageUrl} = response.profileObj; 
       
        const doc = {
            _id: googleId,
            _type: 'user',
            userName:name,
            image: imageUrl,
        }
        client.createIfNotExists(doc)
        .then(() => {
                client.fetch(
                    `*[_type == "user"]`
                )
                navigate('/', {replace:true})
            })
        .catch(console.error);

    }
    return (
        <GoogleOAuthProvider clientId={`${clientId}`}>
            <div className='flex justify-start items-center flex-col h-screen'>
                <div className="relative w-full h-full">
                    <video 
                        src={shareVideo}
                        type="video/mp4"
                        loop
                        controls = {false}
                        muted
                        autoPlay
                        className='w-full h-full object-cover'
                    />
                    <div className="absolute flex flex-col justify-center items-center left-0 right-0 top-0 bottom-0  bg-blackOverlay">
                        <div className="p-5">
                            <img src={logo} alt="logo" width="130px"/>
                        </div>
                        <div className="shadow-2xl">
                            <GoogleLogin
                                onSuccess={(responce) => console.log(responce)}
                                onFailure={responseGoogle}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login