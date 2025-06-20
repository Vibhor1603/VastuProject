import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [urlParams, setUrlParams] = useState({ token: "", id: "" });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Extract token and id from URL parameters using React Router
  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (token && id) {
      setUrlParams({ token, id });
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const validatePassword = (password) => {
    const minLength = 6;

    if (password.length < minLength) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: urlParams.token,
            userId: urlParams.id,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        setErrors({
          general:
            errorData.message || "Failed to reset password. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-soft p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Password Reset Successfully!
          </h2>
          <p className="text-neutral-600 mb-6">
            Your password has been updated successfully. You can now log in with
            your new password.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Reset Your Password
          </h2>
          <p className="text-neutral-600">
            Enter your new password below to complete the reset process.
          </p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slide-down">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.password ? "border-red-300" : "border-neutral-300"
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200 pr-12`}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 animate-slide-down">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.confirmPassword
                    ? "border-red-300"
                    : "border-neutral-300"
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200 pr-12`}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 animate-slide-down">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !urlParams.token || !urlParams.id}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
