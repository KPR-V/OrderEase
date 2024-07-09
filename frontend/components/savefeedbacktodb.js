"use server"
import { connectdb } from './connectdb';

import {feedback} from '@/models/feedback'; 

export const saveFeedbackToDB = async (data) => {
    try {
        await connectdb();
        const { id } = data;
        let feedbackDoc = await feedback.findOne({});
        if (!feedbackDoc) {
            feedbackDoc = new feedback({ feedbacks: [] });
        }
        const feedbackExists = feedbackDoc.feedbacks.some(feedback => feedback.id === id);
        if (feedbackExists) {
            
            return;
        }
        feedbackDoc.feedbacks.push(data);
        await feedbackDoc.save();
    } catch (error) {
        console.error('Error handling feedback:', error);
    }
};
