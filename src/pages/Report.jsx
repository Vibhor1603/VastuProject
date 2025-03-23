import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Download, Info, ChevronDown, ChevronUp, Compass } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import checkAuthStatus from "@/hooks/userSession";

const Report = () => {
  const { planID } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRooms, setExpandedRooms] = useState({});
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { isAuthenticated, isLoading, userRole } = checkAuthStatus();
  const reportRef = useRef();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_URL}/api/v1/floorplan/getfloor/${planID}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
          setReports(data.data);
        } else {
          setReports([]);
          setError("No report data available");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        setError("Failed to load report data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [planID, BACKEND_URL]);

  const toggleRoomExpansion = (roomName) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomName]: !prev[roomName],
    }));
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Vastu Report - ${new Date().toLocaleDateString()}`,
    onBeforeGetContent: () => {
      // Expand all rooms for printing
      const allExpanded = {};
      reports.forEach((report) => {
        allExpanded[report.room] = true;
      });
      setExpandedRooms(allExpanded);
      return new Promise((resolve) => setTimeout(resolve, 100));
    },
    onAfterPrint: () => {
      toast.success("Report saved as PDF successfully");
    },
    onPrintError: () => {
      toast.error("Failed to save PDF. Please try again.");
    },
  });

  const getDirectionColor = (direction) => {
    const directionColors = {
      North: "bg-blue-100 text-blue-800",
      South: "bg-red-100 text-red-800",
      East: "bg-purple-100 text-purple-800",
      West: "bg-yellow-100 text-yellow-800",
      Northeast: "bg-indigo-100 text-indigo-800",
      Northwest: "bg-cyan-100 text-cyan-800",
      Southeast: "bg-pink-100 text-pink-800",
      Southwest: "bg-amber-100 text-amber-800",
      Center: "bg-green-100 text-green-800",
    };

    return directionColors[direction] || "bg-gray-100 text-gray-800";
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
      </div>
    );
  }

  return (
    <div className="mt-10 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-700">Vastu Report</h1>
        <button
          onClick={handlePrint}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all flex items-center"
        >
          <Download className="mr-2" size={20} /> Save as PDF
        </button>
      </div>

      <div
        ref={reportRef}
        className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg rounded-2xl"
      >
        <div className="mb-8 text-center print:mb-6">
          <h2 className="text-2xl font-bold text-orange-800 mb-2 print:text-3xl">
            Vastu Analysis Report
          </h2>
          <p className="text-orange-600">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {reports.length > 0 ? (
          <div className="space-y-6 print:space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-200"
              >
                <div
                  className="p-4 bg-orange-200 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleRoomExpansion(report.room)}
                >
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-orange-800">
                      {report.room}
                    </h3>
                    <span
                      className={`ml-3 py-1 px-3 rounded-full text-xs font-medium ${getDirectionColor(
                        report.direction
                      )}`}
                    >
                      <span className="flex items-center">
                        <Compass size={14} className="mr-1" />
                        {report.direction}
                      </span>
                    </span>
                  </div>
                  {expandedRooms[report.room] ? (
                    <ChevronUp className="text-orange-800" />
                  ) : (
                    <ChevronDown className="text-orange-800" />
                  )}
                </div>

                {(expandedRooms[report.room] || true) && (
                  <div className="p-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                        <Info size={18} className="mr-2 text-orange-500" />{" "}
                        Impact
                      </h4>
                      <p className="text-gray-700 pl-6">{report.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">
                        Remedy
                      </h4>
                      <p className="text-gray-700 pl-6">{report.remedy}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-orange-700 text-lg">
              No report data available for this floor plan.
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-orange-200 pt-4 text-center text-sm text-orange-600 print:mt-12">
          <p>This report is provided for informational purposes only.</p>
          <p>© {new Date().getFullYear()} Vastu Consultation Services</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
