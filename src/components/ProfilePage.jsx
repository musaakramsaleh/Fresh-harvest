import React from "react";
import { useAuth } from "../Provider/AuthProvider"; // Adjust the import path
import dayjs from "dayjs"; // Install dayjs for date formatting

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container pt-10 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-20 text-center text-gray-600">
        No user data available
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
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
    </div>
  );
};

export default ProfilePage;
