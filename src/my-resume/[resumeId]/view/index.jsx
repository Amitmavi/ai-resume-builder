import Header from '@/components/custom/Header'; // Assuming default export
import { Button } from '@/components/ui/button'; // Named export
import { ResumeInfoContext } from '@/context/ResumeInfoConext'; // Named export
import ResumePreview from '@/dashboard/resume/component/ResumePreview'; // Assuming default export
import React, { useEffect, useState } from 'react'; // React default import
import { useParams } from 'react-router-dom'; // Named export from react-router-dom
import GlobalApi from './../../../../service/GlobalApi'; // Assuming default export
import { RWebShare } from 'react-web-share'; // Named export
import { Import } from 'lucide-react'; // Named export

function ResumePage() {
  const [resumeInfo, setResumeInfo] = useState(null); // Initialize with `null`
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]); // Dependency array includes `resumeId`

  const GetResumeInfo = async () => {
    try {
      const response = await GlobalApi.GetResumeById(resumeId);
      console.log(response);
      setResumeInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching resume info:', error);
    }
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header /> {/* Ensure Header is correctly imported */}
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI Generated Resume is Ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume, and you can share your unique resume URL with friends and family.
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            {/* Web share button */}
            <RWebShare
              data={{
                text: "Hello Everyone, this is my resume. Please open the URL to see it.",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        {/* Only show ResumePreview if resumeInfo is available */}
        {resumeInfo ? <ResumePreview /> : <p>Loading resume preview...</p>}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ResumePage;
