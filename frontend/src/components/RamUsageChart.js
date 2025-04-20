import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './RamUsageChart.css';
import { fetchServerMetrics } from '../services/api';

const RamUsageChart = ({ serverId }) => {
  const [ramData, setRamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetchServerMetrics(serverId)
        .then((data) => {
          console.log("🎯 RAM Chart Data:", data); // check what comes back
          const reversed = [...data].reverse();
          setRamData(reversed);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ RAM Chart Error:", err);
          setError("Failed to load RAM usage data");
          setLoading(false);
        });
    };
  
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [serverId]);
  

  const chartData = {
    labels: ramData.map((m) => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'RAM Usage (%)',
        data: ramData.map((m) => m.ram),
        borderColor: '#008000',
        fill: true,
        backgroundColor: 'rgba(31, 112, 6, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="ram-chart">
      <h3>RAM Usage</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default RamUsageChart;
