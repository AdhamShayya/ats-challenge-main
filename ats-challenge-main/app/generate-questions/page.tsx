// src/pages/generate-questions.tsx
'use client';
import { useState, useEffect, Suspense } from 'react';
import ChatInterface from '../components/ChatInterface';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

function GenerateQuestionsContent() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get jobDescription and cvText from query parameters
  const jobDescription: string | null = searchParams.get('jobDescription');
  const cvText: string | null = searchParams.get('cvText');
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  useEffect(() => {
    // Check if both are available before fetching the questions 
    if (!jobDescription || !cvText) {
      // Display error toast
      toast.error('Job description or CV text is missing.');
      return;
    }
    const fetchQuestions = async () => {
      try {
        toast.loading('Generating questions...');

        // Fetch generated questions from the backend
        const response = await fetch('http://localhost:5000/api/questions/generate-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobDescription, cvText }),  // Passing the jobDescription and the cvText in the body
        });

        // Success toast
        toast.success('Questions generated successfully!');
        if (response.ok) {
          const { questions } = await response.json();
          setQuestions(questions);
          setInterviewStarted(true);
        }
      } catch (error) {
        console.error('Error evaluating performance:', error);
        toast.error('Failed to evaluate performance.');
      } finally {
        toast.dismiss();
      }
    };

    fetchQuestions();
  }, [jobDescription, cvText]);

  const handleInterviewComplete = async (transcript: string, timings: number[]) => {
    setIsCompleted(true)
    toast.loading('Evaluating performance...');
    
    try {
      // Call the evaluation route in the backend
      const response = await fetch('http://localhost:5000/api/evaluation/evaluate-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript, jobDescription, cvText, timings }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate performance');
      }
      const { evaluation } = await response.json();
      console.log(evaluation);
      // Navigate to the evaluation page passing the evaluation results
      router.push(`/evaluation?evaluation=${encodeURIComponent(evaluation)}`);
      toast.success('Evaluation completed successfully!');
    } catch (error) {
      console.error('Error evaluating performance:', error);
      toast.error('Failed to evaluate performance.');
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8 px-4">
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Mock Interview</h1>
      
      {!interviewStarted && (
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <p className="text-gray-600">Generating your personalized interview questions...</p>
        </div>
      )}
    </div>
    
    {!isCompleted && interviewStarted && (
      <div className="w-full max-w-2xl mx-auto">
        <ChatInterface questions={questions} onComplete={handleInterviewComplete} />
      </div>
    )}
  </div>
  );
}

// for building the app not to crash since i used useSearchParams
export default function GenerateQuestions() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <GenerateQuestionsContent />
    </Suspense>
  );
}