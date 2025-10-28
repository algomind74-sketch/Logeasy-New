import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">LogEasy Dashboard</h1>

      <div className="space-x-4">
        <button className="hover:text-blue-400 transition">Docs</button>
        <button className="hover:text-blue-400 transition">Support</button>
        <button className="hover:text-blue-400 transition">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
