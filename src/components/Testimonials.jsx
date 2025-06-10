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
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Client Testimonials
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Hear what our clients have to say about their Vastu consultation
            experience
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Scrollable Container */}
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-80 snap-center"
              >
                <div className="h-full bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-100 rounded-xl mb-6">
                      <Quote className="w-8 h-8 text-primary-600" />
                    </div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mb-6 object-cover border-4 border-neutral-100"
                    />
                    <p className="text-neutral-600 text-lg text-center mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-accent-400 fill-current"
                        />
                      ))}
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-2">
                      {testimonial.name}
                    </h4>
                    <p className="text-neutral-500">
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