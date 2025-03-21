// src/routes/JobDescriptionRoutes.ts
import { Router } from 'express';
import { container } from '../config/inversify.config';
import { JobDescriptionController } from '../controllers/jobDescription.controller';
import { TYPES } from '../config/types';

const jobDescriptionController: JobDescriptionController = container.get<JobDescriptionController>(TYPES.JobDescriptionController);

const router: Router = Router();
router.post('/job-description', (req, res) => jobDescriptionController.saveJobDescription(req, res));
router.get('/job-descriptions', (req, res) => jobDescriptionController.getJobDescriptions(req, res));

export { router as JobDescriptionRoutes };