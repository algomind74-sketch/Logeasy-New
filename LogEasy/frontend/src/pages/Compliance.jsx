import React, { useEffect, useState } from "react";
import axios from "axios";

const Compliance = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/compliance/status")
      .then((res) => setStatus(res.data))
      .catch((err) => console.error("Error fetching compliance data:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Compliance Overview</h1>

      {!status ? (
        <p>Loading compliance data...</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700">Current Compliance Status</h2>
          <ul className="mt-4 space-y-2">
            <li><strong>Last Audit:</strong> {status.last_audit}</li>
            <li><strong>Compliant Systems:</strong> {status.compliant_systems}</li>
            <li><strong>Non-Compliant Systems:</strong> {status.non_compliant_systems}</li>
            <li><strong>Overall Status:</strong> {status.overall_status}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Compliance;
