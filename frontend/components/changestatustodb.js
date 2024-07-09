"use server";
import { connectdb } from './connectdb';
import { order as OrderModel } from '@/models/orders';

export const changestatustodb = async (status1, tablenumber) => {
    try {
        await connectdb();
        const orderDoc = await OrderModel.findOne({});
        if (!orderDoc) {
            
            return;
        }

        

        let updated = false;
        orderDoc.orders = orderDoc.orders.map(order => {
            if (order.tableNumber === tablenumber) {
                order.status = status1;
                updated = true;
            }
            return order;
        });

        if (updated) {
            orderDoc.markModified('orders');  // Mark the orders array as modified
            await orderDoc.save();
        } else {
            return
        }
    } catch (error) {
        console.error('Error saving status to orders:', error);
        throw error;
    }
}
