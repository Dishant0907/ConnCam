import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex size-full text-white flex-col gap-10'>
      <h1 className='text-3xl font-bold '>Recordings</h1>
      <CallList type="recordings"/>
    </section>
    
  )
}

export default Recordings