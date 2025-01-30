/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Oval } from "react-loader-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Home, Building2, Factory, Landmark, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VastuForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    type: "residential",
    floorcount: 0,
    address: "",
    consultantid: "",
  });
  const [isLoading, setIsloading] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  async function submitForm() {
    setIsloading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/project/newproject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsloading(false);
        const data = await response.json();
        localStorage.setItem("projectId", data.id);
        localStorage.setItem("floorcount", formData.floorcount);
        const match = data.message.match(/Project (.+) created successfully/);
        const projectName = match ? match[1] : "";
        navigate(`/floorForm/${projectName}`);
      }
    } catch (error) {
      console.log({ err: error });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-violet-50 to-orange-100 p-4 sm:p-6 md:p-8">
      <Card className="max-w-2xl mx-auto shadow-xl border-orange-200 bg-white/90 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-violet-600 text-white rounded-t-lg p-8">
          <CardTitle className="text-3xl font-bold text-center">
            Vastu Consultation Request
          </CardTitle>
          <p className="text-center text-orange-100 mt-2">
            Let us create harmony in your space
          </p>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100">
            <Label
              htmlFor="name"
              className="text-lg font-medium text-orange-700 block mb-3"
            >
              Name
            </Label>
            <Input
              type="text"
              id="name"
              className="border-orange-200 focus:ring-orange-500 text-lg"
              min="1"
              onChange={(e) => {
                setFormData((item) => {
                  return { ...item, name: e.target.value };
                });
              }}
            />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100">
            <Label
              htmlFor="address"
              className="text-lg font-medium text-orange-700 block mb-3"
            >
              Address
            </Label>
            <Input
              type="text"
              id="address"
              className="border-orange-200 focus:ring-orange-500 text-lg"
              min="1"
              onChange={(e) => {
                setFormData((item) => {
                  return { ...item, address: e.target.value };
                });
              }}
            />
          </div>

          {/* Property Type */}
          <div className="space-y-4">
            <Label className="text-xl font-medium text-orange-700">
              Property Type
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100 hover:border-orange-300 transition-all cursor-pointer group">
                <RadioGroup
                  defaultValue="residential"
                  className="space-y-4"
                  onValueChange={(value) => {
                    setFormData((item) => {
                      return { ...item, type: value };
                    });
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="residential"
                      id="residential"
                      className="text-orange-500"
                    />
                    <Label
                      htmlFor="residential"
                      className="flex items-center space-x-2 text-orange-700 group-hover:text-orange-900"
                    >
                      <Home className="w-5 h-5" />
                      <span>Residential</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="commercial"
                      id="commercial"
                      className="text-orange-500"
                    />
                    <Label
                      htmlFor="commercial"
                      className="flex items-center space-x-2 text-orange-700 group-hover:text-orange-900"
                    >
                      <Building2 className="w-5 h-5" />
                      <span>Commercial</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="industrial"
                      id="industrial"
                      className="text-orange-500"
                    />
                    <Label
                      htmlFor="industrial"
                      className="flex items-center space-x-2 text-orange-700 group-hover:text-orange-900"
                    >
                      <Factory className="w-5 h-5" />
                      <span>Industrial</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="institutional"
                      id="institutional"
                      className="text-orange-500"
                    />
                    <Label
                      htmlFor="institutional"
                      className="flex items-center space-x-2 text-orange-700 group-hover:text-orange-900"
                    >
                      <Landmark className="w-5 h-5" />
                      <span>Institutional</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Number of Floors */}
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100">
                <Label
                  htmlFor="floors"
                  className="text-lg font-medium text-orange-700 block mb-3"
                >
                  Number of Floors
                </Label>
                <Input
                  type="number"
                  id="floors"
                  className="border-orange-200 focus:ring-orange-500 text-lg"
                  min="1"
                  onChange={(e) => {
                    setFormData((item) => {
                      return { ...item, floorcount: Number(e.target.value) };
                    });
                  }}
                />
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100">
                <Label
                  htmlFor="name"
                  className="text-lg font-medium text-orange-700 block mb-3"
                >
                  Consultant ID (optional)
                </Label>
                <Input
                  type="text"
                  id="name"
                  className="border-orange-200 focus:ring-orange-500 text-lg"
                  min="1"
                  onChange={(e) => {
                    setFormData((item) => {
                      return { ...item, consultantid: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isLoading ? (
            <Oval
              height={40}
              width={40}
              color="white"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#CC5500"
              strokeWidth={8}
              strokeWidthSecondary={2}
            />
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-600 hover:to-violet-700 text-white py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 "
              onClick={submitForm}
            >
              Submit Consultation Request
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VastuForm;
