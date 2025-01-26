import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Edit, Save, CheckCircle, Info } from "lucide-react";
import toast from "react-hot-toast";
import checkAuthStatus from "@/hooks/userSession";

const Report = () => {
  const { plan } = useParams();
  const [annotations, setAnnotations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomNote, setSelectedRoomNote] = useState("");
  const [remark, setRemark] = useState("");
  const [remedy, setRemedy] = useState("");
  const [reports, setReports] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { isAuthenticated, isLoading, userRole } = checkAuthStatus();

  //   useEffect(() => {
  //     if (!isLoading) {
  //       if (!isAuthenticated) {
  //         toast.error("not authenticated");
  //         navigate("/");
  //       } else if (isAuthenticated && userRole === "USER") {
  //         console.log(userRole);
  //         toast.error("not authenticated");
  //         navigate("/");
  //         console.log(isAuthenticated);
  //       } else if (!localStorage.getItem("projectName")) {
  //         toast.error("create a project first");
  //         navigate("/");
  //       }
  //     }
  //   }, [isLoading, isAuthenticated, navigate, userRole]);

  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/floorplan/getfloor/${plan}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setAnnotations(data.annotations);
      } catch (error) {
        toast.error("Error fetching annotations");
        console.error("Error fetching annotations:", error);
      }
    };

    fetchAnnotations();
  }, [plan]);

  const handleRoomSelection = (roomText) => {
    setSelectedRoom(roomText);

    const selectedAnnotation = annotations.find(
      (annotation) => annotation.text === roomText
    );

    setSelectedRoomNote(
      selectedAnnotation?.note || "No additional notes available"
    );
  };

  const saveReport = () => {
    if (!selectedRoom || !remark || !remedy) {
      toast.error("Please fill all fields before saving");
      return;
    }

    const newReport = {
      roomname: selectedRoom,
      remark,
      remedy,
    };

    if (editIndex !== null) {
      const updatedReports = [...reports];
      updatedReports[editIndex] = newReport;
      setReports(updatedReports);
      setEditIndex(null);
      toast.success("Report updated successfully");
    } else {
      setReports((prevReports) => [...prevReports, newReport]);
      toast.success("Report saved successfully");
    }

    setSelectedRoom("");
    setSelectedRoomNote("");
    setRemark("");
    setRemedy("");
  };

  const handleSubmit = async () => {
    if (reports.length === 0) {
      toast.error("No reports to submit. Please add at least one report");
      return;
    }

    try {
      await fetch(`${BACKEND_URL}/api/v1/floorplan/report/addreport/${plan}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reports }),
      });

      toast.success("All reports submitted successfully");
      setReports([]);
    } catch (error) {
      toast.error("Error submitting reports. Please try again later");
      console.error("Error submitting reports:", error);
    }
  };

  const editReport = (index) => {
    const reportToEdit = reports[index];
    setSelectedRoom(reportToEdit.roomname);
    setRemark(reportToEdit.remark);
    setRemedy(reportToEdit.remedy);

    // Find and set the room note when editing
    const selectedAnnotation = annotations.find(
      (annotation) => annotation.text === reportToEdit.roomname
    );
    setSelectedRoomNote(
      selectedAnnotation?.note || "No additional notes available"
    );

    setEditIndex(index);
  };

  const deleteReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
    toast.success("Report deleted successfully");
  };

  return (
    <div className="mt-10 p-6 max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
        <span>Report submission</span>
      </h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="room"
            className="block text-orange-800 font-semibold mb-2"
          >
            Select Room
          </label>
          <select
            id="room"
            className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            value={selectedRoom}
            onChange={(e) => handleRoomSelection(e.target.value)}
          >
            <option value="" disabled>
              Select a room
            </option>
            {annotations.length != 0 &&
              annotations.map((annotation, index) => (
                <option key={index} value={annotation.text}>
                  {annotation.text}
                </option>
              ))}
          </select>
        </div>

        {selectedRoom && (
          <div className="col-span-full bg-orange-100 border border-orange-300 rounded-lg p-4 flex items-start mb-4">
            <Info className="mr-3 mt-1 text-orange-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-orange-800 mb-2">Room Note</h3>
              <p className="text-orange-700">{selectedRoomNote}</p>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="remark"
            className="block text-orange-800 font-semibold mb-2"
          >
            Remark
          </label>
          <input
            id="remark"
            type="text"
            className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter remark"
          />
        </div>

        <div>
          <label
            htmlFor="remedy"
            className="block text-orange-800 font-semibold mb-2"
          >
            Remedy
          </label>
          <input
            id="remedy"
            type="text"
            className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={remedy}
            onChange={(e) => setRemedy(e.target.value)}
            placeholder="Enter remedy"
          />
        </div>

        <div className="flex items-end">
          <button
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center"
            onClick={saveReport}
          >
            {editIndex !== null ? (
              <>
                <Save className="mr-2" /> Update Report
              </>
            ) : (
              <>
                <CheckCircle className="mr-2" /> Save Report
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-1xl font-bold text-orange-700 mb-4">
          Saved Reports
        </h2>
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report, index) => {
              const selectedAnnotation = annotations.find(
                (annotation) => annotation.text === report.roomname
              );

              return (
                <div
                  key={index}
                  className="p-4 bg-orange-50 rounded-lg shadow-md border border-orange-300"
                >
                  <div className="mb-2">
                    <p>
                      <strong className="text-orange-800">Room:</strong>{" "}
                      {report.roomname}
                    </p>
                    {selectedAnnotation?.note && (
                      <p className="text-sm text-orange-600 italic flex items-center">
                        <Info className="mr-2 text-orange-500" size={16} />
                        {selectedAnnotation.note}
                      </p>
                    )}
                  </div>
                  <p>
                    <strong className="text-orange-800">Remark:</strong>{" "}
                    {report.remark}
                  </p>
                  <p>
                    <strong className="text-orange-800">Remedy:</strong>{" "}
                    {report.remedy}
                  </p>

                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => editReport(index)}
                      className="text-orange-600 hover:text-orange-800 transition-colors"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => deleteReport(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-orange-700 italic">No reports saved yet.</p>
        )}
      </div>

      <button
        className="mt-6 w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-all flex items-center justify-center"
        onClick={handleSubmit}
      >
        <CheckCircle className="mr-2" /> Submit All Reports
      </button>
    </div>
  );
};

export default Report;
