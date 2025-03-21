// src/services/CVService.ts
import { injectable } from 'inversify';
import { CV } from '../models/CVModel';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

@injectable()
export class CVService {
  async parseCV(file: Express.Multer.File): Promise<string> {
    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
      return data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return value;
    } else if (file.mimetype === 'text/plain') {
      return file.buffer.toString('utf-8');
    } else {
      throw new Error('Unsupported file type');
    }
  }

  async saveCV(filename: string, text: string) {
    const cv = new CV({ filename, text });
    await cv.save();
    return cv;
  }
}