"use server";
import { connectdb } from './connectdb';
import {feedback} from '@/models/feedback'; 

export const getFeedbacksFromDB = async () => {
    try {
        await connectdb();
        const feedbacks = await feedback.find({});
        return feedbacks[0].feedbacks;
    } catch (error) {
        console.error('Error retrieving feedbacks from the database:', error);
        throw error;
    }
    };