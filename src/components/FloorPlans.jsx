import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers,
  Loader2,
  Building,
  ArrowLeft,
  X,
  ImageIcon,
} from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import toast from "react-hot-toast";
import axios from "axios";

const FloorPlans = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedImages, setSelectedImages] = useState({
    rawImg: null,
    markedImg: null,
    annotatedImg: null,
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [activeImageType, setActiveImageType] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, userRole } = checkAuthStatus();
  const selectedProjectID = localStorage.getItem("projectId");
  const role = localStorage.getItem("ROLE"); // Fetch role from localStorage

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchFloorPlans = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/floorplan/floorplans/${selectedProjectID}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setFloorPlans(data);
      } catch {
        setFloorPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFloorPlans();
  }, [isAuthenticated, isLoading, navigate, selectedProjectID]);

  const handleFloorPlanClick = (plan) => {
    setSelectedImages({
      rawImg: plan.raw_img,
      markedImg: plan.marked_img,
      annotatedImg: plan.annotated_img,
    });
    if (role === "CONSULTANT") {
      localStorage.setItem("raw_img", plan.raw_img);
      localStorage.setItem("compass_angle", plan.marked_compass_angle);
      localStorage.setItem("indicator_angle", plan.marked_indicator_angle);
      localStorage.setItem("floornum", plan.floornumber);
      localStorage.setItem("floorId", plan.id);
    }
    setCurrentPlan(plan);
    setActiveImageType("raw");
  };

  const closeImageModal = () => {
    setSelectedImages({
      rawImg: null,
      markedImg: null,
      annotatedImg: null,
    });
    setActiveImageType(null);
  };

  const reviewClick = async (type) => {
    if (role === "CONSULTANT") {
      try {
        await axios.put(
          `${BACKEND_URL}/api/v1/project/select-review/${selectedProjectID}`,
          null,
          { withCredentials: true }
        );
        toast.success("Review started successfully!");

        type === "marked" ? navigate(`/editedimg`) : navigate(`/annotate`); // Navigate to /reports
        closeImageModal(); // Close modal after action
      } catch (error) {
        toast.error("Server error, please try again later");
        console.error(error);
        navigate("/profile");
        closeImageModal();
      }
    } else if (role === "USER") {
      navigate(`/viewreport/${currentPlan.id}`); // Navigate to /reports
      closeImageModal(); // Close modal after action
    }
  };

  const renderImageModal = () => {
    const currentImage = selectedImages[`${activeImageType}Img`];
    if (!currentImage) return null;

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={closeImageModal}
      >
        <div
          className="relative max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Navigation */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {["raw", "marked", "annotated"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveImageType(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  activeImageType === type
                    ? "bg-orange-600 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Image
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 z-10"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <img
            src={currentImage}
            alt={`${activeImageType} Floor Plan`}
            className="w-full h-auto max-h-[80vh] object-contain"
          />

          {/* Start Review Button for CONSULTANT Role */}
          {role === "CONSULTANT" ? (
            <div className="p-4 bg-orange-50 text-center">
              <button
                onClick={() => {
                  reviewClick("marked");
                }}
                className="px-6 py-2 m-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
              >
                Edit markings
              </button>
              <button
                onClick={() => {
                  reviewClick("annotated");
                }}
                className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
              >
                Edit annotations
              </button>
            </div>
          ) : (
            <div className="p-4 bg-orange-50 text-center">
              <button
                onClick={reviewClick}
                className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
              >
                View Report
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-orange-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading floor plans...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg transition-all"
        >
          <ArrowLeft size={20} />
          <span>Back to Project Details</span>
        </button>

        <div className="bg-white border border-orange-200 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
            <Layers size={24} className="text-orange-600" />
            Floor Plans
          </h2>

          {floorPlans.length === 0 ? (
            <div className="text-center py-12 text-orange-600">
              <Building size={48} className="mx-auto mb-4 opacity-50" />
              <p>No floor plans available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {floorPlans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => handleFloorPlanClick(plan)}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 cursor-pointer transition-all group shadow-md hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-orange-800">
                      Floor {plan.floornumber}
                    </h3>
                    <div className="flex gap-1">
                      {[plan.raw_img, plan.marked_img, plan.annotated_img]
                        .filter(Boolean)
                        .map((img, index) => (
                          <ImageIcon
                            key={index}
                            size={16}
                            className="text-orange-400 opacity-50"
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-orange-600 line-clamp-2 mb-4">
                    {plan.description || "No description"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-500 group-hover:text-orange-700 transition-colors">
                      View Details
                    </span>
                    <Building
                      size={20}
                      className="text-orange-400 group-hover:text-orange-600 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {activeImageType && renderImageModal()}
    </div>
  );
};

export default FloorPlans;
