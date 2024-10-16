
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList,  BtnItalic,  BtnNumberedList, BtnRedo, BtnStrikeThrough,  BtnUnderline, BtnUndo, Editor, EditorProvider,  Separator, Toolbar } from 'react-simple-wysiwyg'
// import { AIChatSession } from  './../../../../service/AIModal';

const PROMPT='Position Title : {PositinTitle}, Depends on job title give me summery for my resume with in 4-5 lines.'

function RichTextEditor({onRichTextEditorChange,index,defaultvalue}) {
    const [value,setValue]=useState(defaultvalue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const GenerateSummeryFromAI=async()=>{
      if(!resumeInfo?.Experience[index]?.title){
        toast('Please Add Position Title');
        return ;
      }
      const prompt=PROMPT.replace('{PositinTitle}',resumeInfo.experience[index].title);
      const result=await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    }
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        className="flex gap-2 b  border-primary text-primary"><Brain className='h-4w-4'/> Generate From AI</Button>
      </div>
      <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
        <Toolbar>
         <BtnUndo />
          <BtnRedo />
          <Separator/>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
         
          
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
