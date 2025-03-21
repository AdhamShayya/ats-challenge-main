'use client';
import { useEffect, useState } from 'react';
import JobDescriptionForm from './components/JobDescriptionForm';
import CVUpload from './components/CVUpload';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Home() {
// State to store the job description input by the user
// Initialized as an empty string
const [jobDescription, setJobDescription] = useState<string>('');

// State to store the text extracted from the uploaded CV
// Initialized as an empty string
const [cvText, setCvText] = useState<string>('');

// Hook to access the Next.js router for navigation and route handling
const router = useRouter();

// State to manage the loading state of the application
// Initialized as `false` (not loading by default)
const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCvText('')
    setJobDescription('')
  }, [])

  const handleGenerateQuestions = () => {

    // check both jobDescription and cvText are inserted
    if (!jobDescription || !cvText) {
      toast.error('Please provide both a job description and a CV.');
      return;
    }
    
    setIsLoading(true);
    //navigate to the generate Questions page and passing the job Description and the cvText as Params to recieve them in that page 
    setTimeout(() => {
      router.push(`/generate-questions?jobDescription=${encodeURIComponent(jobDescription)}&cvText=${encodeURIComponent(cvText)}`);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="">
      {/* Container for the content with responsive padding, max-width, and centering */}
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        {/* Motion animation for the heading section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly above
          animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
          transition={{ duration: 0.6 }} // Animation duration: 0.6 seconds
          className="text-center mb-8" // Center-align text and add margin-bottom
        >
          {/* Main heading with responsive font size and indigo color */}
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            ATS Challenge
          </h1>
          {/* Subheading with responsive text size and gray color */}
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Prepare for your interview by simulating real interview questions based on your CV and job description.
          </p>
        </motion.div>
  
        {/* Grid layout for the forms with responsive columns and gap */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Motion animation for the Job Description Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} // Initial state: hidden and slightly to the left
            animate={{ opacity: 1, x: 0 }} // Animate to: fully visible and in place
            transition={{ duration: 0.6, delay: 0.2 }} // Animation duration: 0.6 seconds with a 0.2s delay
          >
            {/* Job Description Form component */}
            <JobDescriptionForm onSubmit={setJobDescription} />
          </motion.div>
  
          {/* Motion animation for the CV Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} // Initial state: hidden and slightly to the right
            animate={{ opacity: 1, x: 0 }} // Animate to: fully visible and in place
            transition={{ duration: 0.6, delay: 0.4 }} // Animation duration: 0.6 seconds with a 0.4s delay
          >
            {/* CV Upload component */}
            <CVUpload onUpload={setCvText} />
          </motion.div>
        </div>
  
        {/* Motion animation for the Generate Questions button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} // Initial state: hidden and slightly below
          animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
          transition={{ duration: 0.6, delay: 0.6 }} // Animation duration: 0.6 seconds with a 0.6s delay
          className=" flex justify-center mt-12" // Center-align the button and add margin-top
        >
          {/* Button to generate interview questions */}
          <button
            onClick={handleGenerateQuestions} // Click handler for generating questions
            disabled={isLoading} // Disable button when loading
            className=" mt-12 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:transform-none disabled:hover:scale-100 flex items-center space-x-2"
          >
            {/* Conditional rendering based on loading state */}
            {isLoading ? (
              // Loading state: Icon (spinner) and "Processing..." text
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Generate Interview Questions</span>
                {/*arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </motion.div>
  
        {/* Motion animation for the footer */}
        <motion.div
          initial={{ opacity: 0 }} // Initial state: hidden
          animate={{ opacity: 1 }} // Animate to: fully visible
          transition={{ duration: 0.6, delay: 0.8 }} // Animation duration: 0.6 seconds with a 0.8s delay
          className="text-center mt-16 text-gray-600 text-sm" // Center-align text, add margin-top, and style
        >
          {/* Footer text */}
          <p>© 2025 ATS Challenge. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}