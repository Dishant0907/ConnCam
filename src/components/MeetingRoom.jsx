"use client"
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



import { LayoutList, User, Users } from 'lucide-react';
import EndCallButton from './EndCallButton';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from './Loader';


const MeetingRoom = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false)
    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState()

    if(callingState !== CallingState.JOINED){
        <Loader/>
    }
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />


        }
    }
    console.log(showParticipants)


    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />


                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden  ml-2', {
                    'block': showParticipants
                })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />

                </div>
            </div>

            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap '>
                <CallControls onLeave={() => router.push('/') } />

                <DropdownMenu>
                    <div className='flex items-center '>
                        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'><LayoutList size={20} className='text-white' /></DropdownMenuTrigger>
                        <DropdownMenuContent className="border-[#1C1F2E] bg-[#1C1F2E] text-white ">
                            {['Grid','Speaker-Left','Speaker-Right'].
                            map((item,index)=>(
                                <div key={index}>
                                    <DropdownMenuItem onClick={()=> {
                                        setLayout(item.toLowerCase())
                                    }} className="cursor-pointer">
                                        {item}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-[#1C1F2E]" />

                                </div>
                            ))}
                            
                        </DropdownMenuContent>


                    </div>
                </DropdownMenu>
                <CallStatsButton/>
                <button onClick={() =>setShowParticipants((prev) => !prev) }>
                    <div className='cursor-pointer rounded-xl hover:bg-[#4c535b] '>
                        <Users size={20} className='text-white'/>
                        {/* <CallParticipantsList/> */}

                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton/>}



            </div>

        </section>
    )
}

export default MeetingRoom