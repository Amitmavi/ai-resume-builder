import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormSection from '../component/FormSection';
import ResumePreview from '../component/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../service/GlobalApi';

 function EditResume () {
    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState(dummy);

    useEffect(()=>{
        setResumeInfo(dummy);
        GetResumeInfo();

    },[])


    const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeId).then(Response=>{
        console.log(Response.data.data);
        
      })
      
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/*Form Section*/ }
      <FormSection/>

      {/* Preview Setion*/}
      <ResumePreview/>
      
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume;
