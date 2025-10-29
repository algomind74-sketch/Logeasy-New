import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import Compliance from "./pages/Compliance";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LogsTable from "./components/Dashboard/LogsTable"; // ✅ Corrected import (case-sensitive)
import AllInsights from "./components/Dashboard/AIInsights.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar (fixed on md+, sliding on mobile) */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Navbar */}
          <Navbar onMenuClick={() => setIsSidebarOpen((s) => !s)} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/logs" element={<LogsTable />} /> {/* ✅ Added Logs page */}
              <Route path="/insights" element={<AllInsights />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
