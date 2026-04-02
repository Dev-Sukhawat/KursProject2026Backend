import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { toLocalDisplay, toLocalTime } from "../../utils/dateUtils";

export default function UpcomingBookings({
  bookings = [],
  onDeleteClick,
  onEditClick,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserPage = location.pathname === "/user";
  const isMyBookingsPage = location.pathname === "/my-bookings";

  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (isUserPage) {
      setActiveTab("upcoming");
    }
  }, [isUserPage]);

  const now = new Date();

  const upcomingBookings = bookings
    .filter((b) => b.status === "active" && new Date(b.endDate) > now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastBookings = bookings
    .filter((b) => b.status === "active" && new Date(b.endDate) <= now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const allBookings = [...upcomingBookings, ...pastBookings];

  const displayedBookings = isUserPage
    ? upcomingBookings
    : activeTab === "upcoming"
      ? upcomingBookings
      : allBookings;

const uniqueBookings = Array.from(
  new Map(displayedBookings.map((booking) => [booking.id, booking])).values(),
);

return (
  <>
    {/* Tab Navigation */}
    {isMyBookingsPage && (
      <div className="flex gap-6 mb-4">
        <h2
          onClick={() => setActiveTab("upcoming")}
          className={`cursor-pointer transition-colors ${
            activeTab === "upcoming"
              ? "font-bold border-b-2 border-primary"
              : "text-gray-400"
          }`}
        >
          Upcoming Bookings
        </h2>

        <h2
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer transition-colors ${
            activeTab === "all"
              ? "font-bold border-b-2 border-primary"
              : "text-gray-400"
          }`}
        >
          All Bookings
        </h2>
      </div>
    )}
    {isUserPage && (
      <h2 className="text-xl font-bold mb-4">Your Upcoming Schedule</h2>
    )}

    {uniqueBookings.length === 0 ? (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center shadow-sm">
        <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
        <p className="text-center text-muted-foreground mb-6">
          You have no {activeTab === "upcoming" ? "upcoming" : ""} bookings.
        </p>
        <button
          onClick={() => navigate("/book")}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/80 transition-colors font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book a Room
        </button>
      </div>
    ) : (
      <div>
        {uniqueBookings.map((booking) => {
          const isPast = new Date(booking.endDate) < now;

          return (
            <div
              key={booking.id}
              className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-3 ${
                isPast ? "opacity-70 bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {booking.roomName || "Room Name Not Found"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {toLocalDisplay(booking.startDate)}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    isPast
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isPast ? "Completed" : "Upcoming"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {toLocalTime(booking.startDate)}
                  {" - "}
                  {toLocalTime(booking.endDate)}
                </div>

                {!isPast && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditClick(booking.id)}
                      className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm cursor-pointer hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteClick(booking.id)}
                      className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm text-red-600 cursor-pointer hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </>
);
}
