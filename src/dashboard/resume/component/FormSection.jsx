import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(2);
  const [enableNext,setEnableNext]=useState(false)
  return (
    <div>
      <div  className='flex gap-2 justify-between item-center'>
        <Button variant="outline" size="sm" > <LayoutGrid/>Theme</Button>

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
       <Summery  enabledNext={(v)=>setEnableNext(v)}/>:null
    }
      {/* [Summary] */}

      {/* {Experience} */}

      {/* {Education} */}

      {/* {Skills} */}
    </div>
  )
}

export default FormSection