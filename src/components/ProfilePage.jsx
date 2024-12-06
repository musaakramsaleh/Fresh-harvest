import React, { useState } from "react";
import { useAuth } from "../Provider/AuthProvider"; // Adjust the import path
import dayjs from "dayjs"; // Install dayjs for date formatting
import LoadingSpinner from "./shared/LoadingSpinner";

const ProfilePage = () => {
  const { user, loading, authToken } = useAuth(); // Destructure authToken from useAuth
  const [oldPassword, setOldPassword] = useState(""); // State for old password
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for password confirmation
  const [message, setMessage] = useState(""); // State for error or success message

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="pt-20 text-center text-gray-600">
        No user data available
      </div>
    );
  }

  // Handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const response = await fetch(
      "https://api-fresh-harvest.code-commando.com/api/v1/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken, // Pass token in Authorization header
        },
        body: JSON.stringify({ oldPassword, newPassword }), // Send old and new passwords
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Password changed successfully!");
    } else {
      setMessage(data.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Welcome, {user.name || "User"}
      </h1>

      <div className="flex flex-col items-center mb-6">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 text-gray-500 rounded-full flex justify-center items-center">
            <span className="text-4xl font-bold">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Phone:</span>
          <span className="text-gray-800">
            {user.phoneNumber || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Username:</span>
          <span className="text-gray-800">
            {user.userName || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">User ID:</span>
          <span className="text-gray-800">{user.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Created At:</span>
          <span className="text-gray-800">
            {dayjs(user.createdAt).format("DD MMM YYYY, hh:mm A")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Updated At:</span>
          <span className="text-gray-800">
            {dayjs(user.updatedAt).format("DD MMM YYYY, hh:mm A")}
          </span>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Change Password
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Old Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600">New Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {message && (
            <div className="text-center mt-4 text-red-500">{message}</div>
          )}
          <div className="mt-4">
            <button
              onClick={handleChangePassword}
              className="w-full p-2 bg-[#FF6A1A] text-white rounded-md hover:bg-[#FF471A]"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
