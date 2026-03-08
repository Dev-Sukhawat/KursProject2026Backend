import { useNavigate } from "react-router-dom";
import QuickActionCard from "../../ui/dashborad/QuickActionsCard";
import { SquarePlus, Calendar } from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuickActionCard
          title="Book a Room"
          description="Reserve a workspace or conference room"
          icon={SquarePlus}
          onClick={() => navigate("/book")}
        />

        <QuickActionCard
          title="View All Bookings"
          description="Manage your current and past bookings"
          icon={Calendar}
          onClick={() => navigate("/my_bookings")}
        />
      </div>
    </>
  );
}
