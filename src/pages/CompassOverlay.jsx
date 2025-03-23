import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js";
import Compass from "../components/Compass";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuthStatus from "@/hooks/userSession";
import {
  Camera,
  ArrowRight,
  Compass as CompassIcon,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const CompassOverlay = () => {
  const backgroundImage = localStorage.getItem("raw_img");
  const role = localStorage.getItem("ROLE");
  const oldCompassAngle = localStorage.getItem("compass_angle");
  const oldIndicatorAngle = localStorage.getItem("indicator_angle");

  const containerRef = useRef(null);
  const [angle, setAngle] = useState(
    role === "CONSULTANT" ? Number(oldIndicatorAngle) : 0
  );
  const [compassAngle, setCompassAngle] = useState(
    role === "CONSULTANT" ? Number(oldCompassAngle) : 0
  );
  const [compassSize, setCompassSize] = useState(400);
  const [exportedImage, setExportedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLoading &&
      (!isAuthenticated || !localStorage.getItem("projectName"))
    ) {
      toast.error(
        isAuthenticated ? "Create a project first" : "Not authenticated"
      );
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const captureImage = async () => {
    if (!containerRef.current) return;

    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png");
      setExportedImage(image);
      toast.success("Image captured successfully!");
    } catch (error) {
      console.error("Error capturing image:", error);
      toast.error("Failed to capture image");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!exportedImage) {
      toast.error("Please capture an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    try {
      const base64String = exportedImage.split(",")[1];
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: "image/png" });

      formData.append("userName", localStorage.getItem("username"));
      formData.append("projectName", localStorage.getItem("projectName"));
      formData.append("image", blob, "capturedImage.png");
      formData.append("floorNum", localStorage.getItem("floornum"));
      formData.append("marked_compass_angle", compassAngle);
      formData.append("marked_indicator_angle", angle);
      formData.append("floorId", localStorage.getItem("floorId"));
      formData.append("type", "marked");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/floorplan/image-upload/${localStorage.getItem(
          "projectId"
        )}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        if (role === "CONSULTANT") {
          navigate("/floorplans");
        } else {
          navigate("/annotate");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800 mb-2">
            Floor Plan Compass Alignment
          </h1>
          <p className="text-orange-600">
            Align the compass with your floor plan and mark the entrance
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left Control Panel */}
          <Card className="md:col-span-3 bg-white/90 backdrop-blur border-orange-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <CompassIcon className="w-5 h-5" />
                Compass Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-orange-700 mb-2">
                  Adjust Compass Size
                </label>
                <Slider
                  defaultValue={[compassSize]}
                  min={200}
                  max={600}
                  step={10}
                  onValueChange={(values) => setCompassSize(values[0])}
                  className="w-full"
                />
                <span className="text-sm text-orange-600 mt-1 block">
                  {compassSize}px
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-orange-50">
                  <p className="text-sm font-medium text-orange-800">
                    Compass Angle
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(compassAngle)}°
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50">
                  <p className="text-sm font-medium text-orange-800">
                    Entrance Angle
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(angle)}°
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Compass Area */}
          <Card className="md:col-span-9 bg-white/90 backdrop-blur border-orange-100 shadow-lg">
            <CardContent className="p-4">
              <div className="relative w-full aspect-square" ref={containerRef}>
                {backgroundImage && (
                  <img
                    src={backgroundImage}
                    alt="Floor Plan"
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Compass
                    onNeedleAngleChange={setAngle}
                    onCompassAngleChange={setCompassAngle}
                    compassSize={compassSize}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 p-4 bg-orange-50/50">
              <Button
                onClick={captureImage}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                disabled={loading}
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture View
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Captured Image Preview */}
        {exportedImage && (
          <Card className="mt-6 bg-white/90 backdrop-blur border-orange-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-800">Captured Result</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={exportedImage}
                alt="Captured compass overlay"
                className="w-full h-auto rounded-lg border border-orange-100 shadow-sm"
              />
            </CardContent>
            <CardFooter className="flex justify-end p-4 bg-orange-50/50">
              <Button
                onClick={handleUpload}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompassOverlay;
