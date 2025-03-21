import { InterviewResponse } from './types';

export function validateJobDescription(description: string): boolean {
  return description.trim().length >= 100;
}

export function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
  
  return `${seconds}s`;
}

export function calculateAverageResponseTime(responses: InterviewResponse[]): number {
  if (responses.length === 0) return 0;
  
  const totalTime = responses.reduce((acc, response) => acc + response.responseTimeMs, 0);
  return totalTime / responses.length;
}

export function calculatePercentile(value: number, allValues: number[]): number {
  if (allValues.length === 0) return 0;
  
  const sorted = [...allValues].sort((a, b) => a - b);
  const position = sorted.indexOf(value);
  
  if (position === -1) return 0;
  return (position / (sorted.length - 1)) * 100;
}

export function getScoreCategory(score: number): 'excellent' | 'good' | 'average' | 'belowAverage' | 'poor' {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'average';
  if (score >= 40) return 'belowAverage';
  return 'poor';
}
