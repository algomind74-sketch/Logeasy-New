import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/logs/stats")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to fetch log stats"));
  }, []);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div className="p-6 text-gray-600">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Dashboard Overview
      </h1>

      {/* ====== Stats Cards ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Logs</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.total_logs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
          <h2 className="text-lg font-semibold text-gray-700">Error Logs</h2>
          <p className="text-3xl font-bold text-red-500">{stats.error_logs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.active_users}
          </p>
        </div>
      </div>

      {/* ====== Error Trend (Line Chart) ====== */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📈 Error Trend (Recent Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.error_trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="error_count"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ====== Service Error Count (Bar Chart) ====== */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          🧱 Errors by Service
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.service_error_count}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="errors" fill="#3b82f6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
