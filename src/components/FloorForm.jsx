import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import checkAuthStatus from "@/hooks/userSession";
import toast from "react-hot-toast";

function FloorForm() {
  const [imageUrl, setImageUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [floorNum, setFloorNum] = React.useState("");
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [submit, setSubmit] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  //  useEffect(() => {
  //    if (!isLoading && !isAuthenticated) {
  //      navigate("/");
  //    }
  //  }, [isAuthenticated, isLoading, navigate]);

  const formData = new FormData();

  const projectName = localStorage.getItem("projectName");
  const username = localStorage.getItem("username");
  const maxFloors = localStorage.getItem("floorcount");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    navigate("/editedimg");
  };
  const id = localStorage.getItem("projectId");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setImage(file);
  };

  const uploadFunction = async (e) => {
    e.preventDefault();
    if (floorNum > maxFloors) {
      toast.error("floor number exceeds the project limit");
      return;
    }
    if (!floorNum || floorNum <= 0) {
      toast.error("Floor number is not entered correctly!");
      return;
    }

    formData.append("image", image);
    formData.append("projectName", projectName);
    formData.append("userName", username);
    formData.append("floorNum", floorNum);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/floorplan/image-upload`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      setSubmit(true);
      toast.success("image uploaded");
      localStorage.setItem("floornum", floorNum);
      localStorage.setItem("description", description);
      localStorage.setItem("raw_img", data.imageURL.url);
    } catch (error) {
      console.error(error);
      toast.error("error uploading image");
    }
  };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post(
  //     `https://vastubackend.onrender.com/api/v1/floorplan/new-floorplan/${id}`,

  //     {
  //       floorNumber: Number(floorNum),
  //       description: description,
  //       floorPlan: imageUrl,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   navigate("/profile");
  // };

  return (
    <Card className="max-w-xl mx-auto mt-4 mb-4 border-2  ">
      <CardHeader>
        <CardTitle>Upload and Submit Floor Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {imageUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">
              Image uploaded successfully !
            </h2>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="floorNum" className="block mb-1">
              Floor Number
            </label>
            <Input
              type="number"
              name="floorNum"
              placeholder="enter the floor number of the floor plan"
              className="bg-orange-50 border-orange-300 focus:ring-orange-500 focus:border-orange-500"
              onChange={(e) => {
                setFloorNum(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <Input
              type="text"
              name="description"
              placeholder="Enter the description of the Floor plan"
              className="bg-orange-50 border-orange-300 focus:ring-orange-500 focus:border-orange-500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button onClick={uploadFunction}>Upload Image for submit</button>

          <Button
            type="submit"
            variant="orange"
            disabled={!submit}
            className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit for Consultation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FloorForm;
