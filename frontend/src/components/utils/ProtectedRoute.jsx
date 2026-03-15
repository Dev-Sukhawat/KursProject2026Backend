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
      console.warn("Token has expired");
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    if (role && decoded.role !== role) {
      console.error(`Access denied: Requires ${role} role`);
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    // Om token är trasig eller ogiltig
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
}
