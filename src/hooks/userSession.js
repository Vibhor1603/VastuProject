import { useEffect, useState } from "react";

const checkAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function userAuth() {
      try {
        const response = await fetch(
          "https://vastubackend.onrender.com/api/v1/user/session",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();

          localStorage.setItem("username", data.username);
          setIsAuthenticated(data.isAuthenticated); // Set based on server response
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
  return { isAuthenticated, isLoading };
};

export default checkAuthStatus;
