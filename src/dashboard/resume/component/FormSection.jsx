import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(2);
  const [enableNext,setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>
      <div  className='flex gap-2 justify-between item-center'>
        <div className='flex gap-2'>
          <Link to={"/dashboard"}>
        <Button><Home/></Button>
        </Link>
        <ThemeColor/>
        
        </div>

      <div className='flex gap-2 gap-2" size="sm"'>
        {activeFormIndex>1&&<Button size="sm"  
        onClick={()=>setActiveFormIndex(activeFormIndex-1)}
        > <ArrowLeft/></Button>}
          <Button 
          disabled={!enableNext}
          className="flex gap-2"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next <ArrowRight/></Button>
        </div>
      </div>


      {/* {Personal Detail} */}
     {activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>
     :activeFormIndex==2?
       <Summery  enabledNext={(v)=>setEnableNext(v)}/>
       :activeFormIndex==3?
       <Experience />
       :activeFormIndex==4?
       <Education/>
       :activeFormIndex==5?
       <Skills/>
       :activeFormIndex==6?
      <Navigate to={'/my-resume/'+resumeId+"/view"}/>
       :null
    }
      {/* [Summary] */}

      {/* {Experience} */}

      {/* {Education} */}

      {/* {Skills} */}
    </div>
  )
}

export default FormSection
