import StatsCard from "../../ui/StatsCard";
import { Building2, Calendar, Users } from "lucide-react";

export default function Statscard() {
  const totalRooms = 100;
  const romsWR = 70;
  const romsCR = 30;
  const availableRooms = 85;
  const activeBookings = 25;
  const upcomingBookings = 10;
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
          //   value={rooms.filter((r) => r.type === "workspace").length}
          value={romsWR}
          subtitle="Individual workspaces"
          icon={Building2}
        />

        <StatsCard
          title="Conference Rooms"
          //   value={rooms.filter((r) => r.type === "conference").length}
          value={romsCR}
          subtitle="Meeting spaces"
          icon={Users}
        />
      </div>
    </>
  );
}
