import React from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      text: "The Vastu consultation completely transformed our home's energy. We've noticed significant positive changes in our daily lives.",
      rating: 5,
    },
    {
      name: "Vibhor Sharma",
      role: "Homeowner",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Professional service with authentic Vastu principles. Our home feels more harmonious and peaceful now.",
      rating: 5,
    },
    {
      name: "Rajesh Patel",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "After implementing the Vastu recommendations in my office, we've seen improved team productivity and business growth.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      role: "Interior Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "As an interior designer, I highly recommend their Vastu consultation services. The reports are detailed and practical.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-glow">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from people who transformed their spaces with Vastu
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 border border-white/20"
            >
              {/* Profile */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-medium"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <Quote className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h4 className="font-semibold text-neutral-800 text-lg mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-neutral-500 text-sm font-medium">
                  {testimonial.role}
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent-500 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-600 text-center leading-relaxed text-sm">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
