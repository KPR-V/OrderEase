"use client"

import React, { useContext, useEffect , useState} from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import DataContext from '@/components/datacontext';
import { getFeedbacksFromDB } from './getfeedbacksfromdb';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const FeedbackCharts =  () => {

  const { feedbackData, setFeedbackData } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedbacksFromDB();
      setFeedbackData(data);
    };
    fetchData();
  }, []);

  const countFeedback = (field) => {
    const counts = { Excellent: 0, Good: 0, Average: 0, Dissatisfied: 0 };
    feedbackData.forEach((feedback) => {
      if (counts[feedback[field]] !== undefined) {
        counts[feedback[field]] += 1;
      }
    });
    return Object.values(counts);
  };

  const barData = {
    labels: ['Food Quality', 'Service Quality', 'Cleanliness', 'Value', 'Experience'],
    datasets: [
      {
        label: 'Excellent',
        data: [
          countFeedback('foodQuality')[0],
          countFeedback('serviceQuality')[0],
          countFeedback('cleanliness')[0],
          countFeedback('value')[0],
          countFeedback('experience')[0],
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Good',
        data: [
          countFeedback('foodQuality')[1],
          countFeedback('serviceQuality')[1],
          countFeedback('cleanliness')[1],
          countFeedback('value')[1],
          countFeedback('experience')[1],
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Average',
        data: [
          countFeedback('foodQuality')[2],
          countFeedback('serviceQuality')[2],
          countFeedback('cleanliness')[2],
          countFeedback('value')[2],
          countFeedback('experience')[2],
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Dissatisfied',
        data: [
          countFeedback('foodQuality')[3],
          countFeedback('serviceQuality')[3],
          countFeedback('cleanliness')[3],
          countFeedback('value')[3],
          countFeedback('experience')[3],
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Excellent', 'Good', 'Average', 'Dissatisfied'],
    datasets: [
      {
        label: 'Overall Experience',
        data: countFeedback('experience'),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  return (
   
    <div className="w-full h-full flex justify-center items-center flex-col font-changa">
    <div className="w-full md:w-2/3 h-full flex justify-center items-center bg-slate-800/50 backdrop-blur-sm flex-col font-changa">
      <h1 className="text-3xl text-blue-500 font-bold mb-6">Feedback Data Visualization</h1>
      <div className='flex flex-col w-full md:w-3/4 justify-center items-center'>
        <div className="mb-6">
          <h2 className="text-xl text-blue-400 font-bold mb-4">Feedback Summary</h2>
          <Bar data={barData} />
        </div>
        <div>
          <h2 className="text-xl text-blue-400 font-bold mb-4">Overall Experience</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  
  </div>

  
  );
};

export default FeedbackCharts;
