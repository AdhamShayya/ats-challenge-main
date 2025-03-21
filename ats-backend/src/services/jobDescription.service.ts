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
    return JobDescription.find().sort({ createdAt: -1 });
  }
}