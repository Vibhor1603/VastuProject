import React, { useState, useEffect } from "react";
import CompassOverlay from "./CompassOverlay";

const ImageUploader = () => {
  const [image, setImage] = useState(null); // To store the image as a base64 string
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL

  // Retrieve the image from localStorage (if exists)
  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setImagePreview(storedImage); // Set stored image as the preview
    }
  }, []);

  return (
    <div>
      <CompassOverlay />
      {/* {imagePreview && (
        <div>
          <h2>Image Preview:</h2>
          <img
            src={imagePreview}
            alt="Image Preview"
            width="900"
            height="900"
          />
        </div>
      )} */}
    </div>
  );
};
export default ImageUploader;
