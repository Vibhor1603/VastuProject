import React from "react";
import { ArrowLeft, Building, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
const FloorPlanViewer = () => {
  const [floorPlan, setFloorPlan] = React.useState({
    floornumber: null,
    description: "",
    floorimg: "",
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchFloorPlan = async () => {
      try {
        const floorID = localStorage.getItem("floorID");
        const response = await fetch(
          `https://vastubackend.onrender.com/api/v1/floorplan/floorplans/${floorID}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch floor plan");
        }

        const data = await response.json();
        setFloorPlan({
          floornumber: data[0].floornumber,
          description: data[0].description,
          floorimg: data[0].floorplan,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFloorPlan();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-orange-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading floor plan...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 p-6">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>Error loading floor plan: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  function goBack() {
    navigate("/profile");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-orange-100/50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Project Details</span>
          </button>
        </div>

        <Card className="bg-white border border-orange-200 shadow-lg shadow-orange-100">
          <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-transparent">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Building size={24} className="text-orange-600" />
              Floor Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    Floor Number
                  </h3>
                  <p className="text-lg text-orange-900 font-medium">
                    {floorPlan?.floornumber || "N/A"}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-orange-800 mb-2">
                    Description
                  </h3>
                  <p className="text-orange-700 leading-relaxed">
                    {floorPlan?.description || "No description available"}
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-orange-200 bg-white">
                  {floorPlan?.floorimg ? (
                    <img
                      src={floorPlan.floorimg}
                      alt={`Floor plan for floor ${floorPlan.floornumber}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-orange-50 text-orange-400">
                      <div className="text-center">
                        <Building
                          size={48}
                          className="mx-auto mb-2 opacity-50"
                        />
                        <p className="text-sm font-medium">
                          No image available
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FloorPlanViewer;
