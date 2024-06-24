import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String,  select: false},
    image: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    // isverified: { type: Boolean, default: false },
});
export const User = mongoose.models?.User || mongoose.model("User", userschema);