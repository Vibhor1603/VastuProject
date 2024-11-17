/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import MoreDetails from "@/components/MoreDetails";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const isAuthenticated = checkAuthStatus();

  if (!isAuthenticated) {
    navigate("/home");
    console.log(isAuthenticated);
  }

  const [selectedProject, setSelectedProject] = React.useState(null);

  function handleStateChange(project) {
    setSelectedProject(project);
  }

  function closeHandler() {
    setSelectedProject(null);
  }

  useEffect(() => {
    async function getProjects() {
      const response = await fetch(
        "http://localhost:3000/api/v1/project/createdprojects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setProjects(data);
    }
    getProjects();
  }, []);
  return (
    <>
      <div className="bg-orange-350 text-white h-full pb-72">
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
