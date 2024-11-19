/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Root from "./Root";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VastuForm from "../components/VastuForm";
import ContactPage from "../components/Contact";
import Profile from "./Profile";
import FloorForm from "@/components/FloorForm";
import FloorPlans from "@/components/FloorPlans";
import ImageUploader from "@/components/ImageUploader";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Root />} />
        <Route path="/home" element={<Root />} />
        <Route path="/editedimg" element={<ImageUploader />} />
        <Route path="/project" element={<VastuForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/floorplans" element={<FloorPlans />} />
        <Route path="/floorForm" element={<FloorForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
