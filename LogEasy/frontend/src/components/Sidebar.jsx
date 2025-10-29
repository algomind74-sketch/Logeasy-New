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
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
    { name: "AI Insights", path: "/insights", icon: <Brain size={20} /> },
    { name: "Compliance", path: "/compliance", icon: <ShieldCheck size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40 flex flex-col justify-between`}
      >
        <div className="p-5 flex items-center justify-between border-b border-blue-800">
          <h1 className="text-xl font-bold">LogEasy</h1>
          <button
            className="md:hidden p-2 hover:bg-blue-800 rounded-lg"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 text-sm text-gray-300 border-t border-blue-800 text-center">
          © 2025 LogEasy
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
