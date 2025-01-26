/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Login = ({ onClose, success }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function passwordhandler() {
    setShowPassword((item) => !item);
  }
  //
  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
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

        onClose();
        toast.success("You are logged in successfully");
        setIsloading(false);
        navigate("/profile");
        success();
      } else {
        // Handle login error
        const data = await response.json();
        toast.error(data.message);
        setIsloading(false);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to login , please try again later");
      setIsloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
            {/* <button
              onClick={handleSubmit}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button> */}
            {isLoading ? (
              <Oval
                height={20}
                width={20}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                D
                secondaryColor="#4fa94d"
                strokeWidth={8}
                strokeWidthSecondary={2}
              />
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            )}
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
    </div>
  );
};
export default Login;
