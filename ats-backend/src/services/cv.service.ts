// src/services/CVService.ts
import { injectable } from 'inversify';
import { CV } from '../models/CVModel';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

@injectable()
export class CVService {
  async parseCV(file: Express.Multer.File): Promise<string> {
    try {
      if (file.mimetype === 'application/pdf') {
        // Parse PDF file
        const data = await pdfParse(file.buffer);
        return data.text;
      } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Parse DOCX file
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        return value;
      } else if (file.mimetype === 'text/plain') {
        // Parse TXT file
        return file.buffer.toString('utf-8');
      } else {
        // Throw error for unsupported file types
        throw new Error('Unsupported file type');
      }
    } catch (error) {
      // Log the error and rethrow with a user-friendly message
      console.error('Error parsing CV file:', error);
      throw new Error('Failed to parse the CV file. Please ensure the file is in a supported format (PDF, DOCX, or TXT).');
    }
  }

  async saveCV(filename: string, text: string) {
    try {
      // Create a new CV document and save it to the database
      const cv = new CV({ filename, text });
      await cv.save();
      return cv;
    } catch (error) {
      // Log the error and rethrow with a user-friendly message
      console.error('Error saving CV to the database:', error);
      throw new Error('Failed to save the CV. Please try again later.');
    }
  }
}