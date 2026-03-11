import React from "react";
import RoomCard from "./RoomCards";

export default function RoomGrid({ rooms, onBook, onClearFilters }) {
  const count = rooms.length;

  return (
    <>
      {/* Results Counter */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-secondary-foreground">
            {count}
          </span>{" "}
          room
          {count !== 1 ? "s" : ""}
        </p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBook={onBook} // Use the prop name 'onBook'
          />
        ))}
      </div>

      {/* Empty State */}
      {count === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            No rooms found matching your filters.
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="mt-2 text-blue-600 hover:underline text-sm cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
