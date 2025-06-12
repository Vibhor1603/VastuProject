/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, User, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Login = ({ onClose, success }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Form validation
  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  // Toggle password visibility
  const passwordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    // Show loading state
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Signing in...");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Get the data from response
        const data = await response.json();

        // Show success toast
        toast.success("You are logged in successfully");

        // Close modal and navigate
        onClose();
        navigate("/profile");
        success();
      } else {
        // Get error message from response
        const data = await response.json();
        // Display the response.message if available, otherwise fall back to generic message
        toast.error(data.message || "Failed to login, please try again");
        console.log(data);
      }
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error("Network error. Please check your connection and try again");
      console.error("Login error:", error);
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
            <User size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <User size={18} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>
              <a
                href="#"
                className="text-orange-600 text-sm hover:text-orange-700"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={passwordHandler}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
              "Sign In"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.dispatchEvent(new CustomEvent("openSignupModal"));
                  }, 100);
                }}
                className="text-orange-600 ml-1 font-medium hover:text-orange-700 border-none bg-transparent cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
