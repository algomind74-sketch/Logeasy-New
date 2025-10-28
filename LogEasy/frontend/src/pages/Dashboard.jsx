import React from "react";
import LogsTable from "../components/Dashboard/LogsTable";
import AnalyticsGraph from "../components/Dashboard/AnalyticsGraph";
import RealtimeStatus from "../components/Dashboard/RealtimeStatus";
import AIInsights from "../components/Dashboard/AIInsights";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          LogEasy Dashboard
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <RealtimeStatus />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <AnalyticsGraph />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <LogsTable />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

