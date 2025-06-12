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

const About = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Vastu",
      description:
        "Transform your home into a sanctuary of peace and prosperity with personalized solutions.",
      image: "/image-1.jpg",
      color: "from-primary-50 to-primary-100",
    },
    {
      icon: Briefcase,
      title: "Commercial Vastu",
      description:
        "Create balanced workspaces that foster growth, success, and positive energy flow.",
      image: "/commercial.jpg",
      color: "from-secondary-50 to-secondary-100",
    },
    {
      icon: Globe,
      title: "Online Consultation",
      description:
        "Get expert Vastu guidance anytime, anywhere with our comprehensive digital consultations.",
      image: "/image-2.jpg",
      color: "from-accent-50 to-accent-100",
    },
  ];

  return (
    <section className="relative w-full px-6 py-24 bg-gradient-to-b from-white to-neutral-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-neutral-200"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft border border-neutral-200/50">
            <Compass className="w-8 h-8 text-primary-600" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight">
              About Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              We bring harmony to your living and working spaces using timeless
              Vastu Shastra principles and modern design expertise.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 border border-neutral-200/50"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>

                {/* Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-soft">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
