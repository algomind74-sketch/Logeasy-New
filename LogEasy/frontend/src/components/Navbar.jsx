import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo192.png" // or your own logo path
          alt="LogEasy"
          className="h-8 w-8"
        />
        <h1 className="text-2xl font-bold tracking-wide">LogEasy</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
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

