import React from "react";
import ReportViewer from "../components/ReportViewer";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Reports Section</h1>
      <p className="text-gray-600 mb-6">
        Below are your automatically generated log reports. You can view or download them anytime.
      </p>
      <ReportViewer />
    </div>
  );
};

export default Reports;
