"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import MeetngSetup from '@/components/MeetngSetup'
import MeetingRoom from '@/components/MeetingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import Loader from '@/components/Loader'



const Meeting = () => {
 const {id} = useParams()
  const {user,isLoaded} = useUser();
  const [isSetupComplete,setIsSetupComplete] = useState(false)
  const {call,isCallLoading} = useGetCallById(id)

  if(!isLoaded || isCallLoading) return <Loader/>

  if(!call){ 
     throw new Error("call empthy")}

   
    
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete ? (
              <MeetngSetup setIsSetupComplete={setIsSetupComplete}/>
            ): (
              <MeetingRoom/>
            )
          }

        </StreamTheme>

      </StreamCall>

    </main>
  )
}

export default Meeting