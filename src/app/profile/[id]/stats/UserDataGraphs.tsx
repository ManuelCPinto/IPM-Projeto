'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const UserDataGraphs = ({ chartType }: { chartType: 'line' | 'bar' }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation repeats on every scroll
    threshold: 0.3,
  });

  // Data for Streaming Days Line Chart
  const streamingDaysData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Streams',
        data: [1000, 1500, 1800, 1200, 2200, 2500, 3000],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  // Data for Listener Device Distribution Bar Chart
  const deviceData = {
    labels: ['Mobile', 'Desktop', 'Tablet', 'Smart Speaker'],
    datasets: [
      {
        label: 'Listeners (%)',
        data: [60, 25, 10, 5],
        backgroundColor: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className="bg-gray-800 p-4 rounded-lg shadow-lg w-full"
    >
      {chartType === 'line' ? (
        <>
          <h3 className="text-lg font-semibold text-center text-white mb-4">Streams Over the Week</h3>
          <Line data={streamingDaysData} />
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-center text-white mb-4">Listener Device Distribution</h3>
          <Bar data={deviceData} />
        </>
      )}
    </motion.div>
  );
};

export default UserDataGraphs;
