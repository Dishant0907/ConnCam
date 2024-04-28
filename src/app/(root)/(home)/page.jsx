"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useState } from 'react'

const Home = () => {
  const now = new Date()
  const [livetime,setLiveTime] = useState()
  
  setInterval(()=>{
    const time = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    setLiveTime(time)
  },1000)
  const date = (new Intl.DateTimeFormat('en-US',{
    dateStyle:'full'
  })).format(now);

  
  return (
    <section className='flex size-full flex-col gap-8 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover '
      style={{ backgroundImage: `url(/images/hero-background.png)` }}>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:py-11'>

          <h2 className='glassmorphism rounded py-1 max-w-[270px] text-center text-base m-3 font-normal'>Upcoming Meeting at: 12:30 PM</h2>

          <div className='flex flex-col gap-2'>

            <h1 className='text-4xl pl-3 font-extrabold lg:text-7xl'>{livetime}</h1>

            <p className='text-lg font-medium pl-3 pb-3 text-sky-600'> {date}</p>

          </div>

        </div>

      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home