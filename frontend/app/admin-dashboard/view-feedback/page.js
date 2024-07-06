import React from 'react';
import FeedbackCharts from '@/components/Feedbackchart'; 

const DisplayPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col font-changa">
      <div className="w-full md:w-2/3 h-full flex justify-center items-center bg-slate-800/50 backdrop-blur-sm flex-col font-changa">
      <h1 className="text-3xl text-blue-400 font-bold mb-6">Customer Feedback</h1>
      <FeedbackCharts />
    </div>
    </div>
  );
};

export default DisplayPage;
