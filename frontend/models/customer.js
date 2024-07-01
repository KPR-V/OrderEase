import mongoose from "mongoose";
const customerschema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    dishordered: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Dish"
        }
    ]
});
export const customer = mongoose.models?.customer || mongoose.model("customer", customerschema);