import { injectable } from 'inversify';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
@injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is missing. Please check your .env file.');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async generateQuestions(jobDescription: string, cvText: string): Promise<string[]> {
  
    // this prompt will generate the list of questions according to the job Description and the cv (they will be divided into 3 sections technical, behavioral, situational )
    const prompt = `
      Generate a list of interview questions based on the following job description and candidate CV.
      Only include actionable questions that the candidate can answer directly.
      Do not include any introductory text, only put the questions in categories (e.g., technical, behavioral, situational).
      Format the questions as a plain list, with each question on a new line.

      Job Description: ${jobDescription}
      Candidate CV: ${cvText}
    `;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    console.log('response', response)
    const questions = response.choices[0].message.content
      ?.split('\n')
      .filter((line) => line.trim().length > 0 && !line.startsWith('###'))
      .map((line) => line.replace(/^\d+\.\s*/, '').trim());

      console.log('questions', questions)
    return questions || [];
  }


  async evaluatePerformance(
    transcript: string,
    jobDescription: string,
    cvText: string,
    timings: number[]
  ): Promise<string> {
    // this prompt will generate an evaluation of the candidate according to all of the inputs, and divide the evaluation into certain sections

      // Check if the transcript contains nonsensical or incomplete responses
  const isTranscriptMeaningful = this.isMeaningfulTranscript(transcript);

    const prompt = `
      Evaluate the candidate's performance based on the following:
      Job Description: ${jobDescription}
      Candidate CV: ${cvText}
      Interview Transcript: ${transcript}
      Response Timings: ${timings.join(', ')} seconds per question.

      Provide scores out of 10 for:
      1. Technical Acumen
      2. Communication Skills
      3. Responsiveness & Agility
      4. Problem-Solving & Adaptability
      5. Cultural Fit & Soft Skills

      Also, provide a brief summary of the candidate's strengths and areas for improvement.
      
    ${
      !isTranscriptMeaningful
        ? 'Note: The transcript contains nonsensical, incomplete, or irrelevant responses. This should be reflected severely in the scores and summary.'
        : ''
    }
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      const evaluation: string = response.choices[0].message.content || 'No evaluation available.';
      return evaluation;
    } catch (error) {
      console.error('Error evaluating performance:', error);
      throw new Error('Failed to evaluate performance. Please try again later.');
    }
  }
  isMeaningfulTranscript(transcript: string): boolean {
    // Implement logic to check if the transcript contains meaningful content
    // For example, check if the transcript contains at least a few complete sentences or relevant keywords
    const meaningfulThreshold = 3; // Example threshold
    const sentences = transcript.split(/[.!?]/).filter(s => s.trim().length > 0);
    return sentences.length >= meaningfulThreshold;
  }
}