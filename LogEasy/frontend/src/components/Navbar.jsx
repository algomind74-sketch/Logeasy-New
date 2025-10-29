import React from "react";
import { Menu } from "lucide-react"; // for hamburger icon

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 md:px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-30">
      {/* 🔹 Left Section — Menu Button (mobile) + Logo */}
      <div className="flex items-center space-x-3">
        {/* Hamburger icon (only visible on mobile) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none transition"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo192.png" // change path if needed
            alt="LogEasy"
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-bold tracking-wide">LogEasy</h1>
        </div>
      </div>

      {/* 🔹 Right Section — Nav Buttons */}
      <div className="hidden md:flex space-x-6 items-center">
        <button className="hover:text-blue-200 transition duration-200 font-medium">
          Docs
        </button>
        <button className="hover:text-blue-200 transition duration-200 font-medium">
          Support
        </button>

        <button className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition duration-200 shadow-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
