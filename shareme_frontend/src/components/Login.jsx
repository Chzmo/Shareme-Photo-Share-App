import React from 'react';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';
import {useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { useEffect } from 'react';
import { client } from '../client';

function Login() {
    const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
    const navigate = useNavigate();
    useEffect(()=>{
        gapi.load('client:auth2', ()=>{
            gapi.auth2.init({clientId:clientId});
        })
    })
    
    const responseGoogle =(response)=>{       
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const {name, googleId, imageUrl} = response.profileObj; 
        console.log(googleId, name, imageUrl);
        const doc = {
            _id: googleId,
            _type: 'user',
            userName:name,
            image: imageUrl,
        }

        client.createOrReplace(doc).then(() => {
                client.fetch(
                    `*[_type == "user"]`
                )
                .then((data) => console.log(data))
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
                            clientId = {clientId}
                            render={(renderProps)=>(
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center p-3 rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    >
                                    <FcGoogle className='mr-4' /> Sign in with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login