import StatsCard from "../../ui/dashborad/StatsCard";
import { Building2, Calendar, Users } from "lucide-react";

export default function Statscard({rooms, bookings}) {
  const totalRooms = rooms.length;
  const now = new Date();
  const availableRooms = rooms.filter((room) => room.available).length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "active",
  ).length;
  const upcomingBookings = bookings
    .filter((b) => b.status === "active" && new Date(b.startDate) > now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).length;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Rooms"
          value={totalRooms}
          subtitle={`${availableRooms} available`}
          icon={Building2}
        />

        <StatsCard
          title="Active Bookings"
          value={activeBookings}
          subtitle={`${upcomingBookings} upcoming`}
          icon={Calendar}
        />

        <StatsCard
          title="Workspace Rooms"
            value={rooms.filter((r) => r.type === "workspace").length}
          subtitle="Individual workspaces"
          icon={Building2}
        />

        <StatsCard
          title="Conference Rooms"
            value={rooms.filter((r) => r.type === "conference").length}
          subtitle="Meeting spaces"
          icon={Users}
        />
      </div>
    </>
  );
}
