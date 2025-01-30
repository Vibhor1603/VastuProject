import React from "react";

const NotFound = () => {
  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-bold text-orange-500 opacity-20">404</h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <p className="text-2xl font-semibold text-orange-600">
              Oops! Page Not Found
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-orange-700 mb-8">
            The page you're looking for seems to have wandered off into the
            digital sunset. Don't worry, it happens to the best of us!
          </p>

          <button
            onClick={handleNavigateHome}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium
                     shadow-lg shadow-orange-300/50 
                     hover:bg-orange-600 hover:shadow-orange-400/50
                     active:transform active:scale-95
                     transition-all duration-200"
          >
            Return Home
          </button>
        </div>

        <div className="mt-12">
          <div className="animate-bounce">
            <div className="w-4 h-4 bg-orange-400 rounded-full mx-auto mb-1"></div>
          </div>
          <div className="w-12 h-1 bg-orange-300 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
