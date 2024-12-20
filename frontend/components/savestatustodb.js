"use server";
import { connectdb } from './connectdb';
import { order as OrderModel } from '@/models/orders'; 
export const savestatustoorders = async () => {
    try {
        await connectdb();
        const orders = await OrderModel.find({});
        
        if (orders.length === 0) {
            
            return;
        }

        
        for (const orderDoc of orders) {
          
            orderDoc.orders = orderDoc.orders.map(order => {
               
                return { ...order, status: 'Order Placed' };
            });
          
            await orderDoc.save();
        }
    } catch (error) {
        console.error('Error saving status to orders:', error);
        throw error;
    }
};


