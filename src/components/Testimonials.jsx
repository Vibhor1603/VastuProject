import React, { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    {
      name: "Rohit Gupta",
      role: "Architect",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      text: "The scientific approach to Vastu combined with practical solutions makes their service outstanding.",
      rating: 5,
    },
    {
      name: "Meera Joshi",
      role: "Property Developer",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Working with them has enhanced the value and appeal of our residential projects significantly.",
      rating: 5,
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (testimonials.length - 2)) % (testimonials.length - 2)
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-10 w-16 h-16 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-lg"></div>
        <div className="absolute top-8 right-16 w-12 h-12 bg-gradient-to-br from-amber-300/15 to-orange-300/15 rounded-xl rotate-45 blur-md"></div>
        <div className="absolute bottom-4 right-1/3 w-14 h-14 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-xl rotate-12 blur-md"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm border border-orange-200/50 rounded-full flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-white hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm border border-orange-200/50 rounded-full flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-white hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Testimonials Container */}
          <div className="mx-6 overflow-hidden">
            <div className="relative">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from(
                  { length: testimonials.length - 2 },
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testimonials
                          .slice(slideIndex, slideIndex + 3)
                          .map((testimonial, index) => (
                            <div
                              key={`${slideIndex}-${index}`}
                              className="relative group"
                            >
                              {/* Compact Card */}
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-orange-200/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                {/* Minimal Background Pattern */}
                                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-orange-100/30 to-amber-100/30 rounded-full -translate-y-5 translate-x-5"></div>

                                {/* Content */}
                                <div className="relative z-10">
                                  {/* Profile */}
                                  <div className="flex items-center mb-4">
                                    <img
                                      src={testimonial.image}
                                      alt={testimonial.name}
                                      className="w-10 h-10 rounded-lg object-cover border border-orange-200/50"
                                    />
                                    <div className="ml-3">
                                      <h4 className="font-semibold text-slate-900 text-sm">
                                        {testimonial.name}
                                      </h4>
                                      <p className="text-slate-600 text-sm opacity-80">
                                        {testimonial.role}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Quote */}
                                  <blockquote className="text-slate-700 text-sm leading-relaxed">
                                    "{testimonial.text}"
                                  </blockquote>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-1.5 mt-4">
          {Array.from({ length: testimonials.length - 2 }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 8000);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-500 scale-125"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
