/* eslint-disable no-unused-vars */
import React from 'react';
import { Compass } from 'lucide-react';

const About = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white via-orange-100 to-orange-500">
      <div className="flex flex-col items-center text-center space-y-6">
        <Compass className="w-12 h-12 text-orange-600" />
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          At Vastu Guide, we blend ancient Vastu Shastra principles with modern design sensibilities to help you achieve harmony, prosperity, and balance in your surroundings. Our team of certified Vastu experts works closely with you to create personalized environments that foster positivity and success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full mt-8">
          <div className="p-6 border border-orange-200 rounded-lg bg-gradient-to-b from-white to-violet-300 ">
            <h3 className="text-xl font-semibold text-gray-800 ">Residential Vastu</h3>
            <p className="text-gray-600">
              Transform your home into a sanctuary of peace and prosperity with our in-depth residential Vastu consultation services.
            </p>
          </div>
          <div className="p-6 border border-orange-200 rounded-lg bg-gradient-to-b from-white to-violet-300 about">
            <h3 className="text-xl font-semibold text-gray-800">Commercial Vastu</h3>
            <p className="text-gray-600">
              Enhance your business potential and create a balanced workspace that promotes success, creativity, and growth.
            </p>
          </div>
          <div className="p-6 border border-orange-200 rounded-lg bg-gradient-to-b from-white to-violet-300 about">
            <h3 className="text-xl font-semibold text-gray-800">Online Consultation</h3>
            <p className="text-gray-600">
              Access expert Vastu guidance anytime, anywhere. Our online consultations provide tailored solutions at your convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
