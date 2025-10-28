import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportViewer = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reports/list")
      .then((res) => {
        console.log("Fetched reports:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.reports || [];

        setReports(data);
      })
      .catch((err) => console.error("Error fetching reports:", err))
      .finally(() => setLoading(false));
  }, []);

  const downloadReport = (filename) => {
    axios({
      url: `http://127.0.0.1:8000/reports/download/${filename}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error("Download error:", err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 Generated Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports found. Try generating one.</p>
      ) : (
        <ul className="space-y-2">
          {reports.map((r, i) => (
            <li
              key={r.id || i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
            >
              <span>{r.name}</span>
              <button
                onClick={() => downloadReport(r.name)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportViewer;
