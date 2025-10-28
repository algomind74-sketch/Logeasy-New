import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportViewer = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/reports/list")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const downloadReport = (filename) => {
    axios({
      url: `http://127.0.0.1:8000/reports/download/${filename}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 Generated Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found. Try generating one.</p>
      ) : (
        <ul className="space-y-2">
          {reports.map((r, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
            >
              <span>{r}</span>
              <button
                onClick={() => downloadReport(r)}
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
