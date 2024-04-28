"use client"

import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { tokenProvider } from '../actions/stream.actions';
import Loader from '@/components/Loader';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user = { id: userId };
  
//     
   const StreamVideoProvider = ({children}) => {
    const [videoClient,setVideoCLient] = useState();

    const {user ,isLoaded} = useUser()


    useEffect(()=>{
        if(!isLoaded || !user) return;
        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl
            },
            tokenProvider:tokenProvider
        })

        setVideoCLient(client)

    },[user,isLoaded])

    if(!videoClient) return <Loader/>



    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;