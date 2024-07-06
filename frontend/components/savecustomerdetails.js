"use server"
import { connectdb } from "./connectdb"
import { customer } from "@/models/customer"

export const savecustomerdetails = async (phonenumber) => {
    try {
        console.log('Saving customer details for phone number:', phonenumber); // Debug log

        await connectdb();

        let customerexists = await customer.findOne({ number: phonenumber });
        if (customerexists) {
            console.log('Customer already exists:', customerexists); // Debug log
            return customerexists;
        } else {
            const newcustomer = await customer.create({ number: phonenumber });
            console.log('New customer created:', newcustomer); // Debug log
            return newcustomer;
        }
    } catch (error) {
        console.error('Error saving customer details:', error);
        throw new Error('Error saving customer details');
    }
};
