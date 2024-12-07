import { useEffect, useState } from "react";

const checkAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function userAuth() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/user/session`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          // localStorage.setItem("username", data.username);
          localStorage.setItem("ROLE", data.userRole);
          localStorage.setItem("username", data.username);
          setIsAuthenticated(data.isAuthenticated); // Set based on server response
          setUserRole(data.userRole);
          console.log(data.userRole);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    userAuth();
  }, []);
  return { isAuthenticated, isLoading, userRole };
};

export default checkAuthStatus;
