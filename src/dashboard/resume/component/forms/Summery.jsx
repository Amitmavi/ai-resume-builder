import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import React, { useContext, useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
// import { AIChatSession } from  './../../../../../service/AIModal';


const prompt="Job Title : Full Stack React Developer, Depends on job title give me summery for my resume with in 4-5 lines."

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery
      });
    }
  }, [summery, resumeInfo, setResumeInfo]);

  const GenerateSummeryFromAI=async()=>{
    setLoading(true)
    const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result=await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text())) 
   
    setAiGenerateSummeryList(JSON.parse(result.response.text()))
    setLoading(false);
} 

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summery: summery
      }
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((response) => {
        console.log(response);
        enabledNext(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add a summary for your job title</p>

        <Form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summery</label>
            <Button variant='outline'onClick={()=>GenerateSummeryFromAI}  type="button" size='sm' className='border-primary text-primary flex gap-2'>
              <Brain className='h-4 w-4'/> Generate From AI</Button>
          </div>
          <Textarea
            className='mt-5'
            required
            value={summery || ''} // Ensuring controlled component
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className='mt-3 flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </Form>
      </div>
      <div></div>
    </div>
  );
}

export default Summery;
