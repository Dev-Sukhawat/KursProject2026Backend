import { useNavigate } from "react-router-dom";
import QuickActionCard from "../../ui/dashborad/QuickActionsCard";
import { Building2, Users, Calendar } from "lucide-react";

export default function QuickActions() {
    const navigate = useNavigate();
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <QuickActionCard
    title="Manage Rooms"
    description="Add, edit, or remove rooms"
    icon={Building2}
    onClick={() => navigate("/admin/rooms")}
  />

  <QuickActionCard
    title="Manage Users"
    description="View and manage user accounts"
    icon={Users}
    onClick={() => navigate("/admin/users")}
  />

  <QuickActionCard
    title="View All Bookings"
    description="Monitor all platform bookings"
    icon={Calendar}
    onClick={() => navigate("/admin/bookings")}
  />

</div>
</>
    )
};