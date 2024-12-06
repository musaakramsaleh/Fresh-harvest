import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
// Adjust the import path to your project structure

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get user and loading state from the AuthContext
  const location = useLocation(); // Get the current location

  // Show a loading spinner while loading user data
  if (loading) {
    return (
      <div className="max-w-1440 mx-auto flex justify-center items-center mt-4">
        <span className="loading loading-spinner loading-lg text-center"></span>
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the children components
  return children;
};

export default PrivateRoute;
