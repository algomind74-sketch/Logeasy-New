import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all logs initially
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/logs");
        setLogs(response.data || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError("Failed to load logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // 🔹 Handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      if (search.trim() === "") {
        const response = await axios.get("http://127.0.0.1:8000/logs");
        setLogs(response.data || []);
      } else {
        const response = await axios.get(
          `http://127.0.0.1:8000/logs/search?keyword=${search}`
        );
        setLogs(response.data || []);
      }
    } catch (error) {
      console.error("Error searching logs:", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filter by log level
  const filteredLogs =
    filter === "ALL" ? logs : logs.filter((log) => log.level === filter);

  if (loading)
    return (
      <div className="flex justify-center items-center text-gray-500 py-8">
        Loading logs...
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          🧾 System Logs
        </h2>

        <div className="flex gap-2">
          {/* 🔍 Search bar */}
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>

          {/* ⚙️ Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="ALL">All</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
          </select>
        </div>
      </div>

      {/* ⚠️ Error message */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-50 text-blue-700 text-left font-semibold">
              <th className="px-4 py-3 border-b border-gray-200">Timestamp</th>
              <th className="px-4 py-3 border-b border-gray-200">Service</th>
              <th className="px-4 py-3 border-b border-gray-200">Level</th>
              <th className="px-4 py-3 border-b border-gray-200">Message</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log, index) => (
              <tr
                key={index}
                className={`transition hover:bg-gray-50 ${
                  log.level === "ERROR"
                    ? "bg-red-50/70"
                    : log.level === "WARNING"
                    ? "bg-yellow-50/70"
                    : ""
                }`}
              >
                <td className="px-4 py-2 border-b border-gray-100 text-gray-700">
                  {log.timestamp || log.created_at || "--"}
                </td>
                <td className="px-4 py-2 border-b border-gray-100 text-gray-700">
                  {log.service || "Unknown"}
                </td>
                <td
                  className={`px-4 py-2 border-b border-gray-100 font-semibold ${
                    log.level === "ERROR"
                      ? "text-red-600"
                      : log.level === "WARNING"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {log.level}
                </td>
                <td className="px-4 py-2 border-b border-gray-100 text-gray-700">
                  {log.message}
                </td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No logs found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-4">
        Showing {filteredLogs.length} of {logs.length} total logs.
      </p>
    </div>
  );
};

export default LogsTable;
