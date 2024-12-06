import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import {
  FaUser,
  FaCog,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaProductHunt,
} from "react-icons/fa"; // Import icons

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-80" : "w-20"
        } bg-white border-r-4 border-[#FF6A1A] flex flex-col justify-between transition-all duration-300`}
      >
        {/* Top Section */}
        <div className="p-4">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="mb-6 text-gray-700 hover:text-[#FF6A1A] transition-all"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Branding */}
          <div
            className={`flex items-center space-x-3 mb-10 ${
              !isOpen && "justify-center"
            }`}
          >
            {isOpen && <img className="" src="/job-task.png" alt="Logo" />}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-lg ${
                  isActive ? "bg-[#FF6A1A] text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaProductHunt />
              {isOpen && <span>Create Product</span>}
            </NavLink>
            <NavLink
              to="/dashboard/productlist"
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-lg ${
                  isActive ? "bg-[#FF6A1A] text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaCog />
              {isOpen && <span>All Products</span>}
            </NavLink>
            <NavLink
              to="/dashboard/dcd"
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-lg ${
                  isActive ? "bg-[#FF6A1A] text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaFileAlt />
              {isOpen && <span>Reports</span>}
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-gray-200 ${
              !isOpen && "justify-center"
            }`}
          >
            <FaHome />
            {isOpen && <span>Home</span>}
          </Link>
          <button
            onClick={logout}
            className={`mt-4 flex items-center gap-4 py-2 px-4 rounded-lg bg-[#FF6A1A] hover:bg-[#e65b14] text-white w-full ${
              !isOpen && "justify-center"
            }`}
          >
            <FaSignOutAlt />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
