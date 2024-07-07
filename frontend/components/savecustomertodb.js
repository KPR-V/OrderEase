"use server"
import { connectdb } from './connectdb';
import { customer } from '@/models/customer';

export const saveCustomerToDB = async (number1) => {
    try {
        await connectdb();
        const existingCustomer = await customer.findOne({ contact: number1 });
        if (existingCustomer) {
            console.log('Customer with this contact already exists:', number1);
            return;
        } else {
            const newCustomer = await customer.create({
                contact: number1,
            });
            console.log('New customer created:', newCustomer);
            return { success: true };
        }
    } catch (error) {
        console.error('Error handling customer:', error);
        return { success: false, error: error.message };
    }
}
