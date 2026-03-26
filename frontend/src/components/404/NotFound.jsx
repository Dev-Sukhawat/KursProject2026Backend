import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Number */}
      <h1 className="text-[150px] font-black text-primary leading-none select-none">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-sm mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Go Home
        </button>
      </div>
    </div>
  );
}
