import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import html2canvas from "html2canvas";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Trash2,
  Save,
  MapPin,
  Compass,
  Image,
  RotateCcw,
  Maximize,
  MinusCircle,
  PlusCircle,
  Edit,
  Eye,
} from "lucide-react";
import AngleTrackingCompass from "../components/AngleTrackingCompass";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getCompassDirection = (angle) => {
  const directions = [
    { range: [348.75, 360], name: "N" },
    { range: [0, 11.25], name: "N" },
    { range: [11.25, 33.75], name: "NNE" },
    { range: [33.75, 56.25], name: "NE" },
    { range: [56.25, 78.75], name: "ENE" },
    { range: [78.75, 101.25], name: "E" },
    { range: [101.25, 123.75], name: "ESE" },
    { range: [123.75, 146.25], name: "SE" },
    { range: [146.25, 168.75], name: "SSE" },
    { range: [168.75, 191.25], name: "S" },
    { range: [191.25, 213.75], name: "SSW" },
    { range: [213.75, 236.25], name: "SW" },
    { range: [236.25, 258.75], name: "WSW" },
    { range: [258.75, 281.25], name: "W" },
    { range: [281.25, 303.75], name: "WNW" },
    { range: [303.75, 326.25], name: "NW" },
    { range: [326.25, 348.75], name: "NNW" },
  ];

  const matchedDirection = directions.find(
    (dir) => angle >= dir.range[0] && angle < dir.range[1]
  );

  return matchedDirection ? matchedDirection.name : "N";
};

export default function FloorPlanAnnotator({ onRoomsChange }) {
  const containerRef = useRef(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [compassAngle, setCompassAngle] = useState(0);
  const [needleAngle, setNeedleAngle] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [northOrientation, setNorthOrientation] = useState(0);
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [compassSize, setCompassSize] = useState(250);
  const [rangeValues, setRangeValues] = useState({
    startAngle: 0,
    endAngle: 0,
    angleDifference: 0,
  });
  const [roomDetails, setRoomDetails] = useState({ text: "", note: "" });
  const [isCompassVisible, setIsCompassVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("draw");
  const [viewMode, setViewMode] = useState("edit");
  const [zoom, setZoom] = useState(100);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();
  const raw_img = localStorage.getItem("raw_img");

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error("Not authenticated");
        navigate("/");
      } else if (!localStorage.getItem("projectName")) {
        toast.error("Create a project first");
        navigate("/");
      }
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    onRoomsChange?.(rooms);
  }, [rooms, onRoomsChange]);

  useEffect(() => {
    // Handle responsiveness
    const handleResize = () => {
      // Adjust compass size based on screen width
      if (window.innerWidth < 768) {
        setCompassSize(Math.min(180, compassSize));
        setIsCompassVisible(false);
      } else if (window.innerWidth < 1024) {
        setCompassSize(Math.min(200, compassSize));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAnnotations = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/floorplan/getannotations/${localStorage.getItem(
          "floorId"
        )}`
      );
      console.log("Fetched Annotations:", response.data.annotations);
      return response.data.annotations.annotations;
    } catch (error) {
      console.error("Error fetching annotations:", error);
      return [];
    }
  };

  useEffect(() => {
    if (userRole === "CONSULTANT") {
      const fetchAndSetAnnotations = async () => {
        const annot = await fetchAnnotations();
        setRooms(annot);
      };

      fetchAndSetAnnotations();
    }
  }, [userRole]);

  useEffect(() => {
    const fetchAssetNames = async () => {
      const assets = await axios.get(`${BACKEND_URL}/api/v1/assets`);
      console.log("Fetched Asset Names:", assets.data);
      setAssets(assets.data);
    };
    fetchAssetNames();
  }, []);

  const calculateRoomAngle = (roomAngle) => {
    // Adjust room angle based on north orientation
    let adjustedAngle = roomAngle - northOrientation;
    if (adjustedAngle < 0) adjustedAngle += 360;
    if (adjustedAngle >= 360) adjustedAngle -= 360;
    return adjustedAngle;
  };

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

  const startDrawing = (event) => {
    if (viewMode !== "edit" || activeTab !== "draw") return;
    const coords = calculateRelativeCoordinates(event);
    setIsDrawing(true);
    setStartPoint(coords);
    setSelectedRoomIndex(null);
  };

  const draw = (event) => {
    if (
      !isDrawing ||
      !startPoint ||
      viewMode !== "edit" ||
      activeTab !== "draw"
    )
      return;

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
      start: rangeValues.startAngle,
      end: rangeValues.endAngle,
    });
  };

  const endDrawing = () => {
    if (viewMode !== "edit" || activeTab !== "draw") return;
    if (currentRoom && currentRoom.width > 0 && currentRoom.height > 0) {
      const adjustedAngle = calculateRoomAngle(compassAngle);
      setRooms([
        ...rooms,
        {
          ...currentRoom,
          orientation: getCompassDirection(adjustedAngle),
        },
      ]);
      setSelectedRoomIndex(rooms.length);
      setActiveTab("details");
    }
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRoom(null);
  };

  const captureAnnotatedImage = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      setLoading(true);
      // Temporarily hide UI elements for capture
      setIsCompassVisible(false);
      setViewMode("preview");

      // Wait for UI to update
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(container, {
            useCORS: true,
            scale: 2,
            backgroundColor: null,
            logging: false,
          });
          const image = canvas.toDataURL("image/png");

          if (image) {
            const base64String = image.split(",")[1];
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/png" });
            const formData = new FormData();
            const annotations = rooms.map((room) => ({
              text: room.text,
              note: room.note,
              start: Number(room.start),
              end: Number(room.end),
              orientation: room.orientation,
              startX: Number(room.startX),
              startY: Number(room.startY),
              width: Number(room.width),
              height: Number(room.height),
            }));

            formData.append("userName", localStorage.getItem("username"));
            formData.append("projectName", localStorage.getItem("projectName"));
            formData.append("image", blob, "capturedImage.png");
            formData.append("floorNum", localStorage.getItem("floornum"));
            formData.append("type", "annotated");
            formData.append("floorId", localStorage.getItem("floorId"));
            formData.append("rooms", JSON.stringify(annotations));

            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/floorplan/image-upload/${localStorage.getItem(
                  "projectId"
                )}`,
                formData,
                {
                  withCredentials: true,
                }
              );
              const data = await response.data;
              toast.success("Plan saved successfully!");
              setLoading(false);
              if (userRole === "CONSULTANT") {
                navigate("/floorplans");
              }
              navigate("/profile");
            } catch (error) {
              toast.error("Error uploading the image");
              setViewMode("edit");
              setIsCompassVisible(true);
              setLoading(false);
            }
          } else {
            toast.error("No image available for upload");
            setViewMode("edit");
            setIsCompassVisible(true);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error capturing image:", error);
          setViewMode("edit");
          setIsCompassVisible(true);
          setLoading(false);
        }
      }, 300);
    } catch (error) {
      console.error("Error capturing image:", error);
      setViewMode("edit");
      setIsCompassVisible(true);
      setLoading(false);
    }
  };

  const saveRoomDetails = () => {
    if (selectedRoomIndex !== null) {
      const updatedRooms = [...rooms];
      const adjustedAngle = calculateRoomAngle(compassAngle);

      updatedRooms[selectedRoomIndex] = {
        ...updatedRooms[selectedRoomIndex], // Keep existing position/size
        ...roomDetails, // Add new text/note
        angle: adjustedAngle, // Add calculated angle
        orientation: getCompassDirection(adjustedAngle),
        start: rangeValues.startAngle,
        end: rangeValues.endAngle,
      };

      setRooms(updatedRooms);
      setRoomDetails({ text: "", note: "" });
      setActiveTab("draw");
    }
  };

  const deleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
    setSelectedRoomIndex(null);
    setActiveTab("draw");
  };

  const clearRooms = () => {
    if (confirm("Are you sure you want to clear all rooms?")) {
      setRooms([]);
      setCurrentRoom(null);
      setSelectedRoomIndex(null);
      setRoomDetails({ text: "", note: "" });
    }
  };

  const toggleCompass = () => {
    setIsCompassVisible(!isCompassVisible);
  };

  const handleRoomClick = (index) => {
    setSelectedRoomIndex(index);
    setRoomDetails({
      text: rooms[index].text || "",
      note: rooms[index].note || "",
    });
    setActiveTab("details");
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Top Action Bar */}
      <div className="flex w-full max-w-5xl justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "edit" ? "default" : "outline"}
            onClick={() => setViewMode("edit")}
            size="sm"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            onClick={() => setViewMode("preview")}
            size="sm"
          >
            <Eye className="h-4 w-4 mr-1" /> Preview
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleCompass}
            className="md:hidden"
          >
            <Compass
              className={`h-4 w-4 ${isCompassVisible ? "text-orange-500" : ""}`}
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4">
        {/* Main Content Area */}
        <div className="flex-grow">
          <Card className="w-full mx-auto">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Floor Plan Annotator</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearRooms}>
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                  </Button>
                  {loading ? (
                    <Button disabled size="sm">
                      <Oval
                        height={16}
                        width={16}
                        color="#ffffff"
                        visible={true}
                        secondaryColor="#cccccc"
                        strokeWidth={4}
                      />
                      <span className="ml-2">Saving...</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={captureAnnotatedImage}
                    >
                      <Save className="h-4 w-4 mr-1" /> Save Plan
                    </Button>
                  )}
                </div>
              </div>
              <CardDescription>
                {viewMode === "edit"
                  ? "Draw rooms by clicking and dragging on the floor plan"
                  : "Preview how your annotated floor plan will look"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={containerRef}
                className="relative border border-gray-300 transition-all duration-200"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                  height: `${zoom}%`,
                  width: `${zoom}%`,
                }}
              >
                <img
                  src={localStorage.getItem("raw_img") || "/example6.png"}
                  alt="Floor Plan"
                  className="w-full"
                />

                {currentRoom && viewMode === "edit" && (
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

                {rooms.map((room, index) => (
                  <div
                    key={index}
                    className={`absolute border-2 ${
                      selectedRoomIndex === index
                        ? "border-red-500"
                        : viewMode === "preview"
                        ? "border-transparent"
                        : "border-green-500"
                    } 
                    ${viewMode === "preview" ? "bg-green-50" : "bg-green-100"} 
                    bg-opacity-30 
                    ${viewMode === "edit" ? "cursor-pointer" : ""}`}
                    style={{
                      left: `${room.startX}%`,
                      top: `${room.startY}%`,
                      width: `${room.width}%`,
                      height: `${room.height}%`,
                      transition: "all 0.2s ease",
                    }}
                    onClick={() =>
                      viewMode === "edit" && handleRoomClick(index)
                    }
                  >
                    {room.text && (
                      <div
                        className={`absolute top-0 left-0 bg-white bg-opacity-90 p-2 text-sm font-bold shadow-lg ${
                          viewMode === "preview"
                            ? "rounded-md border border-gray-200"
                            : ""
                        }`}
                        style={{ maxWidth: "100%", wordBreak: "break-word" }}
                      >
                        <div className="text-lg font-extrabold mb-1 text-orange-600">
                          {room.text}
                        </div>
                        {viewMode === "edit" && (
                          <div className="text-xs text-gray-700">
                            <div>
                              Orientation: {room.orientation} ({room.angle}°)
                            </div>
                            <div>Start Angle: {room.start}°</div>
                            <div>End Angle: {room.end}°</div>
                          </div>
                        )}
                        {room.note && (
                          <div className="mt-1 text-xs italic text-gray-600">
                            {viewMode === "edit" ? "Notes: " : ""}
                            {room.note}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="text-sm text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                {rooms.length} {rooms.length === 1 ? "room" : "rooms"} marked
              </div>
              <Button size="sm" variant="outline" onClick={() => setZoom(100)}>
                <Maximize className="h-4 w-4 mr-1" /> Reset zoom
              </Button>
            </CardFooter>
          </Card>

          {/* Room Details Section - Only shown when a room is selected or created */}
          {rooms.length > 0 && viewMode === "edit" && (
            <Card className="w-full mx-auto mt-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {selectedRoomIndex !== null
                      ? `Edit Room ${selectedRoomIndex + 1}`
                      : "Room Details"}
                  </CardTitle>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="draw">Draw</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="details">
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Room Name
                        </label>
                        <select
                          value={roomDetails.text}
                          onChange={(e) =>
                            setRoomDetails((prev) => ({
                              ...prev,
                              text: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full p-2 border rounded"
                        >
                          <option value="" disabled>
                            Enter room name
                          </option>
                          {assets.map((asset) => {
                            return (
                              <option key={asset} value={asset}>
                                {asset}
                              </option>
                            );
                          })}
                        </select>
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
                      <div className="flex justify-between items-center flex-wrap gap-y-4">
                        <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-4">
                          <div>
                            Direction:{" "}
                            <span className="font-semibold">
                              {getCompassDirection(compassAngle)}
                            </span>
                          </div>
                          <div>
                            Angle:{" "}
                            <span className="font-semibold">
                              {compassAngle}°
                            </span>
                          </div>
                          <div>
                            Start:{" "}
                            <span className="font-semibold">
                              {rangeValues.startAngle}°
                            </span>
                          </div>
                          <div>
                            End:{" "}
                            <span className="font-semibold">
                              {rangeValues.endAngle}°
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={saveRoomDetails}
                            disabled={!roomDetails.text}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            <Save className="mr-2 h-4 w-4" /> Save
                          </Button>
                          {selectedRoomIndex !== null && (
                            <Button
                              variant="destructive"
                              onClick={() => deleteRoom(selectedRoomIndex)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="draw">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600">
                          Click and drag on the floor plan to create a new room
                        </p>
                        {rooms.length > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Click on any existing room to edit its details
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                        {rooms.map((room, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className={
                              selectedRoomIndex === idx
                                ? "border-orange-500 bg-orange-50"
                                : ""
                            }
                            onClick={() => handleRoomClick(idx)}
                          >
                            <div className="truncate text-sm">
                              {room.text || `Room ${idx + 1}`}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>

        {/* Sidebar for Compass (visible on desktop, toggleable on mobile) */}
        {isCompassVisible && (
          <div
            className={`
            md:w-72 w-full bg-white rounded-lg shadow-md p-4
            fixed md:relative bottom-0 left-0 right-0 z-10 md:z-0
            md:h-auto border border-gray-200
            ${viewMode === "preview" ? "hidden" : ""}
          `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700 flex items-center">
                <Compass className="h-4 w-4 mr-2 text-orange-500" /> Orientation
                Tool
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleCompass}
                className="md:hidden"
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col items-center">
              <AngleTrackingCompass
                onNeedleAngleChange={(angle) => setNeedleAngle(angle)}
                onCompassAngleChange={(angle) => setCompassAngle(angle)}
                onRangeChange={(values) => setRangeValues(values)}
                imageUrl={raw_img}
                compassSize={compassSize}
              />

              <div className="mt-2 text-sm text-gray-600 text-center">
                Mark the entrance
              </div>

              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compass Size
                </label>
                <Slider
                  defaultValue={[compassSize]}
                  max={350}
                  min={150}
                  step={10}
                  onValueChange={(value) => setCompassSize(value[0])}
                  className="w-full"
                />
              </div>

              <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded w-full">
                <p>
                  Current direction:{" "}
                  <span className="font-medium">
                    {getCompassDirection(compassAngle)}
                  </span>
                </p>
                <p>
                  Angle: <span className="font-medium">{compassAngle}°</span>
                </p>
                <p>
                  Range:{" "}
                  <span className="font-medium">
                    {rangeValues.startAngle}° - {rangeValues.endAngle}°
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
