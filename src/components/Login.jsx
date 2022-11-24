
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

function Login() {
    const navigate = useNavigate();

    const responseGoogle = (response)=>{    
        const decode = jwtDecode(response.credential);
        localStorage.setItem('user', JSON.stringify(decode));
        const {name, sub, picture} = decode; 
       
        const doc = {
            _id: sub,
            _type: 'user',
            userName:name,
            image: picture,
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
                            onSuccess={(response) => responseGoogle(response)}
                            onFailure={(response) => console.log(response)}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login