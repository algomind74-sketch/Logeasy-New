import React from "react";

import LogsTable from "../components/Dashboard/LogsTable";

import AIInsights from "../components/Dashboard/AIInsights";

import AnalyticsGraph from "../components/Dashboard/AnalyticsGraph"; // ⬅ Add this line



const Dashboard = () => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

      {/* 🔹 Left side: Logs table */}

      <LogsTable />



      {/* 🔹 Right side: AI Insights and Graph stacked */}

      <div className="flex flex-col gap-4">

        <AIInsights />

        <AnalyticsGraph />  {/* ⬅ Add this below AI Insights */}

      </div>

    </div>

  );

};



export default Dashboard;