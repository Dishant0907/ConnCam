"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"




import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import ReactDatePicker from 'react-datepicker'

const MeetingTypeList = () => {
    const [meetingState,setMeetingState] = useState('');
    const router = useRouter()
    const { toast } = useToast()
    const [values,setValues] = useState({
        dateTime:new Date(),
        description:'',
        link:''
    })

    const [callDetails,setCallDetails] = useState()
    
    const {user} = useUser()
    const client = useStreamVideoClient()

    

    const createMeeting = async () => {
        if(!user || !client) return  ;

        try {
            // alert("meow")
            if(!values.dateTime){
                toast({
                    title: "Plese select date and time",
                  })
                  return;
            }
            const id = crypto.randomUUID()
            const call = client.call('default',id)

            if(!call) throw new Error("Failed to create call")

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()

            const description = values.description || 'Quick Meeting'
            
            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call)
            
            if(!values.description){
                router.push(`meeting/${call.id}`)
                
            }
            toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })

            
        } catch (error) {
            console.log("error",error)
            toast({
                title: "Something went wrong",
              })
            
        }

        

    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       <HomeCard
       img="/icons/add-meeting.svg"
       title ="New Meeting"
       description ="Start a quick meeting"
       handleClick = {() => setMeetingState('isQuickMeeting')}
       className="bg-orange-600"
       />

<HomeCard
       img="/icons/schedule.svg"
       title ="Schedule Meeting"
       description ="Plan quick meeting"
       handleClick = {() => setMeetingState('isScheduleMeeting')}
       className="bg-blue-600"
       />
       <HomeCard
       img="/icons/recordings.svg"
       title ="View Recordings"
       description ="Check your recordings"
       handleClick = {() => router.push('/recordings')}
       className="bg-green-600"
       />
       <HomeCard
       img="/icons/join-meeting.svg"
       title ="Join Meeting"
       description ="Join a  meeting"
       handleClick = {() => setMeetingState('isJoiningMeeting')}
       className="bg-purple-700"
       />
       {!callDetails ? (
         <MeetingModal
         isOpen={meetingState ==='isScheduleMeeting'}
         onClose = {() => setMeetingState(undefined)}
         title="Create Meeting"
         className="text-center"
         
         handleClick={createMeeting}
         >
            <div className='flex flex-col gap-2.5'>
                <label className='text-base text-normal leading-[22px] text-blue-200'>
                    Add a description
                </label>
                <Textarea className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e)=>{setValues({...values,description:e.target.value})}}
                />

            </div>

            <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-blue-200'>
                    Select Date and Time
                </label>
                <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({...values,dateTime:date})}
                showTimeSelect
                timeFormat='HH:mm'
                timeCaption='time'
                dateFormat="MMMM d,yyyy h:mm aa"
                className='w-full rounded-lg p-2 focus:outline-none bg-[#252A41]'
                />

            </div>
         </MeetingModal>

       ):(
        <MeetingModal
        isOpen={meetingState ==='isScheduleMeeting'}
        onClose = {() => setMeetingState()}
        title=" Meeting Created"
        className="text-center"
        buttonText ="Copy Meetig Link"
        handleClick={
           () => {
            navigator.clipboard.writeText(meetingLink);
            toast({title:'Link Copied'})
           }
        }
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
        
        />
       )}

    <MeetingModal
    isOpen={meetingState ==='isQuickMeeting'}
    onClose = {() => setMeetingState()}
    title="Start an Instant Meeting"
    className="text-center"
    buttonText ="Start Meeting"
    handleClick={createMeeting}
    />
    <MeetingModal
    isOpen={meetingState ==='isJoiningMeeting'}
    onClose = {() => setMeetingState(undefined)}
    title="Type the Link here"
    className="text-center"
    buttonText ="Join Meeting"
    handleClick={() => router.push(values.link)}
    >
        <Input className="text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#252A41]" onChange={(e)=>{setValues({...values,link:e.target.value})}} placeholder="Meeting Link"/>
        
    
    </MeetingModal>


    </section>
  )
}

export default MeetingTypeList