import RecentListCard from "../../ui/dashborad/RecentListCard";


export default function RecentActivity({ recentBookings = bookings }) {
  return (
    <RecentListCard
      title="Recent Bookings"
      description="Latest booking activity on the platform"
      items={recentBookings}
      emptyText="No bookings yet"
      renderItem={(booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
        >
          <div>
            <p className="font-medium">{booking.roomName}</p>
            <p className="text-sm text-gray-500 capitalize">
              Booked by {booking.userName}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm">
              {new Date(booking.startDate).toLocaleDateString()}
              {" - "}
              <span className="text-destructive">
                {new Date(booking.endDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {new Date(booking.startDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              <span className="text-destructive">
                {new Date(booking.endDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        </div>
      )}
    />
  );
};