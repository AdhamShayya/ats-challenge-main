// src/routes/EvaluationRoutes.ts
import { Router } from 'express';
import { TYPES } from '../config/types';
import { container } from '../config/inversify.config';
import { EvaluationController } from '../controllers/evaluation.controller';

const router: Router = Router();
const evaluationController: EvaluationController = container.get<EvaluationController>(TYPES.EvaluationController);

router.post('/evaluate-performance', (req, res, next) =>
  evaluationController.evaluatePerformance(req, res, next)
);

export { router as EvaluationRoutes };