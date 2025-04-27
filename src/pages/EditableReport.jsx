import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Info,
  ChevronDown,
  ChevronUp,
  Compass,
  Save,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import checkAuthStatus from "@/hooks/userSession";

const EditableReport = () => {
  const { planID } = useParams();
  const location = useLocation();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRooms, setExpandedRooms] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { isAuthenticated, isLoading } = checkAuthStatus();
  const navigate = useNavigate();

  // Complete list of directions
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "North",
    "South",
    "East",
    "West",
    "Northeast",
    "Northwest",
    "Southeast",
    "Southwest",
    "Center",
  ];

  useEffect(() => {
    // Check if report data is available in location state
    if (location.state && location.state.reportData) {
      const data = location.state.reportData;
      setReportData(data);

      // Initialize expanded rooms state
      const expandedState = {};
      data.forEach((item) => {
        expandedState[item.room] = true;
      });
      setExpandedRooms(expandedState);
      setLoading(false);
    } else {
      // If no data in state, show error
      setError("No report data found. Please generate a report first.");
      setLoading(false);
    }
  }, [location.state]);

  const toggleRoomExpansion = (roomName) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomName]: !prev[roomName],
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedReportData = [...reportData];
    updatedReportData[index][field] = value;
    setReportData(updatedReportData);
  };

  const getDirectionColor = (direction) => {
    const directionColors = {
      // North variants
      N: "bg-blue-100 text-blue-800",
      North: "bg-blue-100 text-blue-800",
      NNE: "bg-blue-100 text-blue-800",
      NNW: "bg-blue-100 text-blue-800",

      // East variants
      E: "bg-purple-100 text-purple-800",
      East: "bg-purple-100 text-purple-800",
      ENE: "bg-purple-100 text-purple-800",
      ESE: "bg-purple-100 text-purple-800",

      // South variants
      S: "bg-red-100 text-red-800",
      South: "bg-red-100 text-red-800",
      SSE: "bg-red-100 text-red-800",
      SSW: "bg-red-100 text-red-800",

      // West variants
      W: "bg-yellow-100 text-yellow-800",
      West: "bg-yellow-100 text-yellow-800",
      WNW: "bg-yellow-100 text-yellow-800",
      WSW: "bg-yellow-100 text-yellow-800",

      // Northeast variants
      NE: "bg-indigo-100 text-indigo-800",
      Northeast: "bg-indigo-100 text-indigo-800",

      // Northwest variants
      NW: "bg-cyan-100 text-cyan-800",
      Northwest: "bg-cyan-100 text-cyan-800",

      // Southeast variants
      SE: "bg-pink-100 text-pink-800",
      Southeast: "bg-pink-100 text-pink-800",

      // Southwest variants
      SW: "bg-amber-100 text-amber-800",
      Southwest: "bg-amber-100 text-amber-800",

      // Center
      Center: "bg-green-100 text-green-800",
    };

    return directionColors[direction] || "bg-gray-100 text-gray-800";
  };

  const handleSubmitReport = async () => {
    try {
      setSubmitting(true);
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/report/submitreport/${planID}`,
        { report: reportData },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Report submitted successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        "Failed to submit report: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error submitting report:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 p-6 max-w-4xl mx-auto text-center">
        <div className="animate-pulse h-6 bg-orange-100 rounded w-3/4 mx-auto mb-4"></div>
        <div className="animate-pulse h-32 bg-orange-50 rounded mb-4"></div>
        <div className="animate-pulse h-32 bg-orange-50 rounded mb-4"></div>
        <div className="animate-pulse h-32 bg-orange-50 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 p-6 max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/profile")}
          className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-all"
        >
          <ArrowLeft size={20} />
          <span>Back to Project Details</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg transition-all"
        >
          <ArrowLeft size={20} />
          <span>Back to Project Details</span>
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-700">
            Edit Vastu Report
          </h1>
        </div>

        <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-orange-800 mb-2">
              Vastu Analysis Report
            </h2>
            <p className="text-orange-600">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {reportData.length > 0 ? (
            <div className="space-y-6">
              {reportData.map((report, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-200"
                >
                  <div
                    className="p-4 bg-orange-200 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleRoomExpansion(report.room)}
                  >
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={report.room}
                        onChange={(e) =>
                          handleInputChange(index, "room", e.target.value)
                        }
                        className="text-lg font-bold text-orange-800 bg-transparent border-b border-orange-300 focus:outline-none focus:border-orange-500 mr-2"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="relative ml-2">
                        <select
                          value={report.direction}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "direction",
                              e.target.value
                            )
                          }
                          className={`py-1 px-3 rounded-full text-xs font-medium appearance-none cursor-pointer ${getDirectionColor(
                            report.direction
                          )}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {directions.map((dir) => (
                            <option key={dir} value={dir}>
                              {dir}
                            </option>
                          ))}
                        </select>
                        <Compass
                          size={14}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    </div>
                    {expandedRooms[report.room] ? (
                      <ChevronUp className="text-orange-800" />
                    ) : (
                      <ChevronDown className="text-orange-800" />
                    )}
                  </div>

                  {expandedRooms[report.room] && (
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                          <Info size={18} className="mr-2 text-orange-500" />{" "}
                          Description
                        </h4>
                        <textarea
                          value={report.description}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
                          rows="2"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                          <Info size={18} className="mr-2 text-orange-500" />{" "}
                          Impact
                        </h4>
                        <textarea
                          value={report.impact}
                          onChange={(e) =>
                            handleInputChange(index, "impact", e.target.value)
                          }
                          className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
                          rows="3"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">
                          Remedy
                        </h4>
                        <textarea
                          value={report.remedy || "No remedy data available"}
                          onChange={(e) =>
                            handleInputChange(index, "remedy", e.target.value)
                          }
                          className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
                          rows="3"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSubmitReport}
                  disabled={submitting}
                  className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2 disabled:bg-orange-300"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-orange-600">
              <p>No report data available</p>
            </div>
          )}

          <div className="mt-8 border-t border-orange-200 pt-4 text-center text-sm text-orange-600">
            <p>This report is provided for informational purposes only.</p>
            <p>© {new Date().getFullYear()} Vastu Consultation Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableReport;
