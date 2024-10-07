import { Notebook } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

 function ResumeCardItem({resume}) {
  return (
    <Link to={'/dashboard/resume/'+resume}>
      <div className='p-14 items-center flex bg-secondary justify-center h-[280px] border border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook/>

      </div>
      <h2 className='text-center my-1'>{resume.title}</h2>
    </Link>
  )
}
export default ResumeCardItem;
