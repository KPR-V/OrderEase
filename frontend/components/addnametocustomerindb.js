"use server";
import { connectdb } from './connectdb';
import { customer } from '@/models/customer';


export const addnametocustomerindb = async (number1, name1) => {
    try {
        await connectdb();
        const existingCustomer = await customer.findOne({ contact: number1 });
        if (!existingCustomer) {
           
            return { success: false, error: 'Customer with this contact does not exist' };
        } else {
            if (name1) {
                existingCustomer.name = name1;
                await existingCustomer.save();
                
                return { success: true };
            }
            else {
                
                return { success: false, error: 'Name not added to customer' };
            }
        }
    }
    catch (error) {
        console.error('Error handling customer:', error);
        return { success: false, error: error.message };
    }

}