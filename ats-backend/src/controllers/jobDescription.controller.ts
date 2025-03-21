// src/controllers/JobDescriptionController.ts
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { JobDescriptionService } from '../services/jobDescription.service';
import { TYPES } from '../config/types';

@injectable()
export class JobDescriptionController {
  constructor(@inject(TYPES.JobDescriptionService) private jobDescriptionService: JobDescriptionService) {}

  async saveJobDescription(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, requirements, company } = req.body;
      const jobDescription = await this.jobDescriptionService.saveJobDescription(title, description, requirements, company);
      res.status(200).json(jobDescription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save job description' });
    }
  }

  async getJobDescriptions(req: Request, res: Response): Promise<void> {
    try {
      const jobDescriptions = await this.jobDescriptionService.getJobDescriptions();
      res.status(200).json(jobDescriptions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job descriptions' });
    }
  }
}