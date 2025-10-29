import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default React.memo(Header);
