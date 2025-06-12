import React, { useState, useEffect } from "react";
import { Info, ChevronDown, ChevronUp, Compass, Home } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import checkAuthStatus from "@/hooks/userSession";

const ViewReport = () => {
  const { projectId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFloor, setActiveFloor] = useState(null);
  const [expandedRooms, setExpandedRooms] = useState({});
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { isAuthenticated, isLoading } = checkAuthStatus();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        if (!projectId) {
          throw new Error("Project ID not found in URL params");
        }

        setLoading(true);
        const response = await fetch(
          `${BACKEND_URL}/api/v1/report/projectreport/${projectId}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setReportData(data);
          setActiveFloor(data[0].floornumber);
        }
      } catch (error) {
        setError("Failed to load report data. Please try again later.");
        toast.error("Could not load report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [BACKEND_URL, projectId]);

  const toggleRoomExpansion = (floorNumber, roomName) => {
    const key = `${floorNumber}-${roomName}`;
    setExpandedRooms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isRoomExpanded = (floorNumber, roomName) => {
    const key = `${floorNumber}-${roomName}`;
    return !!expandedRooms[key];
  };

  const getDirectionColor = (direction) => {
    const directionColors = {
      N: "bg-secondary-100 text-secondary-800",
      S: "bg-destructive-100 text-destructive-800",
      E: "bg-primary-100 text-primary-800",
      W: "bg-accent-100 text-accent-800",
      NE: "bg-secondary-200 text-secondary-900",
      NW: "bg-secondary-50 text-secondary-700",
      SE: "bg-destructive-50 text-destructive-700",
      SW: "bg-accent-50 text-accent-700",
      C: "bg-success-100 text-success-800",
      NNE: "bg-secondary-150 text-secondary-800",
      ENE: "bg-primary-150 text-primary-800",
      ESE: "bg-primary-50 text-primary-700",
      SSE: "bg-destructive-150 text-destructive-800",
      SSW: "bg-accent-150 text-accent-800",
      WSW: "bg-accent-200 text-accent-900",
      WNW: "bg-secondary-200 text-secondary-900",
      NNW: "bg-secondary-50 text-secondary-700",
    };
    return directionColors[direction] || "bg-neutral-100 text-neutral-800";
  };

  const getDirectionFullName = (code) => {
    const directions = {
      N: "North",
      S: "South",
      E: "East",
      W: "West",
      NE: "North East",
      NW: "North West",
      SE: "South East",
      SW: "South West",
      C: "Center",
      NNE: "North-North-East",
      ENE: "East-North-East",
      ESE: "East-South-East",
      SSE: "South-South-East",
      SSW: "South-South-West",
      WSW: "West-South-West",
      WNW: "West-North-West",
      NNW: "North-North-West",
    };
    return directions[code] || code;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-primary-600">
          <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="text-lg font-medium">Loading report...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-destructive-100/30 shadow-medium">
          <h2 className="text-xl font-semibold text-destructive-700 mb-3">
            Error
          </h2>
          <p className="text-destructive-600 mb-6">{error}</p>
          <button
            className="
              px-4 py-2 bg-primary-600 text-white rounded-xl font-medium
              hover:bg-primary-700 transition-all duration-200 hover:shadow-soft
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-medium border border-primary-100/30 overflow-hidden animate-fade-in">
          {/* Header Banner */}
          <div className="bg-primary-50 p-4 sm:p-5 text-neutral-900">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Vastu Analysis Report
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Floor Tabs */}
          <div className="bg-neutral-50 border-b border-neutral-100/50 overflow-x-auto">
            <div className="flex p-2 sm:p-3 gap-2 min-w-max">
              {reportData.map((floor) => (
                <button
                  key={floor.floornumber}
                  onClick={() => setActiveFloor(floor.floornumber)}
                  className={`
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-medium
                    transition-all duration-200 flex items-center gap-2
                    ${
                      activeFloor === floor.floornumber
                        ? "bg-primary-600 text-white shadow-soft"
                        : "bg-white text-neutral-700 hover:bg-primary-50"
                    }
                  `}
                >
                  <Home className="size-4 sm:size-5" />
                  Floor {floor.floornumber}
                </button>
              ))}
            </div>
          </div>

          {/* Floor Content */}
          <div className="p-4 sm:p-6">
            {reportData.map(
              (floor) =>
                floor.floornumber === activeFloor && (
                  <div
                    key={floor.floornumber}
                    className="space-y-4 animate-slide-up"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                      Floor {floor.floornumber} Analysis
                    </h3>
                    {floor.report.length === 0 ? (
                      <div className="text-center p-6 bg-neutral-50 rounded-xl border border-neutral-100/50">
                        <p className="text-neutral-600 text-sm">
                          No analysis data available for this floor.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {floor.report.map((item, index) => (
                          <div
                            key={`${item.room}-${index}`}
                            className="
                              bg-white border border-primary-100/50 rounded-xl overflow-hidden
                              shadow-soft hover:shadow-medium transition-all duration-300
                              group
                            "
                          >
                            <div
                              className={`
                                p-3 sm:p-4 flex justify-between items-center cursor-pointer
                                ${
                                  isRoomExpanded(
                                    floor.floornumber,
                                    `${item.room}-${index}`
                                  )
                                    ? "bg-primary-50"
                                    : "hover:bg-primary-50/50"
                                }
                              `}
                              onClick={() =>
                                toggleRoomExpansion(
                                  floor.floornumber,
                                  `${item.room}-${index}`
                                )
                              }
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <h4 className="text-sm sm:text-base font-semibold text-neutral-900 capitalize">
                                  {item.room}
                                </h4>
                                {item.description && (
                                  <span className="text-xs sm:text-sm text-neutral-600 italic">
                                    {item.description}
                                  </span>
                                )}
                                <span
                                  className={`
                                    py-1 px-2 rounded-md text-xs font-medium
                                    inline-flex items-center ${getDirectionColor(
                                      item.direction
                                    )}
                                  `}
                                >
                                  <Compass className="size-3 mr-1" />
                                  {getDirectionFullName(item.direction)}
                                </span>
                              </div>
                              {isRoomExpanded(
                                floor.floornumber,
                                `${item.room}-${index}`
                              ) ? (
                                <ChevronUp className="size-5 text-primary-600 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="size-5 text-primary-600 flex-shrink-0" />
                              )}
                            </div>
                            {isRoomExpanded(
                              floor.floornumber,
                              `${item.room}-${index}`
                            ) && (
                              <div className="p-3 sm:p-4 bg-neutral-50 space-y-3">
                                <div>
                                  <h5 className="text-sm font-semibold text-neutral-900 flex items-center">
                                    <Info className="size-4 mr-2 text-primary-600" />
                                    Impact
                                  </h5>
                                  <p className="text-sm text-neutral-700 pl-6">
                                    {item.impact}
                                  </p>
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-neutral-900 flex items-center">
                                    <Info className="size-4 mr-2 text-primary-600" />
                                    Remedy
                                  </h5>
                                  <p className="text-sm text-neutral-700 pl-6">
                                    {item.remedy}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100/50 p-4 sm:p-5 text-center text-xs text-neutral-600 bg-neutral-50">
            <p>This report is provided for informational purposes only.</p>
            <p>© {new Date().getFullYear()} Vastu Consultation Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
