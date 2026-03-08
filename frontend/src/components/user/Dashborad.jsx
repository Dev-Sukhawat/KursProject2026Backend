import { useData } from "../context/DataContext";
import Header from "./Dashborad/header";
import QuickActions from "./Dashborad/quick_action";
import UpcomingBookings from "../ui/bookings/UpcomingBookings";

export default function Dashbord() {
  const { rooms, bookings } = useData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <QuickActions />
      <UpcomingBookings rooms={rooms} bookings={bookings} />
    </div>
  );
}
