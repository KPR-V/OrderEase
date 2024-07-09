"use server";
import { connectdb } from './connectdb';
import { order } from '@/models/orders'; 


export const deleteordersFromDB = async (tablenumber) => {
    try {
        await connectdb();
        const orders = await order.find({});
        if (!orders[0]) {
           
            return;
        }
        if (tablenumber) {
            orders[0].orders = orders[0].orders.filter((order) => {
                return order.tableNumber !== tablenumber;
            });
        }
        await orders[0].save();
    } catch (error) {
        console.error('Error deleting orders from the database:', error);
        throw error;
    }
}