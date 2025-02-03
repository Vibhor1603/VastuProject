import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
import { Oval } from "react-loader-spinner";

function FloorForm() {
  const [imageUrl, setImageUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [floorNum, setFloorNum] = React.useState("");
  const { isLoading, isAuthenticated, userRole } = checkAuthStatus();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [submit, setSubmit] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { projectName } = useParams();
  const [loading, setLoading] = React.useState(false);

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
      } else if (!projectName) {
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

  const username = localStorage.getItem("username");
  const maxFloors = localStorage.getItem("floorcount");
  const projectId = localStorage.getItem("projectId");

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   navigate("/editedimg");
  // };
  const id = localStorage.getItem("projectId");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setImage(file);
  };

  const uploadFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (floorNum > maxFloors) {
      toast.error("floor number exceeds the project limit");
      return;
    }
    if (!floorNum || floorNum <= 0) {
      toast.error("Floor number is not entered correctly!");
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      const data = await response.data;
      localStorage.setItem("floorId", data.floorId.id);

      localStorage.setItem("raw_img", data.imageURL.url);
      localStorage.setItem("projectName", projectName);
      localStorage.setItem("floornum", floorNum);

      toast.success("image uploaded");
      navigate("/editedimg");

      setSubmit(true);
      // localStorage.setItem("description", description);
      // localStorage.setItem("raw_img", data.imageURL.url);
    } catch (error) {
      console.error(error);
      toast.error("error uploading image");
      setLoading(false);
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
        <form className="mt-6 space-y-4">
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
          {loading ? (
            <Oval
              height={20}
              width={20}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              D
              secondaryColor="#4fa94d"
              strokeWidth={8}
              strokeWidthSecondary={2}
            />
          ) : (
            <button
              className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={uploadFunction}
            >
              Next
            </button>
          )}

          {/* <Button
            type="submit"
            variant="orange"
            disabled={!submit}
            className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit for Consultation
          </Button> */}
        </form>
      </CardContent>
    </Card>
  );
}

export default FloorForm;
