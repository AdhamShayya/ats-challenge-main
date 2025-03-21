// app/evaluation/page.tsx
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function EvaluationContent() {
  const searchParams = useSearchParams();
  const evaluation = searchParams.get('evaluation');
  const router = useRouter();

  // Function to parse the evaluation into sections
  const parseEvaluation = (evaluation: string) => {
    const sections = evaluation.split('###');
    const performanceEvaluation = sections[1]?.trim(); // "Candidate Performance Evaluation"
    const summary = sections[2]?.trim(); // "Summary of Strengths and Areas for Improvement"

    return { performanceEvaluation, summary };
  };

  const { performanceEvaluation, summary } = parseEvaluation(evaluation || '');

  return (
    <motion.div
      className="p-6 y-full bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-dark-gray">Evaluation Results</h1>

      {/* Display Candidate Performance Evaluation */}
      {performanceEvaluation && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-dark-gray">Candidate Performance Evaluation</h2>
          <div className="space-y-4">
            {performanceEvaluation.split('\n')
              .filter((line) => !line.includes('Candidate Performance Evaluation'))
              .map((line, index) => {
                if (
                  line.includes('Technical Acumen:') ||
                  line.includes('Communication Skills:') ||
                  line.includes('Responsiveness & Agility:') ||
                  line.includes('Problem-Solving & Adaptability:') ||
                  line.includes('Cultural Fit & Soft Skills:')
                ) {
                  return (
                    <p key={index} className="text-dark-gray">
                      <strong>{line}</strong>
                    </p>
                  );
                }
                return <p key={index} className="text-dark-gray">{line}</p>;
              })}
          </div>
        </div>
      )}

      {/* Display Summary of Strengths and Areas for Improvement */}
      {summary && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-dark-gray">Summary of Strengths and Areas for Improvement</h2>
          <div className="space-y-4">
            {summary
              .split('\n')
              .filter((line) => !line.includes('Summary of Strengths and Areas for Improvement')) // Remove duplicate summary line
              .map((line, index) => {
                if (line.includes('Strengths:') || line.includes('Areas for Improvement:')) {
                  return (
                    <p key={index} className="text-dark-gray">
                      <strong>{line}</strong>
                    </p>
                  );
                }
                return <p key={index} className="text-dark-gray">{line}</p>;
              })}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push('/')} // Navigate to the home page
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Go to Home</span>
        </button>
      </div>
    </motion.div>
  );
}
// for building the app not to crash since i used useSearchParams
export default function Evaluation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EvaluationContent />
    </Suspense>
  );
}