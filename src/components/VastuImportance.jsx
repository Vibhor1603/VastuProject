import React, { useState } from "react";
import {
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Home,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

const VastuImportance = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const benefits = [
    {
      icon: Heart,
      title: "Harmonious Living",
      description:
        "Create perfect balance in your space, reducing stress and promoting emotional well-being through strategic design principles.",
      accent: "primary",
    },
    {
      icon: TrendingUp,
      title: "Wealth & Prosperity",
      description:
        "Activate prosperity zones through strategic placement that creates opportunities for financial growth and abundance.",
      accent: "secondary",
    },
    {
      icon: Shield,
      title: "Energy Protection",
      description:
        "Build powerful energy barriers that deflect negativity while amplifying positive vibrations throughout your home.",
      accent: "accent",
    },
    {
      icon: Zap,
      title: "Enhanced Vitality",
      description:
        "Optimize cosmic energy flow to boost your life force, focus, and personal power for peak daily performance.",
      accent: "success",
    },
  ];

  const features = [
    {
      icon: Home,
      stat: "5000+",
      label: "Years of Wisdom",
    },
    {
      icon: Users,
      stat: "9",
      label: "Energy Zones",
    },
    {
      icon: Award,
      stat: "360°",
      label: "Directional Harmony",
    },
  ];

  const getAccentColors = (accent, isHovered) => {
    const colors = {
      primary: {
        bg: isHovered ? "bg-primary-500" : "bg-primary-50",
        icon: isHovered ? "text-white" : "text-primary-600",
        border: "border-primary-200",
        glow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]",
      },
      secondary: {
        bg: isHovered ? "bg-secondary-500" : "bg-secondary-50",
        icon: isHovered ? "text-white" : "text-secondary-600",
        border: "border-secondary-200",
        glow: "shadow-[0_0_30px_rgba(14,165,233,0.3)]",
      },
      accent: {
        bg: isHovered ? "bg-accent-500" : "bg-accent-50",
        icon: isHovered ? "text-white" : "text-accent-600",
        border: "border-accent-200",
        glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
      },
      success: {
        bg: isHovered ? "bg-success-500" : "bg-success-50",
        icon: isHovered ? "text-white" : "text-success-600",
        border: "border-success-200",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
      },
    };
    return colors[accent];
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <Star className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-3 sm:mb-4">
            Why Vastu Shastra Matters
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto">
            Ancient architectural science that transforms your living space into
            a harmonious environment for health, wealth, and happiness
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 rounded-2xl p-6 text-center shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={24} className="text-primary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                {feature.stat}
              </div>
              <p className="text-neutral-600 text-sm sm:text-base">
                {feature.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {benefits.map((benefit, index) => {
            const colors = getAccentColors(
              benefit.accent,
              hoveredBenefit === index
            );

            return (
              <div
                key={index}
                className={`relative bg-white border-2 ${
                  colors.border
                } rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-strong hover:-translate-y-2 ${
                  hoveredBenefit === index ? colors.glow : "shadow-soft"
                }`}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${
                    colors.bg
                  } rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    hoveredBenefit === index ? "scale-110" : ""
                  }`}
                >
                  <benefit.icon
                    size={28}
                    className={`${colors.icon} transition-all duration-300`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  {benefit.description}
                </p>

                {/* Hover indicator */}
                <div
                  className={`absolute top-6 right-6 transition-all duration-300 ${
                    hoveredBenefit === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <CheckCircle size={20} className="text-primary-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VastuImportance;
