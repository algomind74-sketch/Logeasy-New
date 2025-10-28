import React, { useEffect, useState } from "react";
import axios from "axios";

const RealtimeStatus = () => {
  const [stats, setStats] = useState({
    total_logs: 0,
    error_count: 0,
    warning_count: 0,
    info_count: 0,
    last_update: null,
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/logs/stats");
      const data = response.data;

      // 🧠 Mock structure adjustment
      setStats({
        total_logs:
          (data?.error_trend?.reduce((a, b) => a + (b.error_count || 0), 0) ||
            0) + 100, // just demo sum
        error_count:
          data?.service_error_count?.reduce(
            (a, b) => a + (b.errors || 0),
            0
          ) || 0,
        warning_count: Math.floor(Math.random() * 30),
        info_count: Math.floor(Math.random() * 50),
        last_update: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error("Failed to fetch real-time stats:", err);
    }
  };

  // Fetch every 5 seconds
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Realtime System Status
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatusCard
          title="Total Logs"
          value={stats.total_logs}
          color="text-blue-600"
        />
        <StatusCard
          title="Errors"
          value={stats.error_count}
          color="text-red-600"
        />
        <StatusCard
          title="Warnings"
          value={stats.warning_count}
          color="text-yellow-600"
        />
        <StatusCard
          title="Info"
          value={stats.info_count}
          color="text-green-600"
        />
      </div>

      <p className="text-sm text-gray-500 mt-4">
        ⏱ Last Updated: {stats.last_update || "Fetching..."}
      </p>
    </div>
  );
};

// Small reusable card component
const StatusCard = ({ title, value, color }) => (
  <div className="flex flex-col items-center justify-center border rounded-lg p-3 shadow-sm bg-gray-50">
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default RealtimeStatus;
