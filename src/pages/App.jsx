/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import FloorPlan from "@/components/FloorPlanViewer";
import Root from "./Root";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VastuForm from "../components/VastuForm";
import ContactPage from "../components/Contact";
import Profile from "./Profile";
import FloorForm from "@/components/FloorForm";
import checkAuthStatus from "@/hooks/userSession";
import FloorPlanViewer from "@/components/FloorPlanViewer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Root />} />
        <Route path="/home" element={<Root />} />
        <Route path="/project" element={<VastuForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/floorplan" element={<FloorPlanViewer />} />
        <Route path="/floorForm" element={<FloorForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
