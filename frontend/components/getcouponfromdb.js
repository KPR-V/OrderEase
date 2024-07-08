"use server";
import { connectdb } from './connectdb';
import { coupon } from '@/models/coupon';


export const getCouponFromDB = async () => {
    try {
        await connectdb();
        const coupons = await coupon.find({});
        if (!coupons) {
            return {};
        }
        return coupons;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
