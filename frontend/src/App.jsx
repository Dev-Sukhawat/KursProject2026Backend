import { Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPage";
import Admin from "./pages/admin/AdminDashboard";
import RoomManagement from "./pages/admin/RoomManagement";
import UserManagement from "./pages/admin/UserManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import User from "./pages/user/UserDashboard";
import MyBooking from "./pages/user/MyBookingsPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { DataProvider } from "./components/context/DataContext";
import AutoTopScroller from "./components/services/AutoTopScroller";

function App() {
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
          path="/my-bookings"
          element={
            <ProtectedRoute role="user">
              <MyBooking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </DataProvider>
  );
}

export default App;
