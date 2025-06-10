/* eslint-disable no-unused-vars */
import React from "react";
import { FileUp, ClipboardCheck, FileSearch, FileText } from "lucide-react";

const Steps = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Create a Project",
      description:
        "Start by creating your project and providing basic details about your space.",
      color: "bg-primary-500",
    },
    {
      icon: FileUp,
      title: "Upload Floor Plan",
      description:
        "Upload your floor plan in any common format (PDF, JPG, PNG).",
      color: "bg-secondary-500",
    },
    {
      icon: FileSearch,
      title: "Submit for Analysis",
      description:
        "Our experts will analyze your floor plan according to Vastu principles.",
      color: "bg-accent-500",
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description:
        "Receive a detailed report with personalized recommendations.",
      color: "bg-success-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Get your personalized Vastu analysis in four simple steps
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-medium mb-6 transform hover:scale-110 transition-all duration-300 relative z-10 bg-white border-4 border-white`}
                >
                  <step.icon size={32} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 w-full">
                  <h3 className="text-xl font-bold mb-4 text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-0.5 h-8 bg-neutral-200 my-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;