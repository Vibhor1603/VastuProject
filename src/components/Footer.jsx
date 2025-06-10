import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@vastuguide.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876500000";
  };

  const handleMapClick = () => {
    window.open("https://maps.google.com/?q=Mumbai,Maharashtra", "_blank");
  };

  const openSocialMedia = (platform) => {
    const socialLinks = {
      facebook: "https://www.facebook.com/vastuguide",
      twitter: "https://www.twitter.com/vastuguide",
      instagram: "https://www.instagram.com/vastuguide",
    };

    window.open(socialLinks[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="text-center md:text-left space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              <Link
                to="/"
                onClick={scrollToTop}
                className="text-white hover:text-neutral-300 transition-colors duration-300"
              >
                VastuGuide
              </Link>
            </h3>
            <p className="text-neutral-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Bringing harmony to spaces through authentic Vastu principles.
              Transform your living and working spaces into sanctuaries of
              positive energy.
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
              <button
                onClick={() => openSocialMedia("facebook")}
                aria-label="Visit our Facebook page"
                className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook size={20} className="text-neutral-400 hover:text-white" />
              </button>
              <button
                onClick={() => openSocialMedia("twitter")}
                aria-label="Visit our Twitter page"
                className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter size={20} className="text-neutral-400 hover:text-white" />
              </button>
              <button
                onClick={() => openSocialMedia("instagram")}
                aria-label="Visit our Instagram page"
                className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={20} className="text-neutral-400 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/about"
                  className="text-neutral-400 hover:text-white transition-colors duration-300 inline-block relative group"
                >
                  About Us
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="text-neutral-400 hover:text-white transition-colors duration-300 inline-block relative group"
                >
                  Services
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-neutral-400 hover:text-white transition-colors duration-300 inline-block relative group"
                >
                  Contact
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-white">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <button
                onClick={handlePhoneClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full p-3 rounded-xl hover:bg-neutral-800 transition-all duration-300"
                aria-label="Call us"
              >
                <Phone size={16} className="text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-neutral-400 group-hover:text-white transition-colors duration-300">
                  +91 98765 00000
                </span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full p-3 rounded-xl hover:bg-neutral-800 transition-all duration-300"
                aria-label="Email us"
              >
                <Mail size={16} className="text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-neutral-400 group-hover:text-white transition-colors duration-300">
                  contact@vastuguide.com
                </span>
              </button>
              <button
                onClick={handleMapClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full p-3 rounded-xl hover:bg-neutral-800 transition-all duration-300"
                aria-label="Find us on map"
              >
                <MapPin size={16} className="text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-neutral-400 group-hover:text-white transition-colors duration-300">
                  Mumbai, Maharashtra
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400">
              &copy; {new Date().getFullYear()} VastuGuide. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <NavLink
                to="/privacy"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;