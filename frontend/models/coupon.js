import mongoose from "mongoose";

const couponschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        expiry: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const coupon = mongoose.models?.coupon || mongoose.model("coupon", couponschema);
