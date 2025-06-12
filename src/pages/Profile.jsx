/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import MoreDetails from "@/components/MoreDetails";
import checkAuthStatus from "@/hooks/userSession";
import { Navigate, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  User,
  Calendar,
  Briefcase,
  TrendingUp,
} from "lucide-react";

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
    navigate("/project");
  }

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Stats for dashboard
  const getStats = () => {
    const totalProjects = projects?.length || 0;
    const recentProjects =
      projects?.filter((p) => {
        const projectDate = new Date(p.createdAt || Date.now());
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return projectDate > weekAgo;
      }).length || 0;

    return { totalProjects, recentProjects };
  };

  const { totalProjects, recentProjects } = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4 animate-fade-in w-full sm:w-auto">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-success-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 truncate max-w-[200px] sm:max-w-[300px]">
                  {getGreeting()}, {localStorage.getItem("username")}
                </h1>
                <div className="flex items-center text-neutral-600 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {getCurrentDate()}
                </div>
              </div>
            </div>

            {/* Action Button */}
            {localStorage.getItem("ROLE") === "USER" && (
              <button
                onClick={handlenewProject}
                className="
                  group flex items-center space-x-2
                  bg-gradient-to-r from-primary-600 to-primary-500
                  hover:from-primary-700 hover:to-primary-600
                  text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl
                  font-semibold text-sm sm:text-base shadow-medium hover:shadow-strong
                  transition-all duration-300 transform
                  hover:-translate-y-1 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  w-full sm:w-auto
                "
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-300" />
                <span>New Project</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">
                  Total Projects
                </p>
                <p className="text-3xl font-bold text-neutral-900 mt-1">
                  {totalProjects}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">
                  Recent Projects
                </p>
                <p className="text-3xl font-bold text-neutral-900 mt-1">
                  {recentProjects}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">
                  Account Status
                </p>
                <p className="text-lg font-semibold text-success-600 mt-1">
                  Active
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-soft overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Your Projects
                </h2>
                <p className="text-neutral-600 text-sm mt-1">
                  Manage and track your Vastu consultation projects
                </p>
              </div>
              {localStorage.getItem("ROLE") === "USER" &&
                projects?.length > 0 && (
                  <button
                    onClick={handlenewProject}
                    className="
                    flex items-center space-x-2 text-primary-600 hover:text-primary-700
                    font-medium text-sm transition-colors duration-200
                    hover:bg-primary-50 px-3 py-2 rounded-lg
                  "
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                )}
            </div>
          </div>

          <div className="p-6">
            {projects?.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {projects?.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-slide-up transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProjectCard
                      onClick={() => handleStateChange(item)}
                      project={item}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <div className="w-24 h-24 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-neutral-600 text-center mb-8 max-w-md">
                  Start your Vastu journey by creating your first project. Get
                  personalized consultations and recommendations for your space.
                </p>
                {localStorage.getItem("ROLE") === "USER" && (
                  <button
                    onClick={handlenewProject}
                    className="
                      group flex items-center space-x-3
                      bg-gradient-to-r from-primary-600 to-primary-500
                      hover:from-primary-700 hover:to-primary-600
                      text-white px-8 py-4 rounded-xl
                      font-semibold shadow-medium hover:shadow-strong
                      transition-all duration-300 transform
                      hover:-translate-y-1 hover:scale
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    "
                  >
                    <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                    <span>Create Your First Project</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <MoreDetails selectedProject={selectedProject} onClose={closeHandler} />
      )}
    </div>
  );
}

export default Profile;
