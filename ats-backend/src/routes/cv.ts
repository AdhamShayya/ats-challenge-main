// src/routes/CVRoutes.ts
import { Router } from 'express';
import { container } from '../config/inversify.config';
import { CVController } from '../controllers/cv.controller';
import multer from 'multer';
import { TYPES } from '../config/types';

const upload: multer.Multer = multer({ dest: process.env.UPLOAD_DIR });
const cvController: CVController = container.get<CVController>(TYPES.CVController);

const router: Router = Router();
router.post('/upload', upload.single('file'), (req, res) => cvController.uploadCV(req, res));

export { router as CVRoutes };