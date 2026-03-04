import { Plus } from "lucide-react";

export default function Header({ handleOpenDialog }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          Room Management
        </h1>
        <p className="text-gray-500">
          Create, edit, and manage all workspace and conference rooms
        </p>
      </div>

      {/* Right Side Button */}
      <button
        onClick={() => handleOpenDialog()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Plus size={16} />
        Add Room
      </button>
    </div>
  );
}