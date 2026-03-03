import { Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPage";
import Admin from "./pages/AdminDashboard";
import User from "./pages/UserDashboard";
import RoomManagement from "./pages/RoomManagement";


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
        path="/admin/rooms"
        element={
          <ProtectedRoute role="admin">
            <RoomManagement />
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
