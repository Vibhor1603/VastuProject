/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ScrollText, Home, FileCheck } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-500 border border-neutral-100 group">
    <div className="mb-6 flex justify-center">
      <div className={`p-4 ${color} rounded-xl transform group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} className="text-white" />
      </div>
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-neutral-900 text-center group-hover:text-neutral-700 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-neutral-600 text-center leading-relaxed">
      {description}
    </p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Vastu Consultation",
      description: "Guiding you to harmonize your space with Vastu principles.",
      color: "bg-primary-500",
    },
    {
      icon: ScrollText,
      title: "Detailed Analysis",
      description: "Room-by-room insights for positive energy flow.",
      color: "bg-secondary-500",
    },
    {
      icon: FileCheck,
      title: "Custom Solutions",
      description: "Tailored recommendations for your space.",
      color: "bg-accent-500",
    },
  ];

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Our Services
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Explore our expert Vastu consulting offerings designed to bring harmony to your space.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;