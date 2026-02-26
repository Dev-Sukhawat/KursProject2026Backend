import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("user");

  // ❌ Inte inloggad alls
  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(storedUser);

  // ❌ Fel roll
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
