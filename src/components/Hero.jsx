/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building2,
  Compass,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/components/ui/alert";
import toast from "react-hot-toast";

// Hero Component
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-neutral-50 via-orange-100 to-orange-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col items-center justify-center text-center space-y-12 max-w-5xl mx-auto">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-neutral-200/50 shadow-soft">
            <Compass className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700">
              Ancient Wisdom, Modern Solutions
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-neutral-900 leading-[0.9] tracking-tight">
              Transform Your{" "}
              <span className="relative">
                <span className="text-primary-600">Space</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-60"></div>
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-neutral-600 tracking-wide">
              with Vastu Shastra
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Harmonize your home and workspace with authentic Vastu principles.
            Get personalized consultations to create balanced, prosperous, and
            positive environments.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {[
              { icon: Home, text: "Residential" },
              { icon: Building2, text: "Commercial" },
              { icon: Compass, text: "Consultation" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-neutral-200/40 hover:bg-white/80 hover:border-primary-200 transition-all duration-300 group"
              >
                <item.icon className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium text-neutral-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <Button
              className="group bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
              onClick={handleclick}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Your Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
