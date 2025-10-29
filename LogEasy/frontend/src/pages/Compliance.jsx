import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldCheck, AlertTriangle, FileText } from "lucide-react";

const Compliance = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/compliance/status")
      .then((res) => setStatus(res.data))
      .catch((err) => console.error("Error fetching compliance data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-600 animate-pulse">
        <p>Loading compliance data...</p>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="p-6 text-red-600">
        <p>❌ Failed to load compliance data.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck size={26} className="text-green-600" />
            Compliance Overview
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Monitor your system’s compliance status and generate reports for audits.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition">
          <FileText size={18} />
          Generate Report
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        <StatusCard
          title="Last Audit"
          value={status.last_audit}
          color="text-gray-700"
          icon={<FileText className="text-gray-500" size={22} />}
        />
        <StatusCard
          title="Compliant Systems"
          value={status.compliant_systems}
          color="text-green-600"
          icon={<ShieldCheck className="text-green-500" size={22} />}
        />
        <StatusCard
          title="Non-Compliant Systems"
          value={status.non_compliant_systems}
          color="text-red-600"
          icon={<AlertTriangle className="text-red-500" size={22} />}
        />
        <StatusCard
          title="Overall Status"
          value={status.overall_status}
          color={
            status.overall_status === "Compliant"
              ? "text-green-600"
              : "text-red-600"
          }
          icon={
            status.overall_status === "Compliant" ? (
              <ShieldCheck className="text-green-500" size={22} />
            ) : (
              <AlertTriangle className="text-red-500" size={22} />
            )
          }
        />
      </div>

      {/* Detailed Info */}
      <div className="bg-white mt-8 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📋 Detailed Compliance Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The system currently has{" "}
          <span className="font-semibold text-green-600">
            {status.compliant_systems}
          </span>{" "}
          compliant systems and{" "}
          <span className="font-semibold text-red-600">
            {status.non_compliant_systems}
          </span>{" "}
          non-compliant systems. The last audit was conducted on{" "}
          <span className="font-semibold text-gray-700">
            {status.last_audit}
          </span>
          . Overall system status:{" "}
          <span
            className={`font-bold ${
              status.overall_status === "Compliant"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status.overall_status}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

// 🔹 Reusable Card Component
const StatusCard = ({ title, value, color, icon }) => (
  <div className="flex flex-col items-center justify-center border rounded-lg p-5 bg-gray-50 shadow-sm hover:shadow-md transition">
    <div className="mb-2">{icon}</div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Compliance;
