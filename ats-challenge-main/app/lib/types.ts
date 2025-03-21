export interface JobDescription {
    title: string;
    description: string;
    requirements: string;
    company?: string;
  }
  
  export interface CandidateCV {
    name: string;
    email?: string;
    skills: string[];
    experience: string;
    education: string;
    rawText: string;
  }
  
  export interface InterviewQuestion {
    id: string;
    text: string;
    category?: 'technical' | 'behavioral' | 'situational';
    followUpQuestions?: string[];
  }
  
  export interface InterviewResponse {
    questionId: string;
    answer: string;
    responseTimeMs: number;
    startTime: number;
    endTime: number;
  }
  
  export interface InterviewSession {
    jobDescription: JobDescription;
    candidateCV: CandidateCV;
    questions: InterviewQuestion[];
    responses: InterviewResponse[];
    currentQuestionIndex: number;
    isComplete: boolean;
  }
  
  export interface InterviewScore {
    technicalAcumen: number;
    communicationSkills: number;
    responsivenessAgility: number;
    problemSolvingAdaptability: number;
    culturalFitSoftSkills: number;
    overallScore: number;
    feedback: string;
    strengths: string[];
    areasForImprovement: string[];
  }
  
  export interface AIRequest {
    jobDescription: JobDescription;
    candidateCV: CandidateCV;
  }
  
  export interface AIQuestionsResponse {
    questions: InterviewQuestion[];
  }
  
  export interface AIScoreRequest {
    jobDescription: JobDescription;
    candidateCV: CandidateCV;
    questions: InterviewQuestion[];
    responses: InterviewResponse[];
  }
  
  export interface AIScoreResponse {
    score: InterviewScore;
  }