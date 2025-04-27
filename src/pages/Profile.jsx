/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import MoreDetails from "@/components/MoreDetails";
import checkAuthStatus from "@/hooks/userSession";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const { isLoading, isAuthenticated } = checkAuthStatus();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedProject, setSelectedProject] = React.useState(null);

  function handleStateChange(project) {
    setSelectedProject(project);
  }

  function closeHandler() {
    setSelectedProject(null);
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    async function getProjects() {
      const role = localStorage.getItem("ROLE");
      const response = await fetch(
        `${BACKEND_URL}/api/v1/project/createdprojects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setProjects(data);
    }
    getProjects();
  }, []);

  function handlenewProject() {
    // Make sure you're navigating to the correct path
    navigate("/project");
  }

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="bg-orange-350 text-white h-full pb-72">
        <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-cyan-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <div>
              <h3 className="text-purple-800 text-2xl font-bold">
                {getGreeting()}, {localStorage.getItem("username")}
              </h3>
              <h4 className="text-gray-600 text-sm">
                Welcome to your Vastu Guide dashboard
              </h4>
            </div>
          </div>
          {localStorage.getItem("ROLE") === "USER" && (
            <button
              onClick={handlenewProject}
              className="
                flex items-center justify-center 
                bg-gradient-to-r from-orange-600 to-amber-600 
                text-white 
                px-6 py-2 
                rounded-lg 
                font-semibold 
                hover:from-orange-700 hover:to-amber-700 
                transition-all duration-300 
                shadow-md hover:shadow-lg 
                transform hover:-translate-y-0.5
                mr-auto
                ml-60
              "
              aria-label="Create New Project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>New Project</span>
            </button>
          )}
        </div>

        {projects?.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {projects?.map((item) => {
              return (
                <ProjectCard
                  onClick={() => {
                    handleStateChange(item);
                  }}
                  key={item.id}
                  project={item}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 mt-8">
            <div className="text-gray-800 text-lg font-medium mb-4">
              No projects found
            </div>
            {localStorage.getItem("ROLE") === "USER" && (
              <button
                onClick={handlenewProject}
                className="
                  flex items-center space-x-2
                  bg-gradient-to-r from-orange-600 to-amber-600 
                  text-white 
                  px-6 py-3
                  rounded-lg 
                  font-semibold 
                  hover:from-orange-700 hover:to-amber-700 
                  transition-all duration-300 
                  shadow-md hover:shadow-lg 
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Create Your First Project</span>
              </button>
            )}
          </div>
        )}
      </div>
      {selectedProject && (
        <MoreDetails selectedProject={selectedProject} onClose={closeHandler} />
      )}
    </>
  );
}

export default Profile;
