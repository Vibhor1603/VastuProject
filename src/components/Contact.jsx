/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageSquare,
  SendHorizontal,
  Heart,
} from "lucide-react";

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

      // if (response.ok) {
      //   console.log("feedback submitted");
      //   navigate("/");
      // } else {
      //   console.log("feedback error");
      // }
    } catch (error) {
      console.log(error);
    }
    setFormData({ email: "", mobile: "", feedback: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-violet-50 to-orange-100 p-2 sm:p-6 md:p-2 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl border-orange-100 bg-white/90 backdrop-blur">
        <CardHeader className="text-center space-y-2 pb-8 pt-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-violet-500 rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg">
            <Heart className="w-10 h-10 text-white animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-violet-600 bg-clip-text text-transparent">
            We would Love to Hear From You
          </CardTitle>
          <CardDescription className="text-lg text-orange-600 font-medium">
            Your feedback shapes our journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2 text-orange-700"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 transition-colors bg-orange-50/50 pl-4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="text-sm font-medium flex items-center gap-2 text-orange-700"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                Mobile Number
              </Label>
              <div className="relative group">
                <Input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 transition-colors bg-orange-50/50 pl-4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="feedback"
                className="text-sm font-medium flex items-center gap-2 text-orange-700"
              >
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Your Feedback
              </Label>
              <div className="relative group">
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="We value every word you share..."
                  required
                  className="min-h-[120px] border-orange-200 focus:border-orange-500 focus:ring-orange-500 transition-colors bg-orange-50/50 pl-4 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-violet-500 hover:from-orange-500 hover:to-violet-600 text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="text-lg">Send Feedback</span>
              <SendHorizontal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="pt-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
              <Heart className="w-4 h-4" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
            </div>
            <p className="text-sm text-orange-600 md-8">
              Thank you for helping us grow better!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
