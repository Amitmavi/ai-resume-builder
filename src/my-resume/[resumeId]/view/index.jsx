import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

function index() {
  return (
    <div>
     <Header/>
     <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
             <h2 className='text-center text-2xl font-medium'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
     </div>
     <div className='flex justify-between px-44 my-10'>
     <Button>Download</Button>
     <Button>Share</Button>
     </div>
     
    </div>
  )
}

export default index
