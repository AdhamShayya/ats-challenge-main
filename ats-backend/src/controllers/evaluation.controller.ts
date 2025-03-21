// src/controllers/EvaluationController.ts
import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { OpenAIService } from '../services/openAi.service';
import { TYPES } from '../config/types';
import { ERROR_MESSAGES } from '../utils/error.messages';

@injectable()
export class EvaluationController {
  constructor(
    @inject(TYPES.OpenAIService) private openaiService: OpenAIService
  ) {}

  async evaluatePerformance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { transcript, jobDescription, cvText, timings } = req.body;

      if (!transcript || !jobDescription || !cvText || !timings) {
        throw new Error(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
      }

      const evaluation: string = await this.openaiService.evaluatePerformance(
        transcript,
        jobDescription,
        cvText,
        timings
      );
      res.status(200).json({ evaluation });
    } catch (error) {
      console.log(ERROR_MESSAGES.FAILED_TO_EVALUATE_PERFORMANCE);
    }
  }
}