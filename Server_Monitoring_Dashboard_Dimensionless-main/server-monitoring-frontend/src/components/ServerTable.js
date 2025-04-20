import React, { useState, useEffect } from 'react';
import './ServerTable.css';

// Static server data
const staticServers = [
  {
    id: 1,
    name: 'Server 1',
    status: 'Running',
    ip_address: '192.168.1.1',
    location: 'New York',
    created_at: '2024-04-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Server 2',
    status: 'Down',
    ip_address: '192.168.1.2',
    location: 'California',
    created_at: '2024-04-10T09:00:00Z'
  },
  {
    id: 3,
    name: 'Server 3',
    status: 'Running',
    ip_address: '192.168.1.3',
    location: 'Texas',
    created_at: '2024-04-20T14:00:00Z'
  },
  {
    id: 4,
    name: 'Server 4',
    status: 'Running',
    ip_address: '192.168.1.4',
    location: 'Florida',
    created_at: '2024-04-18T16:30:00Z'
  },
  {
    id: 5,
    name: 'Server 5',
    status: 'Down',
    ip_address: '192.168.1.5',
    location: 'Nevada',
    created_at: '2024-04-14T08:45:00Z'
  },
  {
    id: 6,
    name: 'Server 6',
    status: 'Running',
    ip_address: '192.168.1.6',
    location: 'Ohio',
    created_at: '2024-04-12T13:10:00Z'
  }
];

const ServerTable = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Use static data instead of fetching from API
    setServers(staticServers);
  }, []); // Empty dependency array to only run once when the component mounts

  return (
    <div className="server-table-container">
      <h2 className="server-table-containerh2">Active Instances</h2>
      <div className="server-table">
        <div className="table-header">
          <div>Name</div>
          <div>Status</div>
          <div>IP Address</div>
          <div>Location</div>
          <div>Created</div>
        </div>

        {servers.map((server) => (
          <div className="table-row" key={server.id}>
            <div>{server.name}</div>
            <div className={`status ${server.status.toLowerCase()}`}>{server.status}</div>
            <div>{server.ip_address}</div>
            <div>{server.location}</div>
            <div>{new Date(server.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerTable;
