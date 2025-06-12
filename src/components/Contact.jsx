/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MessageSquare, SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    feedback: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      toast.error("Error submitting feedback");
      console.error(error);
    }
    setFormData({ email: "", mobile: "", feedback: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-medium border border-primary-100/30 animate-fade-in">
        {/* Header */}
        <div className="p-6 sm:p-8 text-center space-y-3 border-b border-neutral-100/50">
          <div className="w-12 h-12 bg-primary-100 rounded-xl mx-auto flex items-center justify-center">
            <MessageSquare className="size-6 text-primary-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">
            We Value Your Feedback
          </h1>
          <p className="text-sm text-neutral-600">
            Share your thoughts to help us improve.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <Mail className="size-4 text-primary-600" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="
                w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl
                focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                text-sm text-neutral-900 placeholder-neutral-500
                transition-all duration-200
              "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <Phone className="size-4 text-primary-600" />
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              className="
                w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl
                focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                text-sm text-neutral-900 placeholder-neutral-500
                transition-all duration-200
              "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="feedback"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <MessageSquare className="size-4 text-primary-600" />
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Tell us your thoughts..."
              required
              className="
                w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl
                focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                text-sm text-neutral-900 placeholder-neutral-500
                min-h-[100px] resize-none transition-all duration-200
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full flex items-center justify-center gap-2 px-6 py-3
              bg-primary-600 hover:bg-primary-700 text-white font-medium
              rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              group
            "
          >
            <span>Send Feedback</span>
            <SendHorizontal className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer */}
        <div className="p-6 sm:p-8 pt-0 text-center text-sm text-neutral-600">
          <p>Thank you for helping us grow!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
