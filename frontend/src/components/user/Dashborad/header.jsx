import { getCurrentUser } from "../../services/authService";

const user = getCurrentUser();

export default function UserHeader() {
  const User = user ? user.name : "User";
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome, {User}</h1>
        <p className="text-muted-foreground">
          Manage your workspace bookings and reservations
        </p>
      </div>
    </>
  );
}
