// Dashboard.js
import React, { useState } from 'react';
import RamUsageChart from '../components/RamUsageChart';
import CPUUsageChart from '../components/CPUUsageChart';
import HeatMap from '../components/HeatMap';
import ServerTable from '../components/ServerTable';
import CPUPerformance from '../components/CPUPerformance';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedServerId, setSelectedServerId] = useState(1);

  return (
    <div className="dashboard-container">
      <div className="top-row">
        <div className="side-panels1">
          <CPUPerformance usage={72} />
          <CPUUsageChart usage={72} />
        </div>  
        <div className="side-panels2">
          <HeatMap />
        </div>
        <RamUsageChart serverId={selectedServerId} />
      </div>
      <ServerTable />
    </div>
  );
};

export default Dashboard;

