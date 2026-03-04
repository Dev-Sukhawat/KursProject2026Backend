import Header from "./Dashborad/header";
import Stats from "./Dashborad/stats_cards";
import QuickActions from "./Dashborad/qucik_action";
import RecentActivity from "./Dashborad/recent_activity";
import { useData } from "../context/DataContext";

function Dashbord() {
  const { rooms, bookings} = useData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <Stats rooms={rooms} bookings={bookings} />
      <QuickActions />
      <RecentActivity recentBookings={bookings} />
    </div>
  );
}

export default Dashbord;
