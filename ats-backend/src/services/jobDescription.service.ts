// src/services/JobDescriptionService.ts
import { injectable } from 'inversify';
import { JobDescription } from '../models/JobDescriptionModel';

@injectable()
export class JobDescriptionService {
  async saveJobDescription(title: string, description: string, requirements: string, company?: string) {
    const jobDescription = new JobDescription({ title, description, requirements, company });
    await jobDescription.save();
    return jobDescription;
  }

async getJobDescriptions() {
  try {
    const jobDescriptions = await JobDescription.find();
    console.log('Job Descriptions fetched successfully:', jobDescriptions);
    return jobDescriptions;
  } catch (error) {
    console.error('Error fetching job descriptions:', error);
    throw error;
  }
}
}