import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, Loader2, Building, ArrowLeft, X } from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";

const FloorPlans = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = checkAuthStatus();
  const selectedProjectID = localStorage.getItem("selectedProjectID");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchFloorPlans = async () => {
      try {
        const response = await fetch(
          `https://vastubackend.onrender.com/api/v1/floorplan/floorplans/${selectedProjectID}`,
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
    setSelectedImage(plan.floorplan); // Assuming there's an image field in your floor plan data
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
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg"
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
              {floorPlans.map((plan) => (
                <div
                  key={plan._id}
                  onClick={() => handleFloorPlanClick(plan)}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 cursor-pointer transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    Floor {plan.floornumber}
                  </h3>
                  <p className="text-orange-600 line-clamp-2 mb-4">
                    {plan.description || "No description"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-500 group-hover:text-orange-700">
                      View Details
                    </span>
                    <Building
                      size={20}
                      className="text-orange-400 group-hover:text-orange-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-gray-800"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Floor Plan"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorPlans;
