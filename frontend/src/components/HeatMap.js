import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import './HeatMap.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const HeatMap = () => {
  const [summary, setSummary] = useState({ clear: 0, trouble: 0, critical: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/api/alerts/summary")
      .then(res => res.json())
      .then(data => {
        setSummary({
          clear: data.clear || 0,
          trouble: data.trouble || 0,
          critical: data.critical || 0,
        });
      })
      .catch(err => console.error("Failed to fetch alert summary:", err));
  }, []);

  const data = {
    labels: ['Clear', 'Trouble', 'Critical'],
    datasets: [
      {
        data: [summary.clear, summary.trouble, summary.critical],
        backgroundColor: ['#00c04b', '#ff9800', '#f44336'],
        hoverBackgroundColor: ['#00c9a7', '#FFDE21', '#800000'],
      },
    ],
  };

  return (
    <div className="heatmap-container">
      <h3 className="heatmap-title">Heat Map</h3>
      {summary.clear + summary.trouble + summary.critical === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>No alerts to display</p>
      ) : (
        <Doughnut data={data} />
      )}
    </div>
  );
};

export default HeatMap;
