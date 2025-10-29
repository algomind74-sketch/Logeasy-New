import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/logs/stats")
      .then((res) => setStats(res.data))
      .catch((err) => setError("Failed to fetch log stats"));
  }, []);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div className="p-6 text-gray-600">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Logs</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.total_logs}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Error Logs</h2>
          <p className="text-2xl font-bold text-red-500">{stats.error_logs}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-2xl font-bold text-green-600">{stats.active_users}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Error Trend (Recent Days)</h2>
        <ul>
          {stats.error_trend.map((e, index) => (
            <li key={index} className="border-b py-2 flex justify-between">
              <span>{e.timestamp}</span>
              <span className="font-medium">{e.error_count} errors</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
