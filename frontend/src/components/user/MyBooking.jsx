import Header from "./MyBookings/header";
import UpcomingBookings from "../ui/bookings/UpcomingBookings";
import { useData } from "../context/DataContext";

export default function MyBooking() {
  const { rooms, bookings } = useData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <UpcomingBookings rooms={rooms} bookings={bookings} />
    </div>
  );
}
