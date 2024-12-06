import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for authentication
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
const useAuth = () => {
  return React.useContext(AuthContext);
};

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null); // Store the user data

  // Check if there's a token in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token); // Set the token in the state if it's found
      fetchUserProfile(token); // Fetch user profile when the token is found
    }
  }, []);

  // Function to fetch user profile from the server
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(
        "https://test-2-tan-chi.vercel.app/api/v1/auth/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        setUser(response.data.data); // Set the user data in the state
      } else {
        console.error("Failed to fetch user profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function to log in and set the token
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    fetchUserProfile(token); // Fetch user profile on login
  };

  // Function to log out and remove the token
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null); // Clear user data on logout
  };
  console.log(user);
  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
