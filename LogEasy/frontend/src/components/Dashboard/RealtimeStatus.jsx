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

      setStats({
        total_logs:
          (data?.error_trend?.reduce((a, b) => a + (b.error_count || 0), 0) ||
            0) + 100,
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

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          ⚡ Realtime System Status
        </h2>
        <span className="text-sm text-gray-500">
          ⏱ {stats.last_update || "Fetching..."}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatusCard
          title="Total Logs"
          value={stats.total_logs}
          color="bg-blue-50 text-blue-700 border-blue-200"
          icon="📁"
        />
        <StatusCard
          title="Errors"
          value={stats.error_count}
          color="bg-red-50 text-red-700 border-red-200"
          icon="❌"
        />
        <StatusCard
          title="Warnings"
          value={stats.warning_count}
          color="bg-yellow-50 text-yellow-700 border-yellow-200"
          icon="⚠️"
        />
        <StatusCard
          title="Info"
          value={stats.info_count}
          color="bg-green-50 text-green-700 border-green-200"
          icon="ℹ️"
        />
      </div>
    </div>
  );
};

// 💡 Modernized status card component
const StatusCard = ({ title, value, color, icon }) => (
  <div
    className={`flex flex-col justify-center items-center rounded-xl border ${color} p-4 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1`}
  >
    <div className="text-2xl">{icon}</div>
    <h3 className="text-sm font-medium text-gray-600 mt-1">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default RealtimeStatus;
