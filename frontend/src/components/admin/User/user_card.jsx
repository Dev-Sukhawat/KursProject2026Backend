import UsersList from "../../ui/users/UsersList";
import { useData } from "../../context/DataContext";

export default function UserCard() {
  const { bookings } = useData();

  const users = Array.from(
    new Map(
      bookings.map((booking) => [
        booking.userId,
        {
          id: booking.userId,
          name: booking.userName,
          bookings: bookings.filter(
            (b) => b.userId === booking.userId && b.status === "active"
          ),
        },
      ])
    ).values()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UsersList users={users} />
    </div>
  );
}