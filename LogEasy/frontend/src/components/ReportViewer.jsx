import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportViewer = () => {
  const [reports, setReports] = useState([]);

  // Fetch list of reports
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reports/list")
      .then((response) => {
        setReports(response.data.reports);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

  // Function to download PDF report
  const downloadReport = (filename) => {
    axios({
      url: `http://127.0.0.1:8000/reports/download/${encodeURIComponent(filename)}`,
      method: "GET",
      responseType: "blob", // important for binary data
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Clean and safe filename
        const safeFilename = `${filename.replace(/\s+/g, "_")}.pdf`;

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", safeFilename);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        alert("Failed to download report. Check backend connection.");
      });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📄 Generated Reports</h2>
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-3"
        >
          <div>
            <h3 className="font-semibold text-lg">{report.name}</h3>
            <p className="text-sm text-gray-500">
              Created on: {report.created_at}
            </p>
          </div>
          <button
            onClick={() => downloadReport(report.name)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportViewer;
