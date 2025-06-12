/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  ScrollText,
  Home,
  FileCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ServiceCard = ({ icon: Icon, title, description, gradient, delay }) => (
  <div
    className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 border border-neutral-200/50 ${delay}`}
  >
    {/* Subtle gradient overlay */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
    ></div>

    {/* Content */}
    <div className="relative p-8 space-y-6">
      {/* Icon Container */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-soft border border-neutral-200/50 flex items-center justify-center group-hover:shadow-medium transition-all duration-300 group-hover:border-primary-200">
            <Icon className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" />
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-primary-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Learn More Link */}
      <div className="pt-2 flex justify-center">
        <div className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-sm">Explore Service</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const { isLoading, isAuthenticated } = checkAuthStatus();
  const navigate = useNavigate();
  const services = [
    {
      icon: Home,
      title: "Residential Vastu",
      description:
        "Comprehensive home analysis to create harmonious living spaces that promote health, wealth, and happiness for your family.",
      gradient: "from-primary-400 to-primary-600",
      delay: "animate-fade-in",
    },
    {
      icon: ScrollText,
      title: "Detailed Analysis",
      description:
        "In-depth room-by-room evaluation with precise directional guidance and energy flow optimization for maximum benefits.",
      gradient: "from-secondary-400 to-secondary-600",
      delay: "animate-fade-in [animation-delay:200ms]",
    },
    {
      icon: FileCheck,
      title: "Custom Solutions",
      description:
        "Personalized remedies and recommendations tailored to your specific space, lifestyle, and Vastu requirements.",
      gradient: "from-accent-400 to-accent-600",
      delay: "animate-fade-in [animation-delay:400ms]",
    },
  ];

  return (
    <section className="relative w-full px-6 py-24 bg-gradient-to-b from-neutral-50 via-orange-100 to-orange-200">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-neutral-200 to-transparent"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft border border-neutral-200/50">
            <Sparkles className="w-8 h-8 text-primary-600" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Expert Vastu consulting services designed to bring balance,
              prosperity, and positive energy to your living and working spaces.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <span className="text-neutral-700 font-semibold">
              Ready to transform your space?
            </span>
            <div
              className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-300"
              onClick={() => {
                if (!isLoading && !isAuthenticated) {
                  toast.error("please login first");
                } else if (!isLoading && isAuthenticated) {
                  navigate("/project");
                }
              }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
