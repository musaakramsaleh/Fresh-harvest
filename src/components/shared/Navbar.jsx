import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal/Modal";
import LoginModal from "./Modal/LoginModal";
import { useAuth } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Profile menu state
  const { authToken, user, login, logout } = useAuth(); // Access auth context

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleLogin = (token) => {
    login(token);
    setModalOpen(false); // Close modal on login
  };

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 z-50 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="">
            <NavLink to="/" className="text-gray-900">
              <img className="w-[188px]" src="/job-task.png" alt="" />
            </NavLink>
          </div>

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
              to="/product"
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
              // If user is logged in, show profile image and dropdown menu
              <>
                <div
                  className="relative"
                  onClick={toggleProfileMenu}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={user.profileImage || "/default-profile.png"} // Add fallback image if profileImage is not available
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
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // If user is not logged in, show the login button
              <button
                onClick={openModal}
                className="text-gray-700 hover:text-orange-500 hover:underline"
              >
                Sign In
              </button>
            )}
            <NavLink
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
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
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              <FaHeart />
              <span>Favourites</span>
            </NavLink>
            <NavLink
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </NavLink>
            {!user && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openModal();
                }}
                className="text-gray-700 hover:text-orange-500 hover:underline"
              >
                Sign In
              </button>
            )}
            {user && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="text-gray-700 hover:text-orange-500 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modalOpen && (
        <LoginModal closeModal={closeModal} handleLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
