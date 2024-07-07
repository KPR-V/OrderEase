"use server";
import { connectdb } from './connectdb';
import { order as OrderModel } from '@/models/orders';

export const changestatustodb = async (status1, tablenumber) => {
    try {
        await connectdb();
        const orderDoc = await OrderModel.findOne({});
        if (!orderDoc) {
            console.log('No orders found');
            return;
        }

        console.log('Initial orderDoc:', JSON.stringify(orderDoc, null, 2));

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
            console.log(`Order status updated to '${status1}' for table number ${tablenumber}`);
            console.log('Updated orderDoc:', JSON.stringify(orderDoc, null, 2));
        } else {
            console.log('Order not found for the given table number');
        }
    } catch (error) {
        console.error('Error saving status to orders:', error);
        throw error;
    }
}
