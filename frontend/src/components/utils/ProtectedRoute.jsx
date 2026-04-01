import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      sessionStorage.setItem(
        "redirectMessage",
        "Your session has expired. Please log in again.",
      );
      return <Navigate to="/" replace />;
    }

    if (role && decoded.role !== role) {
      sessionStorage.setItem(
        "redirectMessage",
        "You do not have permission to access this page.",
      );
      return (
        <Navigate to={decoded.role === "admin" ? "/admin" : "/user"} replace />
      );
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    sessionStorage.setItem(
      "redirectMessage",
      "Your session has expired. Please log in again.",
    );
    return <Navigate to="/" replace />;
  }
}