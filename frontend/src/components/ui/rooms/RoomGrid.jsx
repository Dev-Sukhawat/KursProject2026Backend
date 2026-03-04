import RoomCard from "./RoomCard";

export default function RoomGrid({
  rooms,
  onEdit,
  onDelete,
  onAddFirst,
}) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No rooms yet</p>
        <button
          onClick={onAddFirst}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Your First Room
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}