import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  ArrowUp,
  Heart,
} from "lucide-react";
// For demonstration - replace with your routing solution
const NavLink = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);
const Link = ({ to, children, className, onClick, ...props }) => (
  <a href={to} className={className} onClick={onClick} {...props}>
    {children}
  </a>
);

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
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-300">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-strong hover:shadow-glow transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce-subtle" />
      </button>

      <div className="container mx-auto px-4 pt-16 pb-8 max-w-6xl">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" onClick={scrollToTop} className="inline-block group">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-accent-300 transition-all duration-300">
                VastuGuide
              </h3>
            </Link>

            <p className="text-neutral-400 leading-relaxed max-w-md">
              Bringing harmony to spaces through authentic Vastu principles.
              Transform your living and working spaces into sanctuaries of
              positive energy.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, platform: "facebook", label: "Facebook" },
                { icon: Twitter, platform: "twitter", label: "Twitter" },
                { icon: Instagram, platform: "instagram", label: "Instagram" },
              ].map(({ icon: Icon, platform, label }) => (
                <button
                  key={platform}
                  onClick={() => openSocialMedia(platform)}
                  aria-label={`Visit our ${label} page`}
                  className="w-10 h-10 bg-neutral-800/50 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {label}
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary-400 mb-4">
              Get in Touch
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  text: "+91 98765 00000",
                  action: handlePhoneClick,
                  label: "Call us",
                },
                {
                  icon: Mail,
                  text: "contact@vastuguide.com",
                  action: handleEmailClick,
                  label: "Email us",
                },
                {
                  icon: MapPin,
                  text: "Mumbai, Maharashtra",
                  action: handleMapClick,
                  label: "Find us",
                },
              ].map(({ icon: Icon, text, action, label }) => (
                <button
                  key={text}
                  onClick={action}
                  className="flex items-center gap-3 group text-left w-full"
                  aria-label={label}
                >
                  <div className="w-8 h-8 bg-neutral-800/50 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300">
                    <Icon className="w-4 h-4 text-primary-400 group-hover:text-white" />
                  </div>
                  <span className="text-neutral-400 group-hover:text-primary-400 transition-colors duration-300 text-sm">
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <span>
                &copy; {new Date().getFullYear()} VastuGuide. Made with
              </span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>in India</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 relative group"
                >
                  {label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
