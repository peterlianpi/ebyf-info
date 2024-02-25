import { Schema, models, model } from "mongoose";

const FeedbackSchema = new Schema({
  name: String,
  email: String,
  category: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export const Feedback = models?.Feedback || model("Feedback", FeedbackSchema);
