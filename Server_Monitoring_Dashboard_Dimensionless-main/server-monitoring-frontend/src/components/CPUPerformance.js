import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import './CPUPerformance.css';
import { fetchServerMetrics } from '../services/api';

const CPUPerformance = ({ serverId }) => {
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await fetchServerMetrics(serverId);
        console.log("Fetched CPU Metrics:", metrics);

        let cpuValue = 0;

        // Check if metrics is valid and has CPU value
        if (Array.isArray(metrics) && metrics.length > 0 && metrics[0].cpu !== undefined) {
          cpuValue = Number(metrics[0].cpu);
          console.log("Parsed CPU Value:", cpuValue);
        } else {
          console.warn("Invalid or missing CPU data. Falling back to dummy value.");
          cpuValue = Math.floor(Math.random() * 100); // fallback to random % for testing
        }

        setUsage(isNaN(cpuValue) ? 0 : cpuValue);
      } catch (err) {
        console.error("Failed to fetch CPU metrics:", err);
        // fallback if fetch fails
        setUsage(Math.floor(Math.random() * 100));
      }
    };

    fetchData(); // initial fetch
    const interval = setInterval(fetchData, 20000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, [serverId]);

  const getStatusDetails = (value) => {
    if (value < 50) {
      return { text: 'Usage', color: '#4caf50', range: '0% - 49%' };
    } else if (value < 80) {
      return { text: 'Usage', color: '#ff9001', range: '50% - 79%' };
    } else {
      return { text: 'Usage', color: '#f44336', range: '80% - 100%' };
    }
  };

  const { text, color, range } = getStatusDetails(usage);
  const percent = usage / 100;

  return (
    <div className="cpu-performance-container">
      <h3>CPU Performance</h3>
      <GaugeChart
        id="cpu-gauge"
        nrOfLevels={30}
        arcsLength={[0.5, 0.3, 0.2]}
        colors={['#4caf50', '#ff9001', '#f44336']}
        percent={percent}
        arcPadding={0.02}
        cornerRadius={3}
        textColor="#000"
        needleColor="#444"
        needleBaseColor="#888"
      />
      <div className="cpu-performance-info">
        <div className="cpu-performance-usage">
          <strong>{usage.toFixed(1)}%</strong>
        </div>
        <div className="cpu-performance-status" style={{ color }}>
          <div className="status-text">
            <strong>{text}</strong> <span className="range">({range})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPUPerformance;
