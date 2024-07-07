import mongoose from "mongoose";

const customerschema = new mongoose.Schema({
    contact: { type: mongoose.Schema.Types.Mixed, required: true },
    dishesordered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish" 
        }
    ],
    name: { type: String }
});

export const customer = mongoose.models?.customer || mongoose.model("customer", customerschema);
