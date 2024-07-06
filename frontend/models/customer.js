import mongoose from "mongoose";
const customerschema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    dishordered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
export const customer = mongoose.models?.customer || mongoose.model("customer", customerschema);