import React from "react";
import { Users } from "lucide-react";

export default function RoomCard({ room, onBook, bookings }) {
  const isAvailable = room.available;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Header Area */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {room.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              {room.type.replace("-", " ")}
            </p>
          </div>

          {/* Badge replacement */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              isAvailable
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <Users className="w-4 h-4" />
          <span className="text-sm">
            Capacity: {room.capacity}{" "}
            {room.capacity === 1 ? "person" : "people"}
          </span>
        </div>

        {/* Button replacement */}
        <button
          onClick={() => onBook(room)}
          disabled={!isAvailable}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all active:scale-[0.98] ${
            isAvailable
              ? "bg-primary text-white hover:bg-primary/90 shadow-sm cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed "
          }`}
        >
          {isAvailable ? "Book Now" : "Currently Full"}
        </button>
      </div>
    </div>
  );
}
