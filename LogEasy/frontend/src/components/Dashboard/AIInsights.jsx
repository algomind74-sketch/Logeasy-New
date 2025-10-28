import React, { useEffect, useState } from "react";
import { getInsights } from "../../services/api";

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch AI-generated insights from backend
    getInsights()
      .then((res) => {
        setInsights(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching insights:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading AI insights...</p>;
  if (!insights) return <p>No insights available.</p>;

  const { summary, sample_predictions, anomalies } = insights;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🧠 AI Insights</h2>

      {/* 🧾 Summary Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Log Summary</h3>
        <ul className="list-disc ml-6">
          <li>Total Logs: {summary?.total_logs}</li>
          <li>Levels: {JSON.stringify(summary?.levels)}</li>
          <li>Top Services: {JSON.stringify(summary?.top_services)}</li>
        </ul>
      </div>

      {/* 🤖 Predictions Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Predicted Log Levels</h3>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Predicted Level</th>
            </tr>
          </thead>
          <tbody>
            {sample_predictions?.map((log, idx) => (
              <tr key={idx} className="border-t">
                <td className="border p-2">{log.timestamp}</td>
                <td className="border p-2">{log.service}</td>
                <td className="border p-2">{log.message}</td>
                <td className="border p-2 font-semibold text-blue-600">
                  {log.predicted_level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⚠ Anomalies Section */}
      <div>
        <h3 className="text-lg font-semibold">Detected Anomalies</h3>
        {anomalies?.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Timestamp</th>
                <th className="border p-2">Service</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Latency</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((a, idx) => (
                <tr key={idx} className="border-t bg-red-50">
                  <td className="border p-2">{a.timestamp}</td>
                  <td className="border p-2">{a.service}</td>
                  <td className="border p-2">{a.message}</td>
                  <td className="border p-2">{a.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-green-600 mt-2">✅ No anomalies detected.</p>
        )}
      </div>
    </div>
  );
};

export default AIInsights;