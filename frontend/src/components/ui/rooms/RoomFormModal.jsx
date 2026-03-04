export default function RoomFormModal({
  open,
  onClose,
  onSubmit,
  editingRoom,
  formName,
  setFormName,
  formType,
  setFormType,
  formCapacity,
  setFormCapacity,
  formAvailable,
  setFormAvailable,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">
          {editingRoom ? "Edit Room" : "Add New Room"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Room Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="workspace">Workspace</option>
            <option value="conference">Conference Room</option>
          </select>

          <input
            type="number"
            min="1"
            value={formCapacity}
            onChange={(e) => setFormCapacity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formAvailable}
              onChange={(e) =>
                setFormAvailable(e.target.checked)
              }
            />
            Available for Booking
          </label>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {editingRoom ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}