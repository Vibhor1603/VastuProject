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
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Login = ({ onClose, success }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

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

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Toggle password visibility
  const passwordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle forgot password click
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
    setEmailSent(false);
    setForgotEmail(email); // Pre-fill with login email if available
  };

  // Handle back to login
  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setEmailSent(false);
    setForgotEmail("");
  };

  // Handle forgot password submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(forgotEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsForgotLoading(true);
    const loadingToast = toast.loading("Sending reset link...");

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      toast.dismiss(loadingToast);

      if (response.ok) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email");
      } else {
        const data = await response.json();
        // For security reasons, many apps show success even if email doesn't exist
        // But you can customize this based on your security requirements
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Network error. Please try again");
      console.error("Forgot password error:", error);
    } finally {
      setIsForgotLoading(false);
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

  // Render forgot password form
  const renderForgotPasswordForm = () => {
    if (emailSent) {
      return (
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
            <CheckCircle size={30} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to
            <br />
            <span className="font-medium text-gray-800">{forgotEmail}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setEmailSent(false);
                setIsForgotLoading(false);
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToLogin}
              className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 mb-4">
            <Lock size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-600 mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="forgot-email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="forgot-email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email address"
                disabled={isForgotLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
            </div>
          </div>

          <button
            disabled={isForgotLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isForgotLoading ? (
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
              "Send Reset Link"
            )}
          </button>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full flex items-center justify-center text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </button>
        </form>
      </>
    );
  };

  // Render main login form
  const renderLoginForm = () => (
    <>
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
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-orange-600 text-sm hover:text-orange-700 transition-colors"
            >
              Forgot Password?
            </button>
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
    </>
  );

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

        {/* Conditional rendering based on current view */}
        {showForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}
      </div>
    </div>
  );
};

export default Login;
