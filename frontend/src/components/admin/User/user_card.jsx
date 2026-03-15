import UsersList from "../../ui/users/UsersList";
import { useData } from "../../context/DataContext";

export default function UserCard() {
  const { users, bookings, isLoading } = useData();

  if (isLoading) return <p>Laddar användare...</p>;

  const usersWithBookings = users.map((user) => ({
    ...user,
    id: user.id,
    name: user.full_name,
    bookings: bookings.filter(
      (b) => b.user_id === user.id && b.status === "active",
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UsersList users={usersWithBookings} />
    </div>
  );
}