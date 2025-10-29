import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center px-6 py-3">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <Menu size={22} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
          LogEasy
        </h1>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-blue-700 transition">
          Docs
        </button>
        <button className="text-gray-600 hover:text-blue-700 transition">
          Support
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
