"use server";
import { connectdb } from './connectdb';
import { order } from '@/models/orders'; 

export const saveordersToDB = async (data) => {
    console.log('data:', data); // Log the entire data object to inspect it
    try {
        await connectdb();
        const { tableNumber } = data; // Adjusted to match the expected field name in the data object

        console.log('tableNumber:', tableNumber); // Log the tableNumber to ensure it is correct

        let orderdoc = await order.findOne({});
        if (!orderdoc) {
            orderdoc = new order({ orders: [] });
        } 
        
        const orderExists = orderdoc.orders.some(order => order.tableNumber === tableNumber);
        if (orderExists) {
            console.log('Order with this tableNumber already exists:', tableNumber);
            return;
        }

        orderdoc.orders.push(data);
        await orderdoc.save();
    } catch (error) {
        console.error('Error handling feedback:', error);
    }
};
