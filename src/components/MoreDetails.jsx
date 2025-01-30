import React, { useEffect, useState } from "react";
import {
  X,
  Building,
  MapPin,
  Layers,
  Home,
  Calendar,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuthStatus from "@/hooks/userSession";
import toast from "react-hot-toast";

function MoreDetails({ selectedProject, onClose }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = checkAuthStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const dispFloorPlan = () => {
    localStorage.setItem("selectedProjectID", selectedProject.id);
    navigate("/floorplans");
  };

  const createFloorPlan = () => {
    localStorage.setItem("projectId", selectedProject.id);

    localStorage.setItem("floorcount", selectedProject.numFloors);
    navigate(`/floorForm/${selectedProject.name}`);
  };

  const reviewClick = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/project/select-review/${selectedProject.id}`,
        null,
        { withCredentials: true }
      );
      onClose();
    } catch (error) {
      toast.error("Server error, please try again later");
      console.error(error);
      navigate("/profile");
      onClose();
    }
  };

  const handleDeleteProject = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/project/deleteproject/${selectedProject.id}`,
        { withCredentials: true }
      );
      toast.success("Project deleted successfully");
      onClose();
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
        <Icon size={16} />
        {label}
      </label>
      <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
        {value}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-200 relative"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-orange-900">
            Project Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-200 rounded-full transition-colors"
          >
            <X size={24} className="text-orange-700" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          <DetailRow
            icon={Home}
            label="Project Name"
            value={selectedProject.name}
          />
          <DetailRow
            icon={Building}
            label="Property Type"
            value={selectedProject.type}
          />
          <DetailRow
            icon={Layers}
            label="Floor Count"
            value={`${selectedProject.numFloors} ${
              selectedProject.numFloors === 1 ? "Floor" : "Floors"
            }`}
          />
          <DetailRow
            icon={MapPin}
            label="Address"
            value={selectedProject.address}
          />
          {selectedProject.createdAt && (
            <DetailRow
              icon={Calendar}
              label="Created On"
              value={new Date(selectedProject.createdAt).toLocaleDateString()}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-orange-200 grid grid-cols-2 gap-3">
          <button
            onClick={dispFloorPlan}
            className="px-4 py-2 rounded-lg  bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
            type="button"
          >
            View Floor Plans
          </button>

          {localStorage.getItem("ROLE") === "USER" ? (
            <button
              onClick={createFloorPlan}
              className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700  font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
              type="button"
            >
              Upload Floor Plan
            </button>
          ) : null}
        </div>

        {/* Delete Button */}
        {localStorage.getItem("ROLE") === "USER" && (
          <div className="mt-4 pt-4 border-t border-orange-200 flex justify-center">
            <button
              onClick={handleDeleteProject}
              disabled={isDeleting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              <Trash2 size={16} />
              {isDeleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoreDetails;
