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
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: FileUp,
      title: "Upload Floor Plan",
      description:
        "Upload your floor plan in any common format (PDF, JPG, PNG).",
      color: "from-orange-500 to-violet-500",
    },
    {
      icon: FileSearch,
      title: "Submit for Analysis",
      description:
        "Our experts will analyze your floor plan according to Vastu principles.",
      color: "from-violet-400 to-violet-600",
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description:
        "Receive a detailed report with personalized recommendations.",
      color: "from-orange-500 to-violet-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-100 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your personalized Vastu analysis in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg mb-4 transform hover:scale-110 transition-all duration-300`}
                >
                  <step.icon size={32} />
                </div>
                <h3 className="text-lg font-bold mb-4 text-black">
                  {step.title}
                </h3>
                <b className="text-gray-700 text-center max-w-xs">
                  {step.description}
                </b>
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-1 h-8 bg-gradient-to-b from-orange-200 to-violet-200 my-4" />
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
