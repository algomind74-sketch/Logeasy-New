import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Fetch logs from backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/logs");
        setLogs(response.data || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Filter logs based on level
  const filteredLogs =
    filter === "ALL" ? logs : logs.filter((log) => log.level === filter);

  if (loading) return <div className="text-gray-600">Loading logs...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">System Logs</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none"
        >
          <option value="ALL">All</option>
          <option value="INFO">Info</option>
          <option value="WARNING">Warning</option>
          <option value="ERROR">Error</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Level</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr
                key={index}
                className={`border-b text-sm ${
                  log.level === "ERROR"
                    ? "bg-red-50"
                    : log.level === "WARNING"
                    ? "bg-yellow-50"
                    : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{log.timestamp || log.created_at}</td>
                <td className="px-4 py-2">{log.service || "Unknown"}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    log.level === "ERROR"
                      ? "text-red-600"
                      : log.level === "WARNING"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {log.level}
                </td>
                <td className="px-4 py-2">{log.message}</td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No logs found for this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;
