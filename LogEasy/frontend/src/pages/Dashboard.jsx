import React from "react";
import LogsTable from "../components/Dashboard/LogsTable";
import AnalyticsGraph from "../components/Dashboard/AnalyticsGraph";
import RealtimeStatus from "../components/Dashboard/RealtimeStatus";
import AIInsights from "../components/Dashboard/AIInsights";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RealtimeStatus />
      <AnalyticsGraph />
      <LogsTable />
      <AIInsights />
    </div>
  );
};

export default Dashboard;
