// src/controllers/QuestionController.ts
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { OpenAIService } from "../services/openAi.service";
import { TYPES } from "../config/types";
import { ERROR_MESSAGES } from "../utils/error.messages";

@injectable()
export class QuestionController {
  constructor(
    @inject(TYPES.OpenAIService) private openaiService: OpenAIService
  ) {}

  async generateQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { jobDescription, cvText } = req.body;
      if (!jobDescription || !cvText) {
        throw new Error(ERROR_MESSAGES.JOB_DESCRIPTION_AND_CV_REQUIRED);
      }
      const questions: string[] = await this.openaiService.generateQuestions(
        jobDescription,
        cvText
      );

      console.log(questions);
      res.status(200).json({ questions });
    } catch (error) {
      console.log(ERROR_MESSAGES.FAILED_TO_GENERATE_QUESTIONS);
    }
  }
}
