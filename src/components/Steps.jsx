/* eslint-disable no-unused-vars */
import React from 'react';
import { FileUp, ClipboardCheck, FileSearch, FileText } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Create a Project",
      description: "Start by creating your project and providing basic details about your space.",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: FileUp,
      title: "Upload Floor Plan",
      description: "Upload your floor plan in any common format (PDF, JPG, PNG).",
      color: "from-orange-500 to-violet-500"
    },
    {
      icon: FileSearch,
      title: "Submit for Analysis",
      description: "Our experts will analyze your floor plan according to Vastu principles.",
      color: "from-violet-400 to-violet-600"
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description: "Receive a detailed report with personalized recommendations.",
      color: "from-orange-500 to-violet-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-violet-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-violet-600 text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your personalized Vastu analysis in four simple steps
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-violet-200 to-orange-200 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg mb-6 transform hover:scale-110 transition-all duration-300`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center max-w-xs">
                  {step.description}
                </p>
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