// src/models/CVModel.ts
import { Schema, model } from "mongoose";

const CVSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CV = model("CV", CVSchema);
