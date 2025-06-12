import React, { useEffect, useState } from "react";
import {
  X,
  Building2,
  MapPin,
  Layers,
  Home,
  Calendar,
  Trash2,
  FileText,
  Upload,
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
    localStorage.setItem("projectId", selectedProject.id);
    localStorage.setItem("projectName", selectedProject.name);
    navigate("/floorplans");
  };

  const createFloorPlan = () => {
    localStorage.setItem("projectId", selectedProject.id);
    localStorage.setItem("floorcount", selectedProject.numFloors);
    navigate(`/floorForm/${selectedProject.name}`);
  };

  const handleViewReport = () => {
    navigate(`/viewreport/${selectedProject.id}`);
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
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 py-3 group hover:bg-primary-50/50 rounded-md transition-all duration-200">
      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
        <Icon className="size-5 text-primary-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-600">{label}</p>
        <p className="text-base text-neutral-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-primary-50 backdrop-blur-sm rounded-2xl shadow-strong border border-primary-100/30 overflow-hidden animate-scale-in"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-200/50 rounded-xl flex items-center justify-center">
              <Home className="size-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 truncate max-w-[300px]">
              {selectedProject.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary-100 transition-colors duration-200 hover:scale-110"
          >
            <X className="size-5 text-neutral-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-2">
          <DetailRow
            icon={Building2}
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
        <div className="p-6 pt-0 space-y-2 border-t border-neutral-100/50">
          <button
            onClick={dispFloorPlan}
            className="
              w-full flex items-center justify-center gap-3 px-6 py-3
              bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium
              rounded-xl transition-all duration-300
              hover:shadow-medium hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              group
            "
            type="button"
          >
            <FileText className="size-5 group-hover:scale-110 transition-transform duration-200" />
            View Floor Plans
          </button>

          {localStorage.getItem("ROLE") === "USER" && (
            <button
              onClick={createFloorPlan}
              className="
                w-full flex items-center justify-center gap-3 px-6 py-3
                bg-primary-600 hover:bg-primary-700 text-white font-medium
                rounded-xl transition-all duration-300
                hover:shadow-medium hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                group
              "
              type="button"
            >
              <Upload className="size-5 group-hover:scale-110 transition-transform duration-200" />
              Upload Floor Plan
            </button>
          )}

          {localStorage.getItem("ROLE") === "USER" && (
            <button
              onClick={handleViewReport}
              className="
                w-full flex items-center justify-center gap-3 px-6 py-3
                bg-accent-50 hover:bg-accent-100 text-accent-700 font-medium
                rounded-xl transition-all duration-300
                hover:shadow-medium hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
                group
              "
              type="button"
            >
              <FileText className="size-5 group-hover:scale-110 transition-transform duration-200" />
              View Report
            </button>
          )}

          {localStorage.getItem("ROLE") === "USER" && (
            <button
              onClick={handleDeleteProject}
              disabled={isDeleting}
              className="
                w-full flex items-center justify-center gap-3 px-6 py-3
                bg-destructive-50 hover:bg-destructive-100 text-destructive-700 font-medium
                rounded-xl transition-all duration-300
                hover:shadow-medium hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-destructive-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100
                group
              "
              type="button"
            >
              <Trash2 className="size-5 group-hover:scale-110 transition-transform duration-200" />
              {isDeleting ? "Deleting..." : "Delete Project"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoreDetails;
