import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import React, { useContext, useState } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/skillsPreview';

 function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor:resumeInfo?.themeColor}}>
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
     
      {/* Summary */}
      <SummeryPreview resumeInfo={resumeInfo}/>

      {/* Professional  Exprience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>

      {/* Educational Detail */}
      <EducationalPreview resumeInfo={resumeInfo}/>

      {/* skilss */}
      <SkillsPreview resumeInfo={resumeInfo}/>
    

    </div>
  )
}
export default ResumePreview;
