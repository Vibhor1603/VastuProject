/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FileUp, ClipboardCheck, FileSearch, FileText } from "lucide-react";

const Steps = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      icon: ClipboardCheck,
      title: "Create Project",
      description:
        "Start by creating your project and providing basic details about your space.",
      accent: "primary",
    },
    {
      icon: FileUp,
      title: "Upload Floor Plan",
      description:
        "Upload your floor plan in any common format (PDF, JPG, PNG).",
      accent: "secondary",
    },
    {
      icon: FileSearch,
      title: "Submit for Analysis",
      description:
        "Our experts will analyze your floor plan according to Vastu principles.",
      accent: "accent",
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description:
        "Receive a detailed report with personalized recommendations.",
      accent: "success",
    },
  ];

  const getAccentColors = (accent, isHovered) => {
    const colors = {
      primary: {
        bg: isHovered ? "bg-primary-500" : "bg-primary-50",
        icon: isHovered ? "text-white" : "text-primary-600",
        glow: "shadow-glow",
        border: "border-primary-200",
      },
      secondary: {
        bg: isHovered ? "bg-secondary-500" : "bg-secondary-50",
        icon: isHovered ? "text-white" : "text-secondary-600",
        glow: "shadow-[0_0_20px_rgba(14,165,233,0.3)]",
        border: "border-secondary-200",
      },
      accent: {
        bg: isHovered ? "bg-accent-500" : "bg-accent-50",
        icon: isHovered ? "text-white" : "text-accent-600",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
        border: "border-accent-200",
      },
      success: {
        bg: isHovered ? "bg-success-500" : "bg-success-50",
        icon: isHovered ? "text-white" : "text-success-600",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        border: "border-success-200",
      },
    };
    return colors[accent];
  };

  return (
    <section className="py-8 sm:py-12 lg:py-12 bg-gradient-to-b from-neutral-50 via-orange-100 to-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <div className="w-8 h-8 bg-primary-500 rounded-lg animate-bounce-subtle"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-3 sm:mb-4 animate-fade-in">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4 animate-slide-up">
            Get your personalized Vastu analysis in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
            {steps.map((step, index) => {
              const colors = getAccentColors(
                step.accent,
                hoveredStep === index
              );

              return (
                <div
                  key={index}
                  className="relative group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-3 -left-3 w-8 h-8 bg-neutral-900 text-white text-sm font-medium rounded-xl flex items-center justify-center z-20 transition-all duration-300 ${
                      hoveredStep === index ? "scale-110 shadow-strong" : ""
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Main Card */}
                  <div
                    className={`relative bg-white border-2 ${
                      colors.border
                    } rounded-2xl p-6 sm:p-8 h-full transition-all duration-500 hover:shadow-strong hover:-translate-y-2 ${
                      hoveredStep === index ? colors.glow : "shadow-soft"
                    }`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 ${
                        colors.bg
                      } rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                        hoveredStep === index ? "scale-110" : ""
                      }`}
                    >
                      <step.icon
                        size={28}
                        className={`${colors.icon} transition-all duration-300`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>

                    {/* Hover Effect Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 transition-opacity duration-300 ${
                        hoveredStep === index ? "opacity-100" : ""
                      }`}
                    ></div>
                  </div>

                  {/* Connection Arrow - Mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4 sm:hidden">
                      <div className="w-px h-8 bg-gradient-to-b from-neutral-300 to-neutral-100"></div>
                    </div>
                  )}

                  {/* Connection Dot - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-20 -right-4 w-8 h-8 items-center justify-center z-10">
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          hoveredStep === index || hoveredStep === index + 1
                            ? "bg-primary-400 scale-125"
                            : "bg-neutral-300"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-12 sm:mt-16 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </section>
  );
};

export default Steps;
