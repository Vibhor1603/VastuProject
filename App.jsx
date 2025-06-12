/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./src/components/Navbar";

import Footer from "./src/components/Footer";

import Root from "./src/pages/Root";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VastuForm from "./src/components/VastuForm";
import ContactPage from "./src/components/Contact";
import Profile from "./src/pages/Profile";
import FloorForm from "./src/pages/FloorForm";
import FloorPlans from "./src/components/FloorPlans";
import ImageUploader from "./src/components/ImageUploader";
import FloorPlanAnnotator from "@/pages/FloorPlanAnnotator";
import EditableReport from "./src/pages/EditableReport";
import ViewReport from "./src/pages/ViewReport";
import NotFound from "./src/pages/NotFound";
import CompassOverlay from "./src/pages/CompassOverlay";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Root />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Root />} />
        <Route path="/editedimg" element={<ImageUploader />} />
        <Route path="/project" element={<VastuForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/floorplans" element={<FloorPlans />} />
        <Route path="/annotate" element={<FloorPlanAnnotator />} />
        <Route path="/floorForm/:projectName" element={<FloorForm />} />
        <Route path="/edit-report/:planID" element={<EditableReport />} />
        <Route path="/viewreport/:projectId" element={<ViewReport />} />
        <Route path="/compassOverlay" element={<CompassOverlay />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
