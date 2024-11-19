/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Building2, Compass } from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import { Alert } from "./ui/alert";

function Hero() {
  const { isLoading, isAuthenticated } = checkAuthStatus();
  const navigate = useNavigate();
  function handleclick() {
    if (!isLoading && !isAuthenticated) {
      alert("login first");
    } else if (!isLoading && isAuthenticated) {
      navigate("/project");
    }
  }
  return (
    <div className="relative min-h-[600px] w-full bg-gradient-to-b from-white via-orange-100 to-orange-500">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Transform Your Space with Vastu Shastra
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
            Harmonize your home and workspace with authentic Vastu principles.
            Get personalized consultations to create balanced, prosperous, and
            positive environments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full my-8">
            <div className="flex flex-col items-center space-y-2">
              <Home className="w-8 h-8 text-orange-600" />
              <p className="font-medium">Residential Vastu</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="w-8 h-8 text-orange-600" />
              <p className="font-medium">Commercial Vastu</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Compass className="w-8 h-8 text-orange-600" />
              <p className="font-medium">Online Consultation</p>
            </div>
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300"
            onClick={handleclick}
          >
            Book Your Vastu Consultation
          </Button>
          <p className="text-sm text-gray-600">
            Expert Vastu consultation from certified professionals
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
