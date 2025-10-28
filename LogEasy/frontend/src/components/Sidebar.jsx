import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reports", path: "/reports" },
    { name: "Compliance", path: "/compliance" },
  ];

  return (
    <aside className="bg-gray-900 text-white h-screen w-60 flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">📊 LogEasy</h2>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-700 transition ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
