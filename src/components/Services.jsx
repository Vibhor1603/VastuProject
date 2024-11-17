/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollText, Home, Compass, FileCheck, MessagesSquare, Sparkles } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2 transition-all duration-500 border border-orange-100 hover:border-violet-400 group">
    <div className="mb-6 flex justify-center">
      <div className="p-4 bg-gradient-to-r from-orange-500 to-violet-500 rounded-xl text-white transform group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-violet-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-center leading-relaxed">
      {description}
    </p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Vastu Consultation",
      description: "Expert guidance on harmonizing your living spaces with traditional Vastu principles for better energy flow."
    },
    {
      icon: ScrollText,
      title: "Detailed Analysis",
      description: "Comprehensive room-by-room analysis of your floor plan with specific recommendations for improvements."
    },
   
    {
      icon: FileCheck,
      title: "Custom Solutions",
      description: "Personalized Vastu solutions that work with your existing space without major structural changes."
    },
   
    
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-violet-600 text-transparent bg-clip-text">
            Our Services
          </h2>
          <h3 className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of Vastu consulting services designed to bring harmony and positive energy to your space
          </h3>
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