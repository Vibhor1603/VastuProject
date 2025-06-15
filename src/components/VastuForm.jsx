/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Home,
  Building2,
  Factory,
  Landmark,
  MapPin,
  User,
  Layers,
  UserCheck,
  Send,
  CheckCircle2,
  Star,
} from "lucide-react";

const VastuForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    floorcount: 1,
    address: "",
    consultantid: "",
  });
  const [Loading, setLoading] = React.useState(false);
  const [formStep, setFormStep] = React.useState(1);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, userRole } = checkAuthStatus();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isLoading, isAuthenticated, navigate]);

  async function submitForm() {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/project/newproject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        localStorage.setItem("projectId", data.id);
        localStorage.setItem("floorcount", formData.floorcount);
      }
    } catch (error) {
      console.log({ err: error });
    }
  }

  const propertyTypes = [
    {
      value: "residential",
      label: "Residential",
      icon: Home,
      description: "Houses, apartments, villas",
    },
    {
      value: "commercial",
      label: "Commercial",
      icon: Building2,
      description: "Offices, shops, restaurants",
    },
    {
      value: "industrial",
      label: "Industrial",
      icon: Factory,
      description: "Factories, warehouses",
    },
    {
      value: "institutional",
      label: "Institutional",
      icon: Landmark,
      description: "Schools, hospitals, temples",
    },
  ];

  const isFormValid =
    formData.name && formData.address && formData.floorcount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20 py-8 px-4 flex items-center justify-center">
      <div className="w-full md:mx-56">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Vastu Consultation Request
          </h1>
          <p className="text-neutral-600 text-lg">
            Begin your journey to harmonious living
          </p>
        </div>

        {/* Main Form */}
        <Card className="bg-white/90 backdrop-blur-sm border border-neutral-200/50 shadow-xl">
          <CardContent className="p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Personal Information
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Tell us about yourself and your project
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2 text-neutral-500" />
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-neutral-500" />
                    Property Address
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Enter your property address"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Property Type Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Property Type
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Select the type of property for consultation
                  </p>
                </div>
              </div>

              <RadioGroup
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
                className="grid grid-cols-2 gap-4"
              >
                {propertyTypes.map(
                  ({ value, label, icon: Icon, description }) => {
                    const isSelected = formData.type === value;
                    return (
                      <div key={value} className="relative">
                        <RadioGroupItem
                          value={value}
                          id={value}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={value}
                          className={`
                            flex flex-col p-4 border-2 rounded-xl cursor-pointer
                            transition-all duration-200
                            ${
                              isSelected
                                ? "border-primary-400 bg-primary-100 shadow-xl ring-primary-300"
                                : "border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50"
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected ? "bg-primary-300" : "bg-primary-100"
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 transition-colors ${
                                  isSelected
                                    ? "text-primary-800"
                                    : "text-primary-600"
                                }`}
                              />
                            </div>
                            <span
                              className={`font-medium transition-colors ${
                                isSelected
                                  ? "text-primary-700"
                                  : "text-neutral-900"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                          <span
                            className={`text-sm transition-colors ${
                              isSelected
                                ? "text-primary-800"
                                : "text-neutral-600"
                            }`}
                          >
                            {description}
                          </span>
                        </Label>
                      </div>
                    );
                  }
                )}
              </RadioGroup>
            </div>

            {/* Additional Details Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center mr-3">
                  <Layers className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Property Details
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Provide additional information about your property
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="floors"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-2 text-neutral-500" />
                    Number of Floors
                  </Label>
                  <Input
                    type="number"
                    id="floors"
                    placeholder="1"
                    min="1"
                    max="50"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl"
                    value={formData.floorcount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        floorcount: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="consultant"
                    className="text-sm font-medium text-neutral-700 flex items-center"
                  >
                    <UserCheck className="w-4 h-4 mr-2 text-neutral-500" />
                    Consultant ID{" "}
                    <span className="text-neutral-400 ml-1">(Optional)</span>
                  </Label>
                  <Input
                    type="text"
                    id="consultant"
                    placeholder="Enter consultant ID if available"
                    className="h-12 border-neutral-200 focus:border-primary-500 focus:ring-primary-500 rounded-xl"
                    value={formData.consultantid}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consultantid: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="border-t border-neutral-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" />
                  <span>Your information is secure and encrypted</span>
                </div>

                <Button
                  onClick={submitForm}
                  disabled={!isFormValid || Loading}
                  className="
                    group flex items-center space-x-2 px-8 py-3
                    bg-gradient-to-r from-primary-600 to-primary-500
                    hover:from-primary-700 hover:to-primary-600
                    disabled:from-neutral-300 disabled:to-neutral-400
                    text-white font-semibold rounded-xl
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 transform
                    hover:-translate-y-0.5 hover:scale-105
                    disabled:hover:transform-none disabled:hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  "
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                  <span>{Loading ? "Processing..." : "Submit Request"}</span>
                </Button>
              </div>

              {!isFormValid && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Please fill in all required fields to submit your
                    consultation request.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VastuForm;
