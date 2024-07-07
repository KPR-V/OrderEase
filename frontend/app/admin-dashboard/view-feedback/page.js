import React from 'react';
import FeedbackCharts from '@/components/Feedbackchart'; 
import Link from 'next/link';
const DisplayPage = () => {
  return (
    <div className="w-full min-h-screen p-2 flex justify-center items-center flex-col font-changa">
      <div className="w-full md:w-2/3 gap-3 h-auto flex justify-center items-center bg-slate-800/50 backdrop-blur-sm flex-col font-changa p-4">
        <h1 className="text-2xl md:text-3xl text-blue-400 font-bold mb-3">Customer Feedback</h1>
        <FeedbackCharts />
        <Link href="/admin-dashboard">
          <button
            type="button"
            className="mt-4 bg-custom-yellow text-black font-bold py-2 px-4 rounded-md"
          >
            Go Back To Admin Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DisplayPage;
