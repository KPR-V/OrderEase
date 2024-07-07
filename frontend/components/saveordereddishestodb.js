"use server";
import { connectdb } from './connectdb';
import { customer } from '@/models/customer';

export const saveordereddishestodb = async (number1, dishids) => {
    try {
        await connectdb();
        const existingCustomer = await customer.findOne({ contact: number1 });
        if (!existingCustomer) {
            console.log('Customer with this contact does not exist:', number1);
            return { success: false, error: 'Customer with this contact does not exist' };
        } else {
            dishids.forEach(dishid => {
                existingCustomer.dishesordered.push(dishid);
            });
            await existingCustomer.save();
            console.log('Dishes added to customer:', existingCustomer);
            return { success: true };
        }
    } catch (error) {
        console.error('Error handling customer:', error);
        return { success: false, error: error.message };
    }
};
