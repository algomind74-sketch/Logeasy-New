import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { getLogStats } from "../../services/api";

const AnalyticsGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLogStats()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching log analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return <p>No analytics available.</p>;

  const { error_trend, service_error_count } = data;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📊 System Analytics</h2>

      {/* 🔹 Error Trend (Line Graph) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Error Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={error_trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="error_count" stroke="#ff4d4f" name="Error Count" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Error Count by Service (Bar Graph) */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Error Count by Service</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={service_error_count}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="errors" fill="#007bff" name="Errors" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsGraph;