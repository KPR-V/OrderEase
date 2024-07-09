"use server";
import { connectdb } from './connectdb';
import { coupon } from '@/models/coupon';

export const deleteCouponFromDB = async (name) => {
    try {
        await connectdb();
        const couponDoc = await coupon.findOneAndDelete({ name });
        if (!couponDoc) {
            return;
        }
    } catch (error) {
        console.error('Error handling feedback:', error);
    }
}
