// src/services/JobDescriptionService.ts
import { injectable } from 'inversify';
import { JobDescription } from '../models/JobDescriptionModel';

@injectable()
export class JobDescriptionService {
  async saveJobDescription(title: string, description: string, requirements: string, company?: string) {
    try {
      // Create a new JobDescription document and save it to the database
      const jobDescription = new JobDescription({ title, description, requirements, company });
      await jobDescription.save();
      return jobDescription;
    } catch (error) {
      // Log the error and rethrow with a user-friendly message
      console.error('Error saving job description:', error);
      throw new Error('Failed to save the job description. Please try again later.');
    }
  }

  async getJobDescriptions() {
    try {
      // Fetch all job descriptions from the database
      const jobDescriptions = await JobDescription.find();
      return jobDescriptions;
    } catch (error) {
      // Log the error and rethrow with a user-friendly message
      console.error('Error fetching job descriptions:', error);
      throw new Error('Failed to fetch job descriptions. Please try again later.');
    }
  }
}