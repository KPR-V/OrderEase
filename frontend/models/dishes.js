import mongoose from "mongoose";
const dishschema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    description: { type: String ,required: true},
    price: { type: String, required: true },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer"
        }
    ],
    category: { type: String, required: true },
    image: { type: String}
});
export const Dish = mongoose.models?.Dish || mongoose.model("Dish", dishschema);