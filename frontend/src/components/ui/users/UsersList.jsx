import { Users } from "lucide-react";

export default function UsersList({ users  }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />

        <p className="text-gray-500">
          No users have made bookings yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((userData) => {

        const activeBookings = userData.bookings.filter(
        (b) => b.status === "active"
        ).length;

        const pastBookings = userData.bookings.filter(
        (b) => new Date(b.endDate) < new Date()
        ).length;

        const TotalBookings = userData.bookings.length;

        return (
          <div
            key={userData.id}
            className="bg-white rounded-xl shadow-sm border p-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold capitalize text-lg">
                  {userData.name}
                </h3>

                <p className="text-sm text-gray-500">
                  User ID: {userData.id.slice(0, 8)}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Active Bookings</span>

                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md">
                  {activeBookings}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Past Bookings</span>

                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
                  {pastBookings}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tootal Bookings</span>

                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
                  {TotalBookings}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}