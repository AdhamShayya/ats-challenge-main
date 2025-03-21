// Mark this component as a Client Component for Next.js
'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSheetPlastic, faUpload, faX } from '@fortawesome/free-solid-svg-icons';

interface CVUploadProps {
  onUpload: (text: string) => void;
}

export default function CVUpload({ onUpload }: CVUploadProps) {
  // State to store the uploaded file
  const [file, setFile] = useState<File | null>(null);

  // State to track loading state during file upload and parsing
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to store the parsed text from the CV
  const [parsedText, setParsedText] = useState<string>('');

  // State to track drag-and-drop activity, if the user dragged a folder then the background of the cv upload will be light blue 
  const [dragActive, setDragActive] = useState<boolean>(false);

  // to view the cv 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  // Function to handle file selection via input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]; // Get the first file from the input
    if (uploadedFile) {
      setFile(uploadedFile); // Update the file state
    }
  };

  // Function to handle drag events (enter, leave, over)
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true); // Activate drag state
    } else if (e.type === 'dragleave') {
      setDragActive(false); // Deactivate drag state
    }
  };

  // Function to handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false); // Deactivate drag state

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]); // Set the dropped file
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate if a file is uploaded
    if (!file) {
      toast.error('Please upload a file.');
      return;
    }

    setIsLoading(true); // Set loading state to true
    const formData = new FormData(); // Create FormData object
    formData.append('file', file); // Append the file to FormData

    try {
      // Send the file to the server for parsing
      const response: Response = await fetch('http://localhost:5000/api/cv/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle API errors
      if (!response.ok) {
        throw new Error('Failed to parse file');
      }

      // Parse the response and update the parsed text state
      const data = await response.json();
      setParsedText(data.text);
      onUpload(data.text); // Trigger the onUpload callback
      toast.success('CV uploaded and parsed successfully!'); // Show success toast
      setIsUploaded(true)
    } catch (error) {
      console.error('Error parsing file:', error);
      toast.error('Failed to parse file.'); // Show error toast
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };


  const CVModal = ({ isOpen, onClose, cvContent }: { isOpen: boolean, onClose: () => void, cvContent: string }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-dark-gray text-xl font-semibold">CV Content</h2>
            <button onClick={onClose} className=" px-9 py-3 rounded-lg flex items-center justify-center transition-all ml-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2">
              <FontAwesomeIcon icon={faX} className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 border border-medium-gray bg-light-gray rounded-lg">
            <pre className="whitespace-pre-wrap text-dark-gray text-sm overflow-auto max-h-96">
              {cvContent}
            </pre>
          </div>
        </div>
      </div>
    );
  };
  const clearFile = () => {
    setFile(null);
    setParsedText('');
    onUpload('');
  };
  // Render the form
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-7 p-6 bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }} // Initial animation state: hidden and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
      transition={{ duration: 0.5 }} // Animation duration: 0.5 seconds
    >
      {/* File Upload Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-dark-gray">Upload CV</label>
        <div          // 2px  dashed border   8px padding    centering text
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${dragActive ? 'border-primary bg-blue-50' : 'border-medium-gray' // Apply styles based on drag state
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop} // Handle file drop
        >
          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf,.docx,.txt" // Accept only PDF, DOCX, and TXT files
            onChange={handleFileChange} // Handle file selection
            className="hidden"
            id="file-upload"
          />
          {/* Label for file input */}
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              {/* Upload Icon with Gradient */}
              <FontAwesomeIcon
                icon={faUpload} // Use the FontAwesome upload icon
                className="h-12 w-12 mb-4 text-blue" // Apply styles
              />
              {/* Upload Instructions */}
              <p className="text-dark-gray font-medium">Drag and drop your CV here or</p>
              <p className="text-dark-gray font-medium mt-2">Browse files</p>
              <p className="text-medium-gray text-sm mt-2">Supported formats: PDF, DOCX, TXT</p>
            </div>
          </label>

          {/* Display uploaded file */}
          {file && (
            <div className="mt-4 p-3 bg-light-gray rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                {/* File Icon */}
                <FontAwesomeIcon
                  icon={faSheetPlastic} // Use the FontAwesome upload icon
                  className="h-9 w-9 p-1 text-blue" // Apply styles
                />
                {/* File Name */}
                <span className="text-dark-gray font-medium">{file.name}</span>
              </div>
              {/* Remove File Button */}
              <button
                type="button"
                onClick={clearFile} // Clear the file
                className={`
                  px-9 py-3 rounded-lg flex items-center justify-center transition-all ml-3
                  ${isLoading || !file
                    ? 'bg-gray-400 cursor-not-allowed' // Disabled state
                    : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2' // Enabled state
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={faX} // Use the FontAwesome upload icon
                  className="h-5 w-5 p-0 text-white" // Apply styles
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Button     space between the buttons*/}   
      <div className="flex h-13 space-x-4">
      {parsedText && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className=" w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            View CV
          </button>
      )}
        <motion.button
          type="submit"
          disabled={isLoading || !file || isUploaded} // Disable button if loading or no file is selected
          // if there is no selected file the button will be gray with full width - when there is a file the color will change and when it is uploaded the size will change to fit the other button 
          className={`
           px-6 py-3 rounded-lg flex items-center justify-center transition-all
            ${isLoading || !file || isUploaded
              ? 'bg-gray-400 cursor-not-allowed hover:bg-red-500' // Disabled state
              : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2' // Enabled state
            }
            ${isUploaded ? 'w-44' : 'w-full'} 
          `}              
          whileHover={!(isLoading || !file || isUploaded) ? { scale: 1.03 } : {}} // Hover animation
          whileTap={!(isLoading || !file || isUploaded) ? { scale: 0.97 } : {}} // Tap animation
        >
          {isLoading ? (
            // Loading state: spinner and text
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing CV...
            </div>
          ) : (
            // Default state: button text
            'Upload CV'
            
          )}
        </motion.button>
       
      </div>

     
       <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cvContent={parsedText} />
    </motion.form>
  );
}