/* eslint-disable no-unused-vars */
import React from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
      text: "The Vastu consultation completely transformed our home's energy. We've noticed significant positive changes in our daily lives.",
      rating: 5,
    },
    {
      name: "Vibhor Sharma",
      role: "Homeowner",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
      text: "The Vastu consultation completely transformed our home's energy. We've noticed significant positive changes in our daily lives.",
      rating: 5,
    },

    {
      name: "Rajesh Patel",
      role: "Business Owner",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
      text: "After implementing the Vastu recommendations in my office, we've seen improved team productivity and business growth.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      role: "Interior Designer",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
      text: "As an interior designer, I highly recommend their Vastu consultation services. The reports are detailed and practical.",
      rating: 5,
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-b from-violet-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-violet-600 text-transparent bg-clip-text">
            Client Testimonials
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Hear what our clients have to say about their Vastu consultation
            experience
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Scrollable Container */}
          <div className="flex overflow-x-auto gap-2 sm:gap-4 lg:gap-3 pb-2 sm:pb-4 snap-x snap-mandatory">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-[180px] sm:w-[220px] lg:w-[360px] snap-center"
              >
                <div className="h-full bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-2 sm:p-4 lg:p-4">
                  <div className="flex flex-col items-center">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-400 mb-4 sm:mb-6" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 object-cover border-4 border-orange-100"
                    />
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center mb-2 sm:mb-4 italic">
                      {testimonial.text}
                    </p>
                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-current"
                        />
                      ))}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
