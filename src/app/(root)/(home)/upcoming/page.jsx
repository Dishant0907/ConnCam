"use client"
import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='bg-[#161925]'>
      <h1 className='flex size-full font-extrabold flex-col gap-10 text-white'>
        Upcoming
      </h1>
      <CallList type="upcoming"/>
    </section>
  )
}

export default Upcoming