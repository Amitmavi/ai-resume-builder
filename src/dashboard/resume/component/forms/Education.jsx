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

    // Populate educationalList with data from resumeInfo if available
    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            setEducationalList(resumeInfo.education);
        }
    }, []);

    const handleChange = (event, index) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: '',
                startDate: '',
                endDate: '',
                degree: '',
                major: '',
                description: '',
            }
        ]);
    };

    const RemoveEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        } else {
            toast('At least one education entry is required.');
        }
    };

    const onSave = async () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest),
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
    }, [educationalList]);

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
                                    value={item?.universityName}  // Use `value` instead of `defaultValue`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input
                                    name="degree"
                                    value={item?.degree}  // Use `value`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Major</label>
                                <Input
                                    name="major"
                                    value={item?.major}  // Use `value`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={item?.startDate}  // Use `value`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div>
                                <label>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={item?.endDate}  // Use `value`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>

                            <div className="col-span-2">
                                <label>Description</label>
                                <Textarea
                                    name="description"
                                    value={item?.description}  // Use `value`
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={AddNewEducation} className="text-primary">
                            + Add More Education
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={RemoveEducation} 
                            className="text-primary" 
                            disabled={educationalList.length === 1} // Disable remove when only one entry exists
                        >
                            - Remove
                        </Button>
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
