import React, { useEffect, useState } from "react";
import { getInsights } from "../../services/api";

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading)
    return (
      <div className="flex justify-center items-center text-gray-500 py-8">
        Loading AI insights...
      </div>
    );
  if (!insights)
    return (
      <div className="flex justify-center items-center text-gray-500 py-8">
        No insights available.
      </div>
    );

  const { summary, sample_predictions, anomalies } = insights;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        🧠 AI Insights
      </h2>

      {/* 🧾 Summary Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Log Summary
        </h3>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <ul className="space-y-1 text-gray-700">
            <li>
              <strong>Total Logs:</strong> {summary?.total_logs || 0}
            </li>
            <li>
              <strong>Levels:</strong>{" "}
              {summary?.levels
                ? Object.entries(summary.levels)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ")
                : "N/A"}
            </li>
            <li>
              <strong>Top Services:</strong>{" "}
              {summary?.top_services
                ? summary.top_services.join(", ")
                : "N/A"}
            </li>
          </ul>
        </div>
      </section>

      {/* 🤖 Predictions Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Predicted Log Levels
        </h3>
        {sample_predictions?.length > 0 ? (
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="p-3 border-b">Timestamp</th>
                  <th className="p-3 border-b">Service</th>
                  <th className="p-3 border-b">Message</th>
                  <th className="p-3 border-b">Predicted Level</th>
                </tr>
              </thead>
              <tbody>
                {sample_predictions.map((log, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition border-b border-gray-100"
                  >
                    <td className="p-3">{log.timestamp}</td>
                    <td className="p-3">{log.service}</td>
                    <td className="p-3 text-gray-700">{log.message}</td>
                    <td className="p-3 font-semibold text-blue-600">
                      {log.predicted_level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No prediction data available.</p>
        )}
      </section>

      {/* ⚠️ Anomalies Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Detected Anomalies
        </h3>
        {anomalies?.length > 0 ? (
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-red-50 text-red-700">
                  <th className="p-3 border-b">Timestamp</th>
                  <th className="p-3 border-b">Service</th>
                  <th className="p-3 border-b">Message</th>
                  <th className="p-3 border-b">Latency</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((a, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-red-50/70 transition"
                  >
                    <td className="p-3">{a.timestamp}</td>
                    <td className="p-3">{a.service}</td>
                    <td className="p-3 text-gray-700">{a.message}</td>
                    <td className="p-3 text-red-600 font-semibold">
                      {a.latency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-green-600 mt-2 font-medium">
            ✅ No anomalies detected.
          </p>
        )}
      </section>
    </div>
  );
};

export default AIInsights;
