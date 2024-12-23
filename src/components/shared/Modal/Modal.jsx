import React, { useRef, useState } from "react";
import axios from "axios";

const Modal = ({ closeModal }) => {
  const modalRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(null);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle show/hide password toggle
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle modal close
  const onClose = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Check if fullname is present in the formData

    setError("");
    setSuccess("");

    // Basic validation for empty fields
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://test-2-tan-chi.vercel.app/api/v1/users/register",
        formData
      );

      if (response.data.success) {
        setSuccess(response.data.message); // Success message from the API response
        setUserData(response.data.data); // Set user data from the response
        setFormData({ fullName: "", email: "", password: "" }); // Clear form
      }
    } catch (err) {
      // Check for specific validation error messages and display them
      if (err.response?.data?.errorSources) {
        const validationError = err.response.data.errorSources
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ");
        setError(validationError); // Show validation error messages from the API
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center font-Poppins"
    >
      <div className="bg-white max-w-lg w-full h-auto overflow-y-auto rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between w-full bg-primary p-4">
          <h1 className="text-lg lg:text-2xl font-semibold text-black">
            Register
          </h1>
          <button onClick={closeModal} className="text-black text-xl">
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4 w-full" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            className="p-4 border-2 border-gray-200 outline-none rounded-lg w-full"
            name="fullName"
            type="text"
            value={formData.fullname}
            onChange={handleInputChange}
            placeholder="Full Name*"
          />

          {/* Email */}
          <input
            className="p-4 border-2 border-gray-200 outline-none rounded-lg w-full"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email*"
          />

          {/* Password with show/hide functionality */}
          <div className="relative">
            <input
              className="p-4 border-2 border-gray-200 outline-none rounded-lg w-full"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password*"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3 right-4 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Register Button */}
          <button className="p-4 bg-[#FF6A1A] text-white font-semibold w-full rounded-lg">
            Register
          </button>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <button className="text-primary underline">Forgot Password?</button>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button className="text-primary font-semibold underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
