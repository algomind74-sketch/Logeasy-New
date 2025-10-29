import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Loading analytics...
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        No analytics available.
      </div>
    );

  const { error_trend, service_error_count } = data;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📊 System Analytics
      </h2>

      {/* 🔹 Error Trend (Line Graph) */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Error Trend Over Time
        </h3>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={error_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="error_count"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                name="Error Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Error Count by Service (Bar Graph) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Error Count by Service
        </h3>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={service_error_count}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="service" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <Legend />
              <Bar
                dataKey="errors"
                fill="#3b82f6"
                name="Errors"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
