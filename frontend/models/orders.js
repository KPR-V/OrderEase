import mongoose from "mongoose";
const orderschema = new mongoose.Schema({
    orders: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: true
      }
    ]
  });
  
  export const order = mongoose.models?.order || mongoose.model('order', orderschema);