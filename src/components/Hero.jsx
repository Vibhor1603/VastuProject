/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Building2, Compass } from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/components/ui/alert";
import toast from "react-hot-toast";

function Hero() {
  const { isLoading, isAuthenticated } = checkAuthStatus();
  const navigate = useNavigate();
  function handleclick() {
    if (!isLoading && !isAuthenticated) {
      toast.error("please login first");
    } else if (!isLoading && isAuthenticated) {
      navigate("/project");
    }
  }
  return (
    <div className="relative min-h-[90vh] w-full bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Compass className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-tight">
              Transform Your Space with{" "}
              <span className="text-primary-600">Vastu Shastra</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed">
              Harmonize your home and workspace with authentic Vastu principles.
              Get personalized consultations to create balanced, prosperous, and
              positive environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl w-full my-12">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-4 bg-secondary-100 rounded-xl">
                <Home className="w-8 h-8 text-secondary-600" />
              </div>
              <p className="font-semibold text-neutral-800">Residential Vastu</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-4 bg-accent-100 rounded-xl">
                <Building2 className="w-8 h-8 text-accent-600" />
              </div>
              <p className="font-semibold text-neutral-800">Commercial Vastu</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-4 bg-success-100 rounded-xl">
                <Compass className="w-8 h-8 text-success-600" />
              </div>
              <p className="font-semibold text-neutral-800">Online Consultation</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 text-lg rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleclick}
            >
              Book Your Vastu Consultation
            </Button>
            <p className="text-sm text-neutral-500">
              Expert Vastu consultation from certified professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;