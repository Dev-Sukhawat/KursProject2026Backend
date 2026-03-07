import React from 'react';
import { Calendar, Clock, User, Trash2, Inbox } from 'lucide-react';

export const BookingList = ({ bookings, onDeleteClick }) => {
  const now = new Date();

  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl py-12 text-center">
        <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No bookings found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
      </p>

      {bookings.map((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const isUpcoming = start > now;
        const isPast = end < now;

        return (
          <div
            key={booking.id}
            className="bg-background border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-secondary-foreground">
                    {booking.roomName}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isUpcoming
                        ? "bg-primary text-primary-foreground"
                        : isPast
                          ? "bg-gray-100 text-secondary-foreground"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isUpcoming ? "Upcoming" : isPast ? "Completed" : "Active"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  BookingID: {booking.id.slice(0, 12)}
                </p>
              </div>

              <button
                onClick={() => onDeleteClick(booking.id)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{booking.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{start.toLocaleDateString("sv-SE")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -
                  {end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};