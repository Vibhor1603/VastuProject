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

  // if (!isAuthenticated) {
  //   navigate("/");
  //   console.log(isAuthenticated);
  // }

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
      const response = await fetch(
        "https://vastubackend.onrender.com/api/v1/project/createdprojects",
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
  return (
    <>
      <div className="bg-orange-350 text-white h-full pb-72">
        <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ">
          <Link to="/createproject" className="text-white">
            Create a new Project
          </Link>
        </button>
        {projects.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {projects.map((item, index) => {
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
          "ille"
        )}
      </div>
      {selectedProject && (
        <MoreDetails selectedProject={selectedProject} onClose={closeHandler} />
      )}
    </>
  );
}

export default Profile;
