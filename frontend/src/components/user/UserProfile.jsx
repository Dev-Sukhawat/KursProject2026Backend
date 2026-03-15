import { useData } from "../context/DataContext";
import Header from "./UserProfile/header";
import UseInfo from "./UserProfile/userinfo";

export default function UserProfile() {
  const { bookings } = useData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <UseInfo bookings={bookings} />
    </div>
  );
}
