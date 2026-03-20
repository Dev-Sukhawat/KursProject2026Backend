import {
  User,
  Mail,
  Shield,
  Calendar,
  TrendingUp,
  ClockFading,
  CheckCircle,
} from "lucide-react";
import { getCurrentUser } from "../../../services/authService";

export default function ProfileStats({ bookings }) {
  const user = getCurrentUser();
  if (!user || !bookings) {
    return <div className="p-4 text-gray-500">Loading stats...</div>;
  }
  const userBookings = bookings;

const activeBookings = userBookings.filter((b) =>
  b.status === "active" &&
  new Date(b.startDate) >= new Date() &&
  new Date(b.endDate) >= new Date()
).length;

  const upcomingBookings = userBookings.filter(
    (b) => b.status === "active" && new Date(b.startDate) >= new Date(),
  ).length;

  const completedBookings = userBookings.filter(
    (b) => b.status === "completed" || new Date(b.startDate) < new Date(),
  ).length;

  const totalBookings = userBookings.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Account Information */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-900">
            Account Information
          </h3>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* Name Row */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                Full Name
              </p>
              <p className="text-gray-900 font-semibold truncate capitalize">
                {user?.name || "Guest User"}
              </p>
            </div>
          </div>

          {/* Email Row */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                Email Address
              </p>
              <p className="text-gray-900 font-semibold truncate">
                {user?.email || "No email provided"}
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <div className="flex items-center pt-2">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tight ${
                user?.role === "admin"
                  ? "bg-purple-50 text-purple-700 border border-purple-100"
                  : "bg-primary text-primary-foreground border border-ring"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {user?.role === "admin" ? "Administrator" : "Standard Member"}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Statistics */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-900">
            Booking Statistics
          </h3>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
          {/* Main Stat: Total */}
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary rounded-2xl shadow-blue-100 shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Total Bookings
              </p>
              <p className="text-4xl font-black text-gray-900 leading-none mt-1">
                {totalBookings}
              </p>
            </div>
          </div>

          {/* Sub Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-primary/85 rounded-2xl border border-primary/50">
              <div className="flex items-center gap-2 mb-2 text-primary-foreground/90">
                <ClockFading  className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase">
                  Active
                </span>
              </div>
              <p className="text-2xl font-black text-primary-foreground/90 leading-none">
                {activeBookings}
              </p>
            </div>
            {/* Upcoming Box */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
              <div className="flex items-center gap-2 mb-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase">
                  Upcoming
                </span>
              </div>
              <p className="text-2xl font-black text-emerald-900 leading-none">
                {upcomingBookings}
              </p>
            </div>

            {/* Past/Completed Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <CheckCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase">Past</span>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-none">
                {completedBookings}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
