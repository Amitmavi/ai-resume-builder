import { MoreVertical, Notebook } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

 function ResumeCardItem({resume}) {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
      <div className='p-14  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
        style={{borderColor:'#ff6666'}}>

              <div className='flex 
                  items-center justify-center h-[180px] '>
                {/* <Notebook/> */}
                <img src="/cv.png" width={80} height={80} />
              </div>
        {/* <Notebook/> */}

      </div>
      <h2 className='text-center my-1'  style={{
        background:'#ff6666'
      }}>{resume.title}</h2>
      {/* <MoreVertical className='h-4 w-4 cursor-pointer'/ > */}


    </Link>
  )
} 
export default ResumeCardItem;
