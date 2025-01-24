import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Save, MapPin } from "lucide-react";
import Compass from "../components/Compass";
import toast from "react-hot-toast";

// Function to convert angle to compass direction
const getCompassDirection = (angle) => {
  const directions = [
    { range: [337.5, 360], name: "N" },
    { range: [0, 22.5], name: "N" },
    { range: [22.5, 67.5], name: "NE" },
    { range: [67.5, 112.5], name: "E" },
    { range: [112.5, 157.5], name: "SE" },
    { range: [157.5, 202.5], name: "S" },
    { range: [202.5, 247.5], name: "SW" },
    { range: [247.5, 292.5], name: "W" },
    { range: [292.5, 337.5], name: "NW" },
  ];

  const matchedDirection = directions.find(
    (dir) => angle >= dir.range[0] && angle < dir.range[1]
  );

  return matchedDirection ? matchedDirection.name : "N";
};

export default function FloorPlanAnnotator({ onRoomsChange }) {
  const containerRef = useRef(null);
  const [Analysisloading, setAnalysisLoading] = React.useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [compassAngle, setCompassAngle] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [northOrientation, setNorthOrientation] = useState(0);
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [exportedImage, setExportedImage] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    text: "",
    note: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error("not authenticated");
        navigate("/");
      } else if (isAuthenticated && userRole === "CONSULTANT") {
        console.log(userRole);
        toast.error("not authenticated");
        navigate("/");
        console.log(isAuthenticated);
      } else if (!localStorage.getItem("projectName")) {
        toast.error("create a project first");
        navigate("/");
      }
    }
  }, [isLoading, isAuthenticated, navigate, userRole]);

  useEffect(() => {
    onRoomsChange?.(rooms);
  }, [rooms, onRoomsChange]);

  const calculateRelativeCoordinates = (event) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const imageElement = container.querySelector("img");
    const imageRect = imageElement.getBoundingClientRect();

    return {
      canvasX: ((event.clientX - rect.left) / rect.width) * 100,
      canvasY: ((event.clientY - rect.top) / rect.height) * 100,
      imageX: ((event.clientX - imageRect.left) / imageRect.width) * 100,
      imageY: ((event.clientY - imageRect.top) / imageRect.height) * 100,
    };
  };

  const calculateRoomAngle = (roomAngle) => {
    // Adjust room angle based on north orientation
    let adjustedAngle = roomAngle - northOrientation;
    if (adjustedAngle < 0) adjustedAngle += 360;
    if (adjustedAngle >= 360) adjustedAngle -= 360;
    return adjustedAngle;
  };

  const startDrawing = (event) => {
    const coords = calculateRelativeCoordinates(event);
    setIsDrawing(true);
    setStartPoint(coords);
    setSelectedRoomIndex(null);
  };

  const draw = (event) => {
    if (!isDrawing || !startPoint) return;

    const endCoords = calculateRelativeCoordinates(event);

    setCurrentRoom({
      startX: Math.min(startPoint.canvasX, endCoords.canvasX),
      startY: Math.min(startPoint.canvasY, endCoords.canvasY),
      width: Math.abs(endCoords.canvasX - startPoint.canvasX),
      height: Math.abs(endCoords.canvasY - startPoint.canvasY),
      angle: compassAngle,
      orientation: getCompassDirection(compassAngle),
      text: "",
      note: "",
    });
  };

  const endDrawing = () => {
    if (currentRoom && currentRoom.width > 0 && currentRoom.height > 0) {
      const adjustedAngle = calculateRoomAngle(compassAngle);
      setRooms([
        ...rooms,
        {
          ...currentRoom,
          angle: adjustedAngle,
          orientation: getCompassDirection(adjustedAngle),
        },
      ]);
      setSelectedRoomIndex(rooms.length);
    }
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRoom(null);
  };
  const id = localStorage.getItem("projectId");

  const sendForAnalysis = async () => {
    setAnalysisLoading(true);
    if (imageUrl) {
      try {
        const response = await axios.post(
          `https://vastubackend.onrender.com/api/v1/floorplan/new-floorplan/${id}`,

          {
            floorNumber: Number(localStorage.getItem("floornum")),
            description: localStorage.getItem("description"),
            markedImg: localStorage.getItem("marked_img"),
            rawImg: localStorage.getItem("raw_img"),
            annotatedImg: imageUrl,
          },
          {
            withCredentials: true,
          }
        );
        setAnalysisLoading(false);
        navigate("/profile");
        alert("Image sent for analysis!");
      } catch (error) {
        console.error("Error storing image in localStorage:", error);
        setAnalysisLoading(false);
      }
    }
  };
  const formData = new FormData();
  // const handleUpload = async () => {
  //   setLoading(true);

  //   // Check if `exportedImage` exists (data URL)
  //   if (exportedImage) {
  //     // Convert base64 to Blob
  //     const base64String = exportedImage.split(",")[1];
  //     const byteCharacters = atob(base64String);
  //     const byteNumbers = new Array(byteCharacters.length);

  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     const blob = new Blob([byteArray], { type: "image/png" });

  //     formData.append("userName", localStorage.getItem("username"));
  //     formData.append("projectName", localStorage.getItem("projectName"));
  //     formData.append("image", blob, "capturedImage.png");
  //     formData.append("floorNum", localStorage.getItem("floornum"));

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/v1/floorplan/image-upload",
  //         formData
  //       );
  //       const data = await response.data;

  //       // Check and set the returned image URL
  //       if (data.imageURL && data.imageURL.url) {
  //         setImageUrl(data.imageURL.url);
  //         alert("Image uploaded successfully!");
  //         setLoading(false);
  //       } else {
  //         console.error("Unexpected response format:", data);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading the image:", error);
  //       setLoading(false);
  //     }
  //   } else {
  //     console.error("No image available for upload.");
  //     setLoading(false);
  //   }
  // };

  const captureAnnotatedImage = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      // Configure html2canvas options
      const canvas = await html2canvas(container, {
        useCORS: true, // Enable CORS for external images
        scale: 2, // Increase quality
        backgroundColor: null, // Preserve transparency
        logging: false, // Disable logging
      });
      const image = canvas.toDataURL("image/png");
      // setExportedImage(image);
      setLoading(true);

      // Check if `exportedImage` exists (data URL)
      if (image) {
        // Convert base64 to Blob
        const base64String = image.split(",")[1];
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });

        formData.append("userName", localStorage.getItem("username"));
        formData.append("projectName", localStorage.getItem("projectName"));
        formData.append("image", blob, "capturedImage.png");
        formData.append("floorNum", localStorage.getItem("floornum"));

        try {
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/floorplan/image-upload`,
            formData
          );
          const data = await response.data;

          // Check and set the returned image URL
          if (data.imageURL && data.imageURL.url) {
            setImageUrl(data.imageURL.url);
            alert("Image uploaded successfully!");
            setLoading(false);
          } else {
            console.error("Unexpected response format:", data);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error uploading the image:", error);
          setLoading(false);
        }
      } else {
        console.error("No image available for upload.");
        setLoading(false);
      }

      // Convert canvas to blob
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const saveRoomDetails = () => {
    if (selectedRoomIndex !== null) {
      const updatedRooms = [...rooms];
      const adjustedAngle = calculateRoomAngle(compassAngle);

      updatedRooms[selectedRoomIndex] = {
        ...updatedRooms[selectedRoomIndex],
        ...roomDetails,
        angle: adjustedAngle,
        orientation: getCompassDirection(adjustedAngle),
      };
      setRooms(updatedRooms);
      setRoomDetails({ text: "", note: "" });
    }
  };

  const deleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
    setSelectedRoomIndex(null);
  };

  const clearRooms = () => {
    setRooms([]);
    setCurrentRoom(null);
    setSelectedRoomIndex(null);
    setRoomDetails({ text: "", note: "" });
  };

  return (
    <div className="flex flex-col ml-4 pl-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Floor Plan Annotator</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={containerRef}
            className="relative border border-gray-300"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          >
            <img
              src={localStorage.getItem("raw_img") || "/example6.png"}
              alt="Floor Plan"
              className="w-full"
            />

            {/* Current drawing room */}
            {currentRoom && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30"
                style={{
                  left: `${currentRoom.startX}%`,
                  top: `${currentRoom.startY}%`,
                  width: `${currentRoom.width}%`,
                  height: `${currentRoom.height}%`,
                }}
              />
            )}

            {/* Existing rooms */}
            {rooms.map((room, index) => (
              <div
                key={index}
                className={`absolute border-2 ${
                  selectedRoomIndex === index
                    ? "border-red-500"
                    : "border-green-500"
                } bg-green-100 bg-opacity-30`}
                style={{
                  left: `${room.startX}%`,
                  top: `${room.startY}%`,
                  width: `${room.width}%`,
                  height: `${room.height}%`,
                }}
                onClick={() => {
                  setSelectedRoomIndex(index);
                  setRoomDetails({
                    text: room.text || "",
                    note: room.note || "",
                  });
                }}
              >
                {/* Detailed Room Label */}
                {room.text && (
                  <div
                    className="absolute top-0 left-0 bg-white bg-opacity-90 p-2 text-sm font-bold shadow-lg"
                    style={{ maxWidth: "100%", wordBreak: "break-word" }}
                  >
                    <div className="text-lg font-extrabold mb-1">
                      {room.text}
                    </div>
                    <div className="text-xs text-gray-700">
                      <div>
                        Dimensions: {room.width.toFixed(2)}% x{" "}
                        {room.height.toFixed(2)}%
                      </div>
                      <div>
                        Orientation: {room.orientation} ({room.angle}°)
                      </div>
                    </div>
                    {room.note && (
                      <div className="mt-1 text-xs italic text-gray-600">
                        Notes: {room.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={clearRooms} variant="outline">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Rooms
          </Button>
          <div className="text-sm text-gray-500">Rooms: {rooms.length}</div>
        </CardFooter>
      </Card>

      {/* Room Details Section */}
      {rooms.length > 0 && (
        <Card className="w-full max-w-3xl mx-auto mt-4">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomDetails.text}
                  onChange={(e) =>
                    setRoomDetails((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                  placeholder="Enter room name"
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  value={roomDetails.note}
                  onChange={(e) =>
                    setRoomDetails((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  placeholder="Enter room notes"
                  className="mt-1 block w-full p-2 border rounded h-24"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Compass Direction: {getCompassDirection(compassAngle)}
                  <br />
                  Angle: {compassAngle}°
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={saveRoomDetails}
                    disabled={!roomDetails.text}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Details
                  </Button>
                  {selectedRoomIndex !== null && (
                    <Button
                      variant="destructive"
                      onClick={() => deleteRoom(selectedRoomIndex)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Room
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compass */}
      <div className="mx-auto mt-2 ml-5">
        <Compass
          onNeedleAngleChange={(angle) => setCompassAngle(angle)}
          imageUrl={"/example6.png"}
        />
      </div>
      <button className="bg-red" onClick={captureAnnotatedImage}>
        Capture
      </button>
      <button className="bg-red" onClick={sendForAnalysis}>
        Send for analysis
      </button>
    </div>
  );
}
