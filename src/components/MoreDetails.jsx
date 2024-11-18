import React from "react";
import { X, Building, MapPin, Layers, Home, Calendar } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuthStatus from "@/hooks/userSession";

function MoreDetails({ selectedProject, onClose }) {
  // Prevent click on modal content from closing the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  const isAuthenticated = checkAuthStatus();
  if (!isAuthenticated) {
    navigate("/");
  }

  async function dispFloorPlan() {
    localStorage.setItem("floorID", selectedProject.id);
    navigate("/floorplan");
  }

  return (
    <div
      className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md border border-orange-200"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-orange-800">
            Project Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-orange-200/50 rounded-full transition-colors"
          >
            <X size={20} className="text-orange-600" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
              <Home size={16} />
              Project Name
            </label>
            <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
              {selectedProject.name}
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
              <Building size={16} />
              Property Type
            </label>
            <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
              {selectedProject.type}
            </div>
          </div>

          {/* Floor Count */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
              <Layers size={16} />
              Floor Count
            </label>
            <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
              {selectedProject.numFloors}{" "}
              {selectedProject.numFloors === 1 ? "Floor" : "Floors"}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
              <MapPin size={16} />
              Address
            </label>
            <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
              {selectedProject.address}
            </div>
          </div>

          {/* Creation Date (if available) */}
          {selectedProject.createdAt && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-orange-800 flex items-center gap-2">
                <Calendar size={16} />
                Created On
              </label>
              <div className="bg-white/60 border border-orange-200 rounded-lg py-2.5 px-3 text-gray-700">
                {new Date(selectedProject.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-4 border-t border-orange-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
            type="button"
          >
            Close
          </button>
        </div>
        <div className="flex justify-end mt-6 pt-4 border-t border-orange-200">
          <button
            onClick={dispFloorPlan}
            className="px-4 py-2 rounded-lg bg-orange-300 hover:bg-orange-200 text-orange-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
            type="button"
          >
            View uploaded floor plans
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreDetails;
