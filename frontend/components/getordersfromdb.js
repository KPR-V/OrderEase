"use server";
import { connectdb } from './connectdb';
import { order as OrderModel } from '@/models/orders'; 

export const ordersFromDB = async () => {
    try {
        await connectdb();
        const order = await OrderModel.find({});
        return order[0].orders;
    } catch (error) {
        console.error('Error retrieving orders from the database:', error);
        throw error;
    }
    };