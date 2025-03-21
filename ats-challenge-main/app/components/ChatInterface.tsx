// Mark this component as a Client Component for Next.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ChatInterfaceProps {
  questions: string[];
  onComplete: (transcript: string, timings: number[]) => void;
}

export default function ChatInterface({ questions = [], onComplete }: ChatInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // State to track the current question index
  const [transcript, setTranscript] = useState<string[]>([]);   // State to store the user's transcript (all answers)
  const [timings, setTimings] = useState<number[]>([]);   // State to store the time taken for each answer
  const [startTime, setStartTime] = useState<number>(Date.now());  // State to track the start time of the current question
  const [answer, setAnswer] = useState<string>('');  // State to store the user's current answer 
  const [isComplete, setIsComplete] = useState<boolean>(false);   // State to track if the interview is complete

  const handleAnswer = () => {

     // Check if the current question is a section title (e.g., "**Technical Questions**")
     if (questions[currentQuestionIndex].startsWith('**')) {
      // Move to the next question without requiring an answer
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
      return;
    }
    
    // Check if the answer is empty
    if (!answer.trim()) {
      toast.error('Please provide an answer before submitting.');
      return;
    }

    // Calculate the time taken for the current answer in seconds
    const timeTaken = (Date.now() - startTime) / 1000;

    // Update the transcript with the current answer
    setTranscript([...transcript, answer]);

    // Update the timings with the time taken for the current answer
    setTimings([...timings, timeTaken]);

    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    // Reset the start time for the next question
    setStartTime(Date.now());

    // Clear the current answer input
    setAnswer('');
  };

  useEffect(() => {
     // If the current question index exceeds the number of questions and the interview is not yet marked as complete
    if (currentQuestionIndex >= questions.length && !isComplete) {
      setIsComplete(true);

       // Trigger the onComplete callback with the transcript and timings
      onComplete(transcript.join('\n'), timings);
    }
  }, [currentQuestionIndex, questions.length, transcript, timings, onComplete, isComplete]);

    // If no questions are provided, display a message
  if (questions.length === 0) {
    return <p className="text-dark-gray">No questions available.</p>;
  }

  return (
    <motion.div
      className="space-y-6 p-6 bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }} // Initial animation state: hidden and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
      transition={{ duration: 0.5 }} // Animation duration: 0.5 seconds
    >
      <h2 className="text-xl font-bold text-dark-gray mb-4">Interview Question {currentQuestionIndex + 1}</h2>

      {/* Display the current question number */}
      <p className="text-lg text-dark-gray">{questions[currentQuestionIndex]}</p>

   {/* If the current question is a section title, display a "Get Started" button */}
   {!isComplete && (
    questions[currentQuestionIndex]?.startsWith('**') ? (
        <button
          onClick={handleAnswer}  // Trigger the `handleAnswer` function on click
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2"
        >
          Get Started
        </button>
      ) : (
        <>
          {/* Textarea for the user to type their answer */}
          <textarea
            value={answer}  // Bind the value to the `answer` state
            onChange={(e) => setAnswer(e.target.value)} // Update the `answer` state on change
            placeholder="Type your answer..."
            className="w-full p-4 text-dark-gray border border-medium-gray rounded-lg focus:border-primary focus:outline-none"
            rows={5} // Number of rows for the textarea
          />
          <button
            onClick={handleAnswer}  // Trigger the `handleAnswer` function on click
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 space-x-2"
          >
            Submit Answer
          </button>
          <p className="text-sm text-medium-gray">Time taken: {((Date.now() - startTime) / 1000).toFixed(1)} seconds</p>
        </>
      ))}
    
    </motion.div>
  );
}