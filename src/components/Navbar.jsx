import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import checkAuthStatus from "@/hooks/userSession";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);

        localStorage.clear();
        const data = await response.json();

        navigate("/");
      } else {
        // Handle signup error
        console.error("logout failed");
      }
    } catch (error) {
      console.error("Error loggin out:", error);
    }
  };

  useEffect(() => {
    async function userAuth() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/user/session`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          localStorage.setItem("username", data.username);
          localStorage.setItem("ROLE", data.role);

          setIsLoggedIn(data.isAuthenticated);
          // Set based on server response
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedIn(false);
      }
    }
    userAuth();
  }, [navigate]);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-neutral-800 hover:text-primary-600 transition-colors duration-300">
              VastuGuide
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium"
            >
              Home
            </NavLink>

            {isLoggedIn && localStorage.getItem("ROLE") === "USER" ? (
              <NavLink
                to="/project"
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium"
              >
                Create a Project
              </NavLink>
            ) : (
              <></>
            )}

            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium"
              >
                Profile
              </NavLink>
            ) : (
              <></>
            )}

            <NavLink
              to="/contact"
              className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium"
            >
              Contact
            </NavLink>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-all duration-300 shadow-soft hover:shadow-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="text-neutral-700 border border-neutral-300 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setOpenSignUp(true);
                    }}
                    className="bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-all duration-300 shadow-soft hover:shadow-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-700 hover:text-neutral-900 transition-colors duration-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 bg-white rounded-xl shadow-medium mt-2 border border-neutral-200">
            <NavLink
              to="/"
              className="block text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 font-medium px-4 py-2"
            >
              Home
            </NavLink>
            {isLoggedIn && localStorage.getItem("ROLE") === "USER" && (
              <NavLink
                to="/project"
                className="block text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 font-medium px-4 py-2"
              >
                Create a Project
              </NavLink>
            )}
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="block text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 font-medium px-4 py-2"
              >
                Profile
              </NavLink>
            ) : (
              <></>
            )}

            <NavLink
              to="/contact"
              className="block text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 font-medium px-4 py-2"
            >
              Contact
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-all duration-300 shadow-soft mx-4"
              >
                Logout
              </button>
            ) : (
              <div className="px-4 space-y-2">
                <button
                  onClick={() => setOpenLogin(true)}
                  className="w-full text-neutral-700 border border-neutral-300 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setOpenSignUp(true);
                  }}
                  className="w-full bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-all duration-300 shadow-soft"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {openLogin && (
        <Login
          onClose={() => {
            setOpenLogin(false);
          }}
          success={() => {
            setIsLoggedIn(true);
          }}
        />
      )}
      {openSignup && (
        <Signup
          onClose={() => {
            setOpenSignUp(false);
          }}
        />
      )}
    </nav>
  );
}