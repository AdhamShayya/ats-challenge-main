import mongoose from 'mongoose';
import 'reflect-metadata';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ats');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};