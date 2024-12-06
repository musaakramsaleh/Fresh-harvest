import React from "react";
import { Link } from "react-router-dom"; // To navigate back to home or other pages

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h1 className="text-6xl text-red-500 font-bold">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">
          It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-[#FF6A1A] text-white rounded-lg hover:bg-[#FF5733] transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
