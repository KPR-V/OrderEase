
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EarningsGraph({ data }) {
  
  const adjustedData = Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key] / 100;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(adjustedData),
    datasets: [
      {
        label: 'Earnings',
        data: Object.values(adjustedData),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
}
