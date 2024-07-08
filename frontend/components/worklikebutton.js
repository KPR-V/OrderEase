
"use server";
import { connectdb } from "@/components/connectdb";
import { customer } from "@/models/customer";
import { Dish } from "@/models/dishes";

export const worklikebutton = async (number, dishName) => {
  await connectdb();
  const customerData = await customer.findOne({ number: number });

  if (!customerData) {
    return { error: "Customer not found" };
  }

  const dishData = await Dish.findOne({ name: dishName });
  if (!dishData) {
    return { error: "Dish not found" };
  }

  if (dishData.likes.includes(customerData._id)) {
    dishData.likes = dishData.likes.filter(
      (like) => like.toString() !== customerData._id.toString()
    );
  } else {
    dishData.likes.push(customerData._id);
  }

  await dishData.save();
  return { success: true };
};
