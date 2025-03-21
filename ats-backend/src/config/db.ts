import mongoose from 'mongoose';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URL;
if(!uri) {
  throw new Error('No Mongo Key is provided');
}
export const connectDB = async () => {
  try {
    // Connect using mongoose instead of MongoClient
    await mongoose.connect(uri, {
      dbName: 'ats',
    });
    
    console.log("Connected to MongoDB!");
    
    // Optional: List collections for verification
    const collections = await mongoose.connection?.db?.listCollections().toArray();
    collections?.forEach((collection: any) => {
      console.log(collection.name);
    });
    
    console.log("Mongoose connection established successfully!");
    
    // Set up event listeners for the mongoose connection
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
  // Remove the finally block with client.close()
};