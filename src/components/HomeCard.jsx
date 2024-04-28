"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const HomeCard = ({img,title,description,handleClick,className}) => {
  return (
    <div className={cn('bg-orange-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer',className)} onClick={handleClick}> 
    <div className='flex-center p-3 glassmorphism size-12 rounded-lg'>
        <Image src={img}
        alt='add-meeting'
        height={27}
        width={27}
        
        />
    </div>
    <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-lg font-normal'>{description}</p>
    </div>
    
    </div>
  )
}

export default HomeCard