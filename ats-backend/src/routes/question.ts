// src/routes/QuestionRoutes.ts
import { Router } from 'express';
import { TYPES } from '../config/types';
import { container } from '../config/inversify.config';
import { QuestionController } from '../controllers/question.controller';

const router: Router = Router();
const questionController: QuestionController = container.get<QuestionController>(TYPES.QuestionController);

router.post('/generate-questions', (req, res, next) =>
  questionController.generateQuestions(req, res, next)
);

export { router as QuestionRoutes };