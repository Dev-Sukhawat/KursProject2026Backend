import { Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPage";
import Admin from "./pages/admin/AdminDashboard";
import RoomManagement from "./pages/admin/RoomManagement";
import UserManagement from "./pages/admin/UserManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import User from "./pages/user/UserDashboard";
import RoomBookingPage from "./pages/user/RoomBookingPage";
import MyBooking from "./pages/user/MyBookingsPage";
import UserProfile from "./pages/user/UserProfile";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { DataProvider } from "./components/context/DataContext";
import AutoTopScroller from "./components/services/AutoTopScroller";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const fetchApi = async () => {
    try {
      const response = await axios.get("/api");
      console.log(response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <DataProvider>
      <AutoTopScroller />
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
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute role="admin">
              <BookingManagement />
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
        <Route
          path="/book"
          element={
            <ProtectedRoute role="user">
              <RoomBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="user">
              <MyBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </DataProvider>
  );
}

export default App;
