import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, Layers } from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

function FloorForm() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [floorNum, setFloorNum] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const navigate = useNavigate();
  const { projectName } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const username = localStorage.getItem("username");
  const maxFloors = localStorage.getItem("floorcount");
  const projectId = localStorage.getItem("projectId");

  useEffect(() => {
    if (
      !isLoading &&
      (!isAuthenticated || userRole === "CONSULTANT" || !projectName)
    ) {
      toast.error("Not authorized or no project");
      navigate("/");
    }
  }, [isLoading, isAuthenticated, userRole, projectName, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadFunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (floorNum > maxFloors || !floorNum || floorNum <= 0) {
      toast.error("Invalid floor number");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("projectName", projectName);
    formData.append("userName", username);
    formData.append("floorNum", floorNum);
    formData.append("type", "raw");
    formData.append("description", description);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/floorplan/image-upload/${projectId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const data = response.data;
      localStorage.setItem("floorId", data.floorId.id);
      localStorage.setItem("raw_img", data.imageURL.url);
      localStorage.setItem("projectName", projectName);
      localStorage.setItem("floornum", floorNum);
      toast.success("Image uploaded");
      navigate("/editedimg");
    } catch (error) {
      toast.error("Error uploading image");
      setLoading(false);
    }
  };

  const isFormValid = image && floorNum && floorNum > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20 py-8 px-4 pt-0 flex items-center justify-center">
      <div className="w-1/2">
        {/* Header Section */}
        <div className="text-center mb-2 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-2 shadow-lg">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Upload Floor Plan
          </h1>
          <p className="text-neutral-600 text-lg">
            Submit your floor plan for Vastu consultation
          </p>
        </div>

        {/* Main Form */}
        <Card className="bg-white/90 backdrop-blur-sm border border-neutral-200/50 shadow-xl rounded-2xl animate-slide-up">
          <CardContent className="p-8 space-y-8">
            {/* File Upload Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                  <Upload className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Floor Plan Image
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Upload a clear image of your floor plan
                  </p>
                </div>
              </div>
              <div className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 hover:border-primary-400 transition-all duration-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-center text-neutral-600 text-sm">
                  {image ? image.name : "Drag & drop or click to upload image"}
                </p>
              </div>
              {image && (
                <p className="text-sm text-success-600 mt-2 animate-fade-in">
                  Image selected: {image.name}
                </p>
              )}
            </div>

            {/* Form Inputs */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-3">
                  <Layers className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Floor Details
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Provide details about your floor plan
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="floorNum"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-2 text-neutral-500" />
                    Floor Number
                  </Label>
                  <Input
                    type="number"
                    id="floorNum"
                    placeholder="Enter floor number"
                    min="1"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl transition-all duration-200"
                    value={floorNum}
                    onChange={(e) => setFloorNum(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-2 text-neutral-500" />
                    Description
                    <span className="text-neutral-400 ml-1">(Optional)</span>
                  </Label>
                  <Input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl transition-all duration-200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="border-t border-neutral-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" />
                  <span>Your data is secure and encrypted</span>
                </div>
                <Button
                  onClick={uploadFunction}
                  disabled={!isFormValid || loading}
                  className="
                    group flex items-center space-x-2 px-8 py-3
                    bg-gradient-to-r from-primary-600 to-primary-500
                    hover:from-primary-700 hover:to-primary-600
                    disabled:from-neutral-300 disabled:to-neutral-400
                    text-white font-semibold rounded-xl
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 transform
                    hover:-translate-y-0.5 hover:scale-105
                    disabled:hover:transform-none disabled:hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  "
                >
                  {loading ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      secondaryColor="#ffffff"
                      strokeWidth={4}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <>
                      <Upload className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                      <span>Upload & Proceed</span>
                    </>
                  )}
                </Button>
              </div>
              {!isFormValid && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Please upload an image and enter a valid floor number.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FloorForm;
