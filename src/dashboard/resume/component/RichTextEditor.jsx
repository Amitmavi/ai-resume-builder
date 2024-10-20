import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';

const PROMPT = 'Position Title: {PositinTitle}, Based on the job title, give me a summary for my resume within 4-5 lines.';

function RichTextEditor({ onRichTextEditorChange, index, defaultvalue }) {
  const [value, setValue] = useState(defaultvalue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummeryFromAI = async () => {
    // Ensure there's a position title before making the AI request
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }

    // Replace the placeholder with the actual position title
    const prompt = PROMPT.replace('{PositinTitle}', resumeInfo.experience[index].title);

    try {
      // Send the prompt to the AI and await the result
      const result = await AIChatSession.sendMessage(prompt);

      // Await the response text, assuming the response is plain text, not JSON
      const text = await result.response.text();

      // Log the response for debugging
      console.log(text);

      // Update the editor content with the response text
      setValue(text);
      onRichTextEditorChange({ target: { value: text } });
    } catch (error) {
      // Handle any errors during the API call
      console.error('Error generating summary:', error);
      toast('Error generating summary from AI');
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          <Brain className='h-4 w-4' /> Generate From AI
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
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
  );
}

export default RichTextEditor;
