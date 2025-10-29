import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import Compliance from "./pages/Compliance";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar with Sidebar toggle */}
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Main page area */}
          <main className="p-4 md:p-6 overflow-y-auto flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/compliance" element={<Compliance />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;