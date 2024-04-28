import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const HomeLayout = ({ children }) => {
    return (
        <main className='relative'>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>

                <section className='flex min-h-screen bg-[#161925] flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8'>
                    <div className='w-full'>

                        {children}
                        
                    </div>
                </section>

            </div>
        </main>
    )
}

export default HomeLayout