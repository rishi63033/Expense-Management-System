import { NavLink } from "react-router-dom";
import React from "react";

function Sidebar() {
  const navItem = ({ isActive }) =>
    `block py-2.5 px-4 rounded transition ${
      isActive
        ? "bg-blue-600 text-white font-semibold shadow-sm" 
        : "text-gray-700 hover:bg-blue-500 hover:text-white" 
    }`;

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-5">
      <h2 className="text-xl font-bold text-gray-700 mb-6">EMS</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard/Profile" className={navItem}>
          Profile
        </NavLink>
        <NavLink to="/dashboard/expenses" className={navItem}>
          Expenses
        </NavLink>
        <NavLink to="/dashboard/income" className={navItem}>
          Income
        </NavLink>
        <NavLink to="/dashboard/summary" className={navItem}>
          Summary
        </NavLink>
      </nav>
    </aside>
  );
}

export default React.memo(Sidebar);
