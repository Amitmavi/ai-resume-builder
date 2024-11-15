import React, { useContext, useState, useEffect } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFA1', '#FF7133', '#71FF33', '#7133FF', '#FF3371',
    '#33FF71', '#3371FF', '#A1FF33', '#33A1FF', '#FF5733',
    '#5733FF', '#33FF5A', '#5A33FF', '#FF335A', '#335AFF',
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || ''); // Initialize with current theme color
  const { resumeId } = useParams(); // Fixed typo

  useEffect(() => {
    if (resumeInfo) {
      setSelectedColor(resumeInfo.themeColor); // Sync with initial themeColor from resumeInfo
    }
  }, [resumeInfo]);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((response) => {
        console.log(response);
        toast.success('Theme Color Updated');
      })
      .catch((error) => {
        console.error('Error updating theme color:', error);
        toast.error('Failed to update theme color');
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border
                ${selectedColor === item ? 'border border-black' : ''}`} // Highlight selected color
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
