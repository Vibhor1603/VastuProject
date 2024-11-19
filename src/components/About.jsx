/* eslint-disable no-unused-vars */
import React from "react";
import { Compass, Home, Briefcase, Globe } from "lucide-react";

const About = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white via-orange-100 to-orange-500">
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <Compass className="w-16 h-16 text-orange-500 animate-spin-slow" />
        <h2 className="text-lg md:text-5xl font-bold text-gray-900">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-xl">
          We bring harmony to your living and working spaces using timeless
          Vastu Shastra principles and modern design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Residential Vastu */}
        <div className="group relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-t from-orange-200 via-orange-300 to-orange-500 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img
            src="/image-1.jpg"
            alt="Residential Vastu"
            className="object-cover w-full h-48 group-hover:opacity-80 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange via-transparent to-transparent opacity-40"></div>
          <div className="p-4 relative z-10">
            <Home className="w-10 h-10 text-black-500 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Residential Vastu
            </h3>
            <b className="text-gray-700 text-sm">
              Turn your home into a sanctuary of peace and prosperity.
            </b>
          </div>
        </div>

        {/* Commercial Vastu */}
        <div className="group relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-t from-orange-200 via-orange-300 to-orange-500 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img
            src="/commercial.jpg"
            alt="Commercial Vastu"
            className="object-cover w-full h-48 group-hover:opacity-80 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange via-transparent to-transparent opacity-40"></div>
          <div className="p-4 relative z-10">
            <Briefcase className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Commercial Vastu
            </h3>
            <b className="text-gray-700 text-sm">
              Create a balanced workspace that fosters growth and success.
            </b>
          </div>
        </div>

        {/* Online Consultation */}
        <div className="group relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-t from-orange-200 via-orange-300 to-orange-500 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img
            src="/image-3.jpg"
            alt="Online Consultation"
            className="object-cover w-full h-48 group-hover:opacity-80 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange via-transparent to-transparent opacity-40"></div>
          <div className="p-4 relative z-10">
            <Globe className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Online Consultation
            </h3>
            <b className="text-gray-700 text-sm">
              Get expert advice, anytime and anywhere.
            </b>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
