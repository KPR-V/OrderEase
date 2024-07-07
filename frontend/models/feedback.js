import mongoose from "mongoose";
const feedbackschema = new mongoose.Schema({
    feedbacks: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: true
      }
    ]
  });
  
  export const feedback = mongoose.models?.feedback || mongoose.model('feedback', feedbackschema);