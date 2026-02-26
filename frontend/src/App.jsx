import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Admin from "./pages/admin.jsx";
import User from "./pages/user.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <User />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
