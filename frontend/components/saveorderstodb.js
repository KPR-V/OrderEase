"use server";
import { connectdb } from './connectdb';
import { order } from '@/models/orders'; 

export const saveordersToDB = async (data) => {
    
    try {
        await connectdb();
        const { tableNumber } = data; 
        let orderdoc = await order.findOne({});
        if (!orderdoc) {
            orderdoc = new order({ orders: [] });
        } 
        
        const orderExists = orderdoc.orders.some(order => order.tableNumber === tableNumber);
        if (orderExists) {
            return;
        }

        orderdoc.orders.push(data);
        await orderdoc.save();
    } catch (error) {
        console.error('Error handling feedback:', error);
    }
};
