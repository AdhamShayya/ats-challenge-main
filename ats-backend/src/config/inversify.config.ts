// src/config/inversify.config.ts
import { Container } from 'inversify';
import { TYPES } from './types';
import { OpenAIService } from '../services/openAi.service';
import { CVController } from '../controllers/cv.controller';
import { QuestionController } from '../controllers/question.controller';
import { EvaluationController } from '../controllers/evaluation.controller';
import { CVService } from '../services/cv.service';
import { JobDescriptionService } from '../services/jobDescription.service';
import { JobDescriptionController } from '../controllers/jobDescription.controller';
import dotenv from 'dotenv';

dotenv.config();
// this is the container where all of the controllers, routes will be stored 
const container: Container = new Container();

container.bind(TYPES.CVController).to(CVController);
container.bind(TYPES.CVService).to(CVService);
container.bind(TYPES.JobDescriptionService).to(JobDescriptionService);
container.bind(TYPES.JobDescriptionController).to(JobDescriptionController);

container.bind(TYPES.OpenAIService).to(OpenAIService);
container.bind(TYPES.QuestionController).to(QuestionController);
container.bind(TYPES.EvaluationController).to(EvaluationController);

export { container };