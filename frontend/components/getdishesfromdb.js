"use server"
import { connectdb } from './connectdb'
import { Dish } from '@/models/dishes'

const getdishesfromdb = async () => {
    try {
        await connectdb();
        const dishes = await Dish.find();
        if (!dishes) {
            return [];
        }
        return dishes;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export default getdishesfromdb;
