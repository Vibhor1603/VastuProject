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

  // Set up event listeners for switching between modals
  useEffect(() => {
    const handleOpenLoginModal = () => setOpenLogin(true);
    const handleOpenSignupModal = () => setOpenSignUp(true);

    document.addEventListener("openLoginModal", handleOpenLoginModal);
    document.addEventListener("openSignupModal", handleOpenSignupModal);

    return () => {
      document.removeEventListener("openLoginModal", handleOpenLoginModal);
      document.removeEventListener("openSignupModal", handleOpenSignupModal);
    };
  }, []);

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
    <nav className="bg-gradient-to-b from-orange-50 to-orange-200 border-b border-amber-100">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 text-transparent bg-clip-text hover:from-orange-700 hover:to-amber-700 transition-all duration-300">
              VastuGuide
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Home
            </NavLink>

            {isLoggedIn && localStorage.getItem("ROLE") === "USER" ? (
              <NavLink
                to="/project"
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Create a Project
              </NavLink>
            ) : (
              <></>
            )}

            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Profile
              </NavLink>
            ) : (
              <></>
            )}

            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Contact
            </NavLink>

            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="bg-white text-gray-700 border border-amber-200 px-6 py-2.5 rounded-full font-semibold hover:bg-orange-50 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setOpenSignUp(true);
                    }}
                    className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
            className="md:hidden text-gray-700 hover:text-orange-600 transition-colors duration-200 focus:outline-none"
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
          <div className="md:hidden py-4 space-y-3 bg-white rounded-lg shadow-lg mt-2 border border-amber-100">
            <NavLink
              to="/"
              className="block text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 font-medium px-4 py-2"
            >
              Home
            </NavLink>
            {isLoggedIn && localStorage.getItem("ROLE") === "USER" && (
              <NavLink
                to="/project"
                className="block text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 font-medium px-4 py-2"
              >
                Create a Project
              </NavLink>
            )}
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="block text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 font-medium px-4 py-2"
              >
                Profile
              </NavLink>
            ) : (
              <></>
            )}

            <NavLink
              to="/contact"
              className="block text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 font-medium px-4 py-2"
            >
              Contact
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md mx-4"
              >
                Logout
              </button>
            ) : (
              <div className="px-4 space-y-2">
                <button
                  onClick={() => setOpenLogin(true)}
                  className="w-full bg-white text-gray-700 border border-amber-200 px-6 py-2.5 rounded-full font-semibold hover:bg-orange-50 hover:border-amber-300 transition-all duration-300 shadow-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setOpenSignUp(true);
                  }}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md"
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
          success={() => {
            setIsLoggedIn(true);
          }}
        />
      )}
    </nav>
  );
}
