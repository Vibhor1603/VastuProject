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
  const [reportGenerated, setReportGenerated] = useState(false);
  const [activeImageType, setActiveImageType] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, userRole } = checkAuthStatus();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const selectedProjectID = localStorage.getItem("projectId");
  const role = localStorage.getItem("ROLE");

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

  const generateReport = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/report/genreport/${currentPlan.id}`,
        null,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Report generated successfully!");
        setReportGenerated(true);
        navigate(`/edit-report/${currentPlan.id}`, {
          state: { reportData: response.data },
        });
      }
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    }
  };

  const handleFloorPlanClick = (plan) => {
    setSelectedImages({
      rawImg: plan.raw_img,
      markedImg: plan.user_marked_img,
      annotatedImg: plan.user_annotated_img,
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
        type === "marked" ? navigate(`/editedimg`) : navigate(`/annotate`);
        closeImageModal();
      } catch (error) {
        toast.error("Server error, please try again later");
        console.error(error);
        navigate("/profile");
        closeImageModal();
      }
    } else if (role === "USER") {
      navigate(`/viewreport/${currentPlan.id}`);
      closeImageModal();
    }
  };

  const renderImageModal = () => {
    const currentImage = selectedImages[`${activeImageType}Img`];
    if (!currentImage) return null;

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        onClick={closeImageModal}
      >
        <div
          className="relative w-full max-w-4xl bg-white/98 backdrop-blur-sm rounded-2xl shadow-strong border border-primary-100/30 overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 bg-primary-50 flex items-center justify-between border-b border-neutral-100/50">
            <h3 className="text-lg font-semibold text-neutral-900 capitalize">
              {activeImageType} Floor Plan - Floor {currentPlan.floornumber}
            </h3>
            <button
              onClick={closeImageModal}
              className="p-2 rounded-full hover:bg-primary-100 transition-all duration-200 hover:scale-110"
            >
              <X className="size-5 text-neutral-700" />
            </button>
          </div>

          {/* Image Navigation */}
          <div className="flex gap-2 p-4 bg-neutral-50 border-b border-neutral-100/50">
            {["raw", "marked", "annotated"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveImageType(type)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    activeImageType === type
                      ? "bg-primary-600 text-white shadow-soft"
                      : "bg-white text-neutral-700 hover:bg-primary-50"
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Image
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="flex justify-center bg-neutral-100">
            <img
              src={currentImage}
              alt={`${activeImageType} Floor Plan`}
              className="w-full h-auto max-h-[60vh] object-contain"
            />
          </div>

          {/* Action Buttons for CONSULTANT Role */}
          {role === "CONSULTANT" && (
            <div className="p-4 bg-primary-50 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => reviewClick("marked")}
                className="
                  px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium
                  rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  group
                "
              >
                Edit Markings
              </button>
              <button
                onClick={() => reviewClick("annotated")}
                className="
                  px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium
                  rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  group
                "
              >
                Edit Annotations
              </button>
              <button
                onClick={generateReport}
                className="
                  px-6 py-2.5 bg-accent-600 hover:bg-accent-700 text-white font-medium
                  rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
                  group
                "
              >
                Generate Report
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-primary-600">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-lg font-medium">Loading floor plans...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate("/profile")}
            className="
              flex items-center gap-2 px-4 py-2
              bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium
              rounded-xl transition-all duration-200 hover:shadow-soft
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            <ArrowLeft className="size-5" />
            Back to Profile
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 flex items-center gap-3">
            <Layers className="size-6 sm:size-7 text-primary-600" />
            Floor Plans
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-primary-50 backdrop-blur-sm border border-primary-100/30 rounded-2xl shadow-medium p-6 sm:p-8">
          {floorPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              <Building className="size-12 text-primary-400 opacity-50 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No Floor Plans Available
              </h3>
              <p className="text-neutral-600 max-w-md">
                Upload floor plans to start your Vastu consultation process.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
              {floorPlans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => handleFloorPlanClick(plan)}
                  className="
                    bg-white border border-primary-100/50 rounded-xl p-4 sm:p-5
                    hover:bg-primary-50/30 cursor-pointer transition-all duration-300
                    group shadow-soft hover:shadow-medium hover:scale-[1.02]
                  "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                      Floor {plan.floornumber}
                    </h3>
                    <div className="flex gap-1">
                      {[
                        plan.raw_img,
                        plan.user_marked_img,
                        plan.user_annotated_img,
                      ]
                        .filter(Boolean)
                        .map((_, i) => (
                          <ImageIcon
                            key={i}
                            className="size-4 text-primary-400 group-hover:text-primary-600 transition-colors"
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                    {plan.description || "No description provided"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`
                        inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
                        ${
                          plan.status === "COMPLETED"
                            ? "bg-success-100 text-success-800"
                            : plan.status === "NEW"
                            ? "bg-primary-100 text-primary-800"
                            : plan.status === "SUBMITTED"
                            ? "bg-accent-100 text-accent-800"
                            : plan.status === "REVIEWING"
                            ? "bg-secondary-100 text-secondary-800"
                            : "bg-neutral-100 text-neutral-800"
                        }
                      `}
                    >
                      {plan.status
                        ? plan.status.charAt(0).toUpperCase() +
                          plan.status.slice(1).toLowerCase()
                        : "Unknown"}
                    </span>
                    <Building className="size-5 text-primary-400 group-hover:text-primary-600 transition-colors" />
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
