import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Brain,
  ShieldCheck,
  Settings,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
    { name: "AI Insights", path: "/insights", icon: <Brain size={20} /> },
    { name: "Compliance", path: "/compliance", icon: <ShieldCheck size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* 🔹 Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40 flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">LogEasy</h1>
          <button
            className="md:hidden p-2 hover:bg-blue-800 rounded-lg"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-300 border-t border-blue-800">
          © 2025 LogEasy
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
