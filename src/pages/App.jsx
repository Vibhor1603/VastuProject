/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import About from "../components/About";
import Root from "./Root";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VastuForm from "../components/VastuForm";
import ContactPage from "../components/Contact";
import Profile from "./Profile";
import FloorForm from "@/components/FloorForm";
import checkAuthStatus from "@/hooks/userSession";

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

        <Route path="/floorForm" element={<FloorForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
