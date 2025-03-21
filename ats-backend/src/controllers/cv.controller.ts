// src/controllers/CVController.ts
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CVService } from '../services/cv.service';
import { TYPES } from '../config/types';

@injectable()
export class CVController {
    constructor(@inject(TYPES.CVService) private cvService: CVService) {}

  async uploadCV(req: Request, res: Response): Promise<void> {
    try {
      const file: Express.Multer.File | undefined = req.file;

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const text: string = await this.cvService.parseCV(file);
      const cv = await this.cvService.saveCV(file.originalname, text);

      res.status(200).json({
        message: 'File uploaded successfully',
        text: cv.text, // Ensure the `text` field is included
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process file' });
    }
  }
}