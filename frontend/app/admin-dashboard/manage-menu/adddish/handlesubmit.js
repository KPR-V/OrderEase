"use server";
import { connectdb } from '@/components/connectdb';
import { Dish } from '@/models/dishes';

export const handlesubmit = async ({ description, name, category, price, url }) => {
  if (!name || !category || !price || !description || !url) {
    throw new Error('Please fill all fields');
  }

  try {
    await connectdb();

    const existingDish = await Dish.findOne({ name });
    if (existingDish) {
      throw new Error('Dish already exists');
    }

    await Dish.create({
      name,
      description,
      price,
      image: url,
      category,
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating dish:', error.message);
    throw new Error('Error creating dish');
  }
};
