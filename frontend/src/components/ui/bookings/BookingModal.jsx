import { useState, useEffect } from "react";

export default function BookingModal({ booking, isOpen, onClose, onSave }) {
  // 1. Initialize state as null or empty strings
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 2. Sync state when the 'booking' prop changes (Crucial!)
  useEffect(() => {
    if (booking) {
      // Format to 'YYYY-MM-DDTHH:mm' for datetime-local input
      const formatForInput = (date) =>
        date ? new Date(date).toISOString().slice(0, 16) : "";

      setStartDate(formatForInput(booking.startDate));
      setEndDate(formatForInput(booking.endDate));
    }
  }, [booking, isOpen]);

  // Don't render anything if closed or if booking data isn't ready
  if (!isOpen || !booking) return null;

  const handleSave = () => {
    onSave({
      ...booking,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

        <div className="space-y-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
            <p className="font-bold text-blue-900 mb-1">
              {booking.roomName || "Room Details"}
            </p>
            <div className="grid grid-cols-2 gap-2 opacity-90">
              <p>Capacity: {booking.room?.capacity || booking.capacity} ppl</p>
              <p>Type: {booking.room?.type || booking.type}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md active:scale-95 transition-all"
          >
            Update Booking
          </button>
        </div>
      </div>
    </div>
  );
}
