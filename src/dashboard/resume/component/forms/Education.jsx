import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';


function Education() {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            startDate: '',
            endDate: '',
            degree: '',
            major: '',
            description: '',
        }
    ]);

    const handleChange = (event, index) => {
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            startDate: '',
            endDate: '',
            degree: '',
            major: '',
            description: '',
        }]);
    };

    const RemoveEducation = () => {
            setEducationalList(educationalList.slice(0, -1));
            toast('At least one education entry is required.');
        }
  

    const onSave = async () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList,
            },
        };

        try {
            const response = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            console.log(response);
            toast('Details Updated!');
        } catch (error) {
            console.error(error);
            toast('Server Error, Please try again');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        });
    }, [educationalList])

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Education</h2>
                <p>Add Your Educational Details</p>
                <div>
                    {educationalList.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                            <div className="col-span-2">
                                <label>University Name</label>
                                <Input
                                    name="universityName"
                                    value={item.universityName}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input
                                    name="degree"
                                    value={item.degree}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Major</label>
                                <Input
                                    name="major"
                                    value={item.major}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={item.startDate}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div className="col-span-2">
                                <label>Description</label>
                                <Textarea
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={AddNewEducation} className="text-primary">+ Add More Education </Button>
                        <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove </Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Education;
