import { useEffect, useState } from "react";

const checkAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function userAuth() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/session",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("username", data.username);
          setIsAuthenticated(data.isAuthenticated); // Set based on server response
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
      }
    }
    userAuth();
  }, []);
  return isAuthenticated;
};

export default checkAuthStatus;
