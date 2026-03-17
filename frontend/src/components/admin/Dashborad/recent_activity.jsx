import RecentListCard from "../../ui/dashborad/RecentListCard";
import { toLocalDate, toLocalTime } from "../../utils/dateUtils";

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
            <p className="text-xs text-gray-500 capitalize">
              <span className="text-sm">C : </span>
              {toLocalDate(booking.created_at)}
            </p>
            <p className="text-sm">
              {toLocalDate(booking.startDate)}
              {" - "}
              <span className="text-destructive">
                {toLocalDate(booking.endDate)}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {toLocalTime(booking.startDate)}
              {" - "}
              <span className="text-destructive">
                {toLocalTime(booking.endDate)}
              </span>
            </p>
          </div>
        </div>
      )}
    />
  );
};