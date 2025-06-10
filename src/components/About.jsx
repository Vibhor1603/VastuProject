/* eslint-disable no-unused-vars */
import React from "react";
import { Compass, Home, Briefcase, Globe } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8 mb-16">
          <div className="p-4 bg-primary-100 rounded-2xl">
            <Compass className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
            About Us
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl leading-relaxed">
            We bring harmony to your living and working spaces using timeless
            Vastu Shastra principles and modern design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Residential Vastu */}
          <div className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 bg-white">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/image-1.jpg"
                alt="Residential Vastu"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="p-3 bg-secondary-100 rounded-xl w-fit mb-4">
                <Home className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Residential Vastu
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Turn your home into a sanctuary of peace and prosperity.
              </p>
            </div>
          </div>

          {/* Commercial Vastu */}
          <div className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 bg-white">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/commercial.jpg"
                alt="Commercial Vastu"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="p-3 bg-accent-100 rounded-xl w-fit mb-4">
                <Briefcase className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Commercial Vastu
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Create a balanced workspace that fosters growth and success.
              </p>
            </div>
          </div>

          {/* Online Consultation */}
          <div className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 bg-white md:col-span-2 lg:col-span-1">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/image-2.jpg"
                alt="Online Consultation"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="p-3 bg-success-100 rounded-xl w-fit mb-4">
                <Globe className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Online Consultation
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Get expert advice, anytime and anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;