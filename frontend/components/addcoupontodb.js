"use server";
import { connectdb } from './connectdb';
import { coupon } from '@/models/coupon';

export const addCouponToDB = async (data) => {
    try {
        await connectdb();
        const { name, discount, expiry } = data;
        if (!name || !discount || !expiry) {
            throw new Error('All fields are required');
        }
        else {
            const existingCoupon = await coupon.findOne({ name });
            if (existingCoupon) {
                throw new Error('Coupon already exists');
            }
            else {
                const newCoupon = await coupon.create({ name, discount, expiry });
                return true
            }
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}
