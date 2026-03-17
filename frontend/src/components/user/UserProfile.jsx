import { useData } from "../context/DataContext";
import Header from "./UserProfile/header";
import UseInfo from "./UserProfile/userinfo";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../components/services/authService";

export default function UserProfile() {
  const { getUserBookings } = useData();

  const user = getCurrentUser();

  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getUserBookings(user.id).then((data) => {
        setUserBookings(data ?? []);
      });
    }
  }, [user?.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <UseInfo bookings={userBookings} />
    </div>
  );
}
