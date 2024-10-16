import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoConext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills() {  // Rename component to uppercase

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }]);

    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // Populate skillsList from resumeInfo if available
    useEffect(() => {
        if (resumeInfo?.skills?.length > 0) {
            setSkillsList(resumeInfo.skills);
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0,
        }]);
    };

    const RemoveSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(skillsList.slice(0, -1));
        } else {
            toast('At least one skill entry is required.');
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest),
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId, data).then(
            (Response) => {
                console.log(Response);
                setLoading(false);
                toast('Details updated!');
            },
            (error) => {
                setLoading(false);
                toast('Server Error, try again');
            }
        );
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        });
    }, [skillsList]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Skills</h2> {/* Corrected spelling */}
                <p>Add Your top professional key skills</p>

                <div>
                    {skillsList.map((item, index) => (
                        <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                            <div>
                                <label className='text-xs'>Name</label>
                                <Input
                                    className="w-full"
                                    value={item.name}  // Use value to control the input
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}  // Use value to control the rating
                                onChange={(v) => handleChange(index, 'rating', v)}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={AddNewSkills} className="text-primary">+ Add More Skills </Button>
                        <Button 
                            variant="outline" 
                            onClick={RemoveSkills} 
                            className="text-primary" 
                            disabled={skillsList.length === 1}  // Disable remove button if only one skill form is left
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

export default Skills;
