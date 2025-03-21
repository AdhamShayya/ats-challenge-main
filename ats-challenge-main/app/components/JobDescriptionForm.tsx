// Mark this component as a Client Component for Next.js
'use client';

import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Define the interface for the component's props
interface JobDescriptionFormProps {
  onSubmit: (jobDescription: string) => void; // Callback function to handle job description submission
}
export interface IJobDescription extends Document {
  title: string;
  description: string;
  requirements: string;
  company?: string;
  createdAt: Date;
}

export default function JobDescriptionForm({ onSubmit }: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState<string>('');

  // State to store any validation or API errors
  const [error, setError] = useState<string>('');

  // State to store fetched job descriptions from the database
  const [jobDescriptions, setJobDescriptions] = useState<IJobDescription[]>([]);

  // State to track the currently selected job description
  const [selectedJobDescription, setSelectedJobDescription] = useState<string>('');

  // State to control the visibility of the job descriptions modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate that the job description is at least 100 characters long
    if (jobDescription.length < 100) {
      setError('Job description must be at least 100 characters.');
      return;
    }

    try {
      // Save the job description to the database via API
      const response = await fetch('http://localhost:5000/api/jobDescription/job-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Sample Title', // Placeholder title
          description: jobDescription, // User-provided job description
          requirements: 'Sample Requirements', // Placeholder requirements
        }),
      });

      // Handle API errors
      if (!response.ok) {
        throw new Error('Failed to save job description');
      }

      // Clear errors and update the selected job description
      await response.json();
      setError('');
      setSelectedJobDescription(jobDescription);
      onSubmit(jobDescription); // Trigger the onSubmit callback
      toast.success('Job description saved successfully!'); // Show success toast
    } catch (error) {
      console.error('Error saving job description:', error);
      setError('Failed to save job description.'); // Set error message
      toast.error('Failed to save job description.'); // Show error toast
    }
  };

  // Function to load sample job descriptions from the database
  const loadSampleJobDescriptions = async () => {
    try {
      // Fetch all job descriptions from the database via API
      const response: Response = await fetch('http://localhost:5000/api/jobDescription/job-descriptions', {
        method: 'GET',
      });

      // Handle API errors
      if (!response.ok) {
        throw new Error('Failed to fetch job descriptions');
      }

      // Update the list of job descriptions and open the modal
      const data = await response.json();
      setJobDescriptions(data);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error('Error fetching job descriptions:', error);
      setError('Failed to fetch job descriptions.'); // Set error message
      toast.error('Failed to fetch job descriptions.'); // Show error toast
    }
  };

  // Function to handle selection of a job description from the modal
  const handleSelectJobDescription = (description: string) => {
    setSelectedJobDescription(description); // Update the selected job description
    setJobDescription(description); // Set the job description in the textarea
    setError(''); // Clear any errors
    onSubmit(description); // Trigger the onSubmit callback
    toast.success('Job description selected!'); // Show success toast
    setIsModalOpen(false); // Close the modal
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      
      {/* Job Description Input */}
      <div className="space-y-0">
        <label className="block text-lg font-medium text-dark-gray">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)} // Update the job description state
          placeholder="Enter job description..."
          className="w-full text-dark-gray p-4 border border-medium-gray rounded-lg focus:border-primary focus:outline-none"
          rows={8}
          required
          disabled={!!selectedJobDescription} // Disable textarea if a job description is selected
        />
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Buttons for submitting and loading job descriptions */}
      <div className="flex space-x-4">
        {/* Submit Button */}
        <button
          type="submit"
          className={`
            px-6 py-3 rounded-lg flex items-center justify-center transition-all
            ${selectedJobDescription
              ? "bg-gray-400 cursor-not-allowed hover:bg-red-500" // Disabled state styling
              : "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2" // Enabled state styling
            }
          `}
          disabled={!!selectedJobDescription} // Disable button if a job description is selected
        >
          Submit
        </button>

        {/* Load Job Descriptions Button */}
        <button
          type="button"
          onClick={loadSampleJobDescriptions} // Trigger the function to load job descriptions
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          Load Job Descriptions
        </button>
      </div>

      {/* Modal for displaying saved job descriptions */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6"
            initial={{ opacity: 0, y: -20 }} // Initial animation state: hidden and slightly above
            animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
            transition={{ duration: 0.3 }} // Animation duration: 0.3 seconds
          >
            {/* Modal Header */}
            <h3 className="text-lg font-semibold text-dark-gray mb-4">Saved Job Descriptions</h3>

            {/* List of Job Descriptions */}
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {jobDescriptions.map((jd, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectJobDescription(jd.description)} // Handle selection of a job description
                  className={`p-4 border ${
                    selectedJobDescription === jd.description
                      ? 'border-primary bg-light-gray' // Selected state styling
                      : 'border-medium-gray' // Default state styling
                  } rounded-lg cursor-pointer hover:bg-light-gray transition-colors`}
                >
                  {/* Job Title */}
                  <strong className="text-dark-gray">{jd.title}</strong>

                  {/* Job Description Preview */}
                  <p className="text-dark-gray mt-2">{jd.description.substring(0, 100)}...</p>
                </li>
              ))}
            </ul>

            {/* Close Modal Button */}
            <button
              onClick={() => setIsModalOpen(false)} // Close the modal
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2 mt-4"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </form>
  );
}