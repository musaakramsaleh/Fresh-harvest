import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal/Modal";
import LoginModal from "./Modal/LoginModal";
import { useAuth } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 z-50 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-gray-900">
            <img className="w-[188px]" src="/job-task.png" alt="Logo" />
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Blog
            </NavLink>
          </div>

          {/* Icons and Authentication */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <div
                className="relative"
                onClick={toggleProfileMenu}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={user.profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </NavLink>
                    {user?.email === "admin@gmail.com" && (
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Register
                </NavLink>
                <button
                  onClick={openModal}
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
            <NavLink
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
              onClick={(e) => e.preventDefault()} // Optional: Prevent any other action
            >
              <FaHeart />
              <span>Favourites</span>
            </NavLink>
            <NavLink
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
            >
              <FaShoppingCart />
              <span>Cart</span>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 ${
            menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about-us"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Blog
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Profile
                </NavLink>
                {user?.email === "admin@gmail.com" && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-500 hover:underline"
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Register
                </NavLink>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openModal();
                  }}
                  className="text-gray-700 hover:text-orange-500 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modalOpen && <LoginModal closeModal={closeModal} handleLogin={login} />}
    </>
  );
};

export default Navbar;
