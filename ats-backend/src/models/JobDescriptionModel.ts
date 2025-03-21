import { Schema, model } from 'mongoose';

const JobDescriptionSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  requirements: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const JobDescription = model('JobDescription', JobDescriptionSchema);