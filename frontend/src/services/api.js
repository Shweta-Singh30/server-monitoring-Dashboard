import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAlerts = () =>
  axios.get(`${BASE_URL}/api/alerts/`).then(res => res.data);

export const fetchServerMetrics = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/metrics/${id}`);
    console.log('📊 Metrics fetched for server:', id, response.data);  // 🔍 LOG HERE
    return response.data;
  } catch (error) {
    console.error('❌ Error in fetchServerMetrics:', error);  // 🔥 ERROR LOG HERE
    throw error; // this ensures your component catches it too
  }
};

export const fetchServers = () => {
  const url = `${BASE_URL}/api/servers`;
  return axios.get(url)
    .then(res => {
      console.log("✅ API response:", res.data);
      return Array.isArray(res.data) ? res.data : res.data.servers || [];
    })
    .catch(err => {
      console.error("❌ Failed to fetch servers:", err);
      return [];
    });
};
