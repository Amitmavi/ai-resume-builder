import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Experience() {
    // Initialize with one empty object to make sure form is displayed
    const [experienceList, setExperienceList] = useState([
        {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '',
        },
    ]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummery: '',
            },
        ]);
    };

    const RemoveExperience = () => {
        setExperienceList((experienceList) => experienceList.slice(0, -1));
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => rest),
            },
        };
        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
            (Response) => {
                console.log(Response);
                setLoading(false);
                toast('Details updated!');
            },
            (error) => {
                setLoading(false);
                toast('Server Error!');
            }
        );
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList,
        });
    }, [experienceList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input
                                        name='title'
                                        onChange={(event) => handleChange(index, event)}
                                        defaultvalue={item?.title}
                                        
                                    />
                                </div>

                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input
                                        name='companyName'
                                        onChange={(event) => handleChange(index, event)}
                                        defaultvalue={item?.companyName} 
                                        
                                    />
                                </div>

                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input
                                        name='city'
                                        onChange={(event) => handleChange(index, event)}
                                        defaultvalue={item?.city} // Use `value`
                                    />
                                </div>

                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input
                                        name='state'
                                        onChange={(event) => handleChange(index, event)}
                                        defaultvalue={item?.state} // Use `value`
                                    />
                                </div>

                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        onChange={(event) => handleChange(index, event)}
                                        vadefaultvalueue={item?.startDate} // Use `value`
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type='date'
                                        name='endDate'
                                        onChange={(event) => handleChange(index, event)}
                                        defaultvalue={item?.endDate} // Use `value`
                                    />
                                </div>

                                <div className='col-span-2'>
                                    {/* Work summery */}
                                    <RichTextEditor
                                        index={index}
                                        onRichTextEditorChange={(event) =>
                                            handleRichTextEditor(event, 'workSummery', index)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <Button
                                variant='outline'
                                onClick={AddNewExperience}
                                className='text-primary'>
                                + Add More Experience
                            </Button>
                            <Button
                                variant='outline'
                                onClick={RemoveExperience}
                                className='text-primary'>
                                - Remove
                            </Button>
                        </div>
                        <Button disabled={loading} onClick={onSave}>
                            {loading ? (
                                <LoaderCircle className='animate-spin' />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;
