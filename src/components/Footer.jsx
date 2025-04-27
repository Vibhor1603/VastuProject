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
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Top Wave Decoration */}
      <div className="w-full">
        <svg
          className="w-full h-8 fill-current text-orange-500/10"
          viewBox="0 0 1440 48"
        >
          <path d="M0,48 L1440,48 L1440,0 C1440,0 1140,24 720,24 C300,24 0,0 0,0 L0,48 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold mb-4">
              <Link
                to="/"
                onClick={scrollToTop}
                className="bg-gradient-to-r from-orange-400 to-violet-400 text-transparent bg-clip-text hover:from-orange-300 hover:to-violet-300 transition-all duration-300"
              >
                VastuGuide
              </Link>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Bringing harmony to spaces through authentic Vastu principles.
              Transform your living and working spaces into sanctuaries of
              positive energy.
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-2">
              <button
                onClick={() => openSocialMedia("facebook")}
                aria-label="Visit our Facebook page"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Facebook
                  size={20}
                  className="text-gray-400 hover:text-orange-400"
                />
              </button>
              <button
                onClick={() => openSocialMedia("twitter")}
                aria-label="Visit our Twitter page"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Twitter
                  size={20}
                  className="text-gray-400 hover:text-orange-400"
                />
              </button>
              <button
                onClick={() => openSocialMedia("instagram")}
                aria-label="Visit our Instagram page"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Instagram
                  size={20}
                  className="text-gray-400 hover:text-orange-400"
                />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 inline-block relative group"
                >
                  About Us
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 inline-block relative group"
                >
                  Services
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 inline-block relative group"
                >
                  Contact
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Get in Touch
            </h4>
            <div className="space-y-4 text-sm">
              <button
                onClick={handlePhoneClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full"
                aria-label="Call us"
              >
                <Phone
                  size={16}
                  className="text-orange-400 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300">
                  +91 98765 00000
                </span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full"
                aria-label="Email us"
              >
                <Mail
                  size={16}
                  className="text-orange-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300">
                  contact@vastuguide.com
                </span>
              </button>
              <button
                onClick={handleMapClick}
                className="flex items-center justify-center md:justify-end gap-3 group w-full"
                aria-label="Find us on map"
              >
                <MapPin
                  size={16}
                  className="text-orange-400 group-hover:bounce transition-transform duration-300"
                />
                <span className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300">
                  Mumbai, Maharashtra
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} VastuGuide. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
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
