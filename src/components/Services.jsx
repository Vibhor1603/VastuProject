/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ScrollText, Home, FileCheck } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-500 border border-orange-200 group hover:border-orange-400">
    <div className="mb-6 flex justify-center">
      <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white transform group-hover:scale-110 transition-transform duration-300">
        <Icon size={36} />
      </div>
    </div>
    <h3 className="text-2xl font-semibold mb-3 text-orange-700 text-center group-hover:text-orange-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-700 text-center leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
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
    },
    {
      icon: ScrollText,
      title: "Detailed Analysis",
      description: "Room-by-room insights for positive energy flow.",
    },
    {
      icon: FileCheck,
      title: "Custom Solutions",
      description: "Tailored recommendations for your space.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-100 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our expert Vastu consulting offerings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
