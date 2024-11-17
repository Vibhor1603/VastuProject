/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Eye } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { Item } from "@radix-ui/react-radio-group";
import checkAuthStatus from "@/hooks/userSession";

const Login = ({ onClose, success }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function passwordhandler() {
    setShowPassword((item) => !item);
  }
  //
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Store the auth token in localStorage
        const data = await response.json();
        console.log(data);
        onClose();
        success();
        navigate("/profile");
        toast.info("You are logged in successfully");
      } else {
        // Handle login error
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
            <span
              className="flex justify-start items-center cursor-pointer"
              onClick={passwordhandler}
            >
              <Eye className="mr-1"></Eye>
              <p>{!showPassword ? "Show password" : "Hide password"}</p>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-orange-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Login;
