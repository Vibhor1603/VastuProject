/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  X,
  User,
  Lock,
  Mail,
  UserPlus,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Signup = ({ onClose, success }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER", // Default role set to USER
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!role) {
      toast.error("Please select a role");
      return false;
    }

    return true;
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    // Show loading state
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role.toUpperCase(), // Ensure role is always uppercase
        }),
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Get the data from response
        const data = await response.json();

        // Show success toast
        toast.success("Account created successfully!");

        // Close modal and navigate
        onClose();
        navigate("/profile");
        success && success();
      } else {
        // Get error message from response
        const data = await response.json();
        // Display the response message if available, otherwise fall back to generic message
        toast.error(
          data.message || "Failed to create account, please try again"
        );
      }
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error("there is some error try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header with gradient */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 mb-4">
            <UserPlus size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-1">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <User size={18} />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
            </div>
          </div>

          {/* Role Selection Field */}
          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Account Type
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
                disabled={isLoading}
              >
                <option value="USER">User</option>
                <option value="CONSULTANT">Consultant</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Users size={18} />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Create a password"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-6"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Oval
                  height={24}
                  width={24}
                  color="#ffffff"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#ffffff"
                  strokeWidth={3}
                  strokeWidthSecondary={3}
                />
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.dispatchEvent(new CustomEvent("openLoginModal"));
                  }, 100);
                }}
                className="text-orange-600 ml-1 font-medium hover:text-orange-700 border-none bg-transparent cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
