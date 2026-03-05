import { Users, Edit, Trash2 } from "lucide-react";

export default function RoomCard({
  room,
  onEdit,
  onDelete,
}) {

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{room.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {room.type === "workspace"
              ? "Workspace"
              : "Conference Room"}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full ${
            room.available
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {room.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-2 text-gray-500 mb-4">
        <Users size={16} />
        <span className="text-sm">
          Capacity: {room.capacity}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(room)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100 transition text-sm"
        >
          <Edit size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(room.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-red-50 text-red-600 transition text-sm"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}