"use server";
import mongoose from 'mongoose';
import { connectdb } from './connectdb';
import { Dish } from '@/models/dishes';




export const getdishesfromdb = async () => {
    try {
        await connectdb();
        const dishes = await Dish.find();
        return dishes;
    } catch (error) {
        console.error("Error fetching dishes:", error.message);
        return [];
    }
};


export const getDishById = async (id) => {
  try {
    await connectdb();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    const dish = await Dish.findById(id).lean();  // Use lean() to return a plain object
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish;
  } catch (error) {
    console.error('Error fetching dish by ID:', error.message);
    throw error;
  }
};

export const updateDish = async (id, updatedData) => {
  try {
    await connectdb();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    const updatedDish = await Dish.findByIdAndUpdate(id, updatedData, { new: true, lean: true });
    if (!updatedDish) {
      throw new Error('Dish not found');
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating dish:', error.message);
    throw error;
  }
};
export const deleteDish = async (id) => {
  try {
    await connectdb();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    const deletedDish = await Dish.findByIdAndDelete(id).lean();
    if (!deletedDish) {
      throw new Error('Dish not found');
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting dish:', error.message);
    throw error;
  }
};


export const getCategoriesFromDB = async () => {
  try {
    await connectdb();
    const categories = await Dish.distinct('category');
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};