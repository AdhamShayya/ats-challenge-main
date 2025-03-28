// src/app.ts
import express from 'express';
import cors from 'cors';
import { CVRoutes } from './routes/cv';
import { connectDB } from './config/db';
import { QuestionRoutes } from './routes/question';
import { EvaluationRoutes } from './routes/evaluation';
import { JobDescriptionRoutes } from './routes/jobDescription';

const app = express();

// Connect to MongoDB
connectDB();
// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/cv', CVRoutes);
app.use('/api/questions', QuestionRoutes);
app.use('/api/evaluation', EvaluationRoutes);
app.use('/api/jobDescription', JobDescriptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };