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

function FloorForm() {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [floorNum, setFloorNum] = React.useState("");
  const isAuthenticated = checkAuthStatus();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);

  if (!isAuthenticated) {
    navigate("/");
    console.log(isAuthenticated);
  }

  const formData = new FormData();

  const projectName = localStorage.getItem("projectName");
  const username = localStorage.getItem("username");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("floornum", floorNum);
    localStorage.setItem("description", description);
    navigate("/editedimg");
  };
  const id = localStorage.getItem("projectId");
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userImage", reader.result); // Store base64 image in localStorage
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file); // Set the raw file
      };
      reader.readAsDataURL(file);
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
          <Button type="submit" variant="orange" className="w-full">
            Submit for Consultation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FloorForm;
