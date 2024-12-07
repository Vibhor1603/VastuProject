import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js";
import Compass from "../components/Compass";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuthStatus from "@/hooks/userSession";
import { Oval } from "react-loader-spinner";

const CompassOverlay = () => {
  const backgroundImage = localStorage.getItem("raw_img");
  //   const [backgroundImage, setBackgroundImage] = useState(null);
  const [exportedImage, setExportedImage] = useState(null);
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [uploadedImage, setUploadedImage] = React.useState();
  const [imageUrl, setImageUrl] = React.useState(null);
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const [loading, setLoading] = React.useState(false);
  const [Analysisloading, setAnalysisLoading] = React.useState(false);
  const formData = new FormData();
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

  //   const handleImageUpload = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setBackgroundImage(localStorage);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const captureImage = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current, {
          backgroundColor: null,
          scale: 2, // Higher quality
          logging: false,
          useCORS: true,
        });
        const image = canvas.toDataURL("image/png");
        setExportedImage(image);
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    }
  };
  const id = localStorage.getItem("projectId");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if `exportedImage` exists (data URL)
    if (exportedImage) {
      // Convert base64 to Blob
      const base64String = exportedImage.split(",")[1];
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
          "http://localhost:3000/api/v1/floorplan/image-upload",
          formData
        );
        const data = await response.data;

        // Check and set the returned image URL
        if (data.imageURL && data.imageURL.url) {
          // setImageUrl(data.imageURL.url);
          localStorage.setItem("marked_img", data.imageURL.url);
          alert("Image uploaded successfully!");
          setLoading(false);
          navigate("/annotate");
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
  };

  // const sendForAnalysis = async () => {
  //   setAnalysisLoading(true);
  //   if (exportedImage) {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:3000/api/v1/floorplan/new-floorplan/${id}`,

  //         {
  //           floorNumber: Number(localStorage.getItem("floornum")),
  //           description: localStorage.getItem("description"),
  //           markedImg: imageUrl,
  //           rawImg: localStorage.getItem("raw_img"),
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setAnalysisLoading(false);
  //       navigate("/profile");
  //       alert("Image sent for analysis!");
  //     } catch (error) {
  //       console.error("Error storing image in localStorage:", error);
  //       setAnalysisLoading(false);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <Card className="p-2 w-full max-w-3xl">
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-square" ref={containerRef}>
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Compass
                // imageUrl={backgroundImage}
                onNeedleAngleChange={(newAngle) => setAngle(newAngle)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              Current Angle: {Math.round(angle)}°
            </div>
            <Button
              onClick={captureImage}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Capture Current View
            </Button>
          </div>
        </div>
      </Card>

      {exportedImage && (
        <Card className="p-4 w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Captured Result</h3>
            <img
              src={exportedImage}
              alt="Captured compass overlay"
              className="w-full h-auto border rounded-lg"
            />
            {loading ? (
              <Oval
                height={20}
                width={20}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={8}
                strokeWidthSecondary={2}
              />
            ) : (
              <Button
                onClick={handleUpload}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit floor plan
              </Button>
            )}
            {Analysisloading ? (
              <Oval
                height={20}
                width={20}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={8}
                strokeWidthSecondary={2}
              />
            ) : // <Button
            //   onClick={sendForAnalysis}
            //   className="bg-green-600 hover:bg-green-700 text-white"
            // >
            //   Send for Analysis
            // </Button>
            null}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CompassOverlay;
