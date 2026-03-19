import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { toLocalInput } from "../../utils/dateUtils";

const now = new Date();
now.setSeconds(0, 0);
const minDateTime = now.toISOString().slice(0, 16);

export function BookingModal({
  roombooking,
  isOpen,
  onClose,
  onSave,
  bookingError,
}) {
  const { isRoomAvailable } = useData();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (roombooking) {
      setStartDate(toLocalInput(roombooking.startDate));
      setEndDate(toLocalInput(roombooking.endDate));
      setError("");
    }
  }, [roombooking, isOpen]);

  if (!isOpen || !roombooking) return null;

  const handleSave = async () => {
    // 1. Required check
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 2. Invalid date check
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Please enter valid dates.");
      return;
    }

    // 3. End must be after start
    if (end <= start) {
      setError("End time must be after the start time.");
      return;
    }

    // 4.Check room availability
    const available = await isRoomAvailable(
      roombooking.id,
      start.toISOString(),
      end.toISOString(),
      null,
    );

    if (!available) {
      setError(
        "This room is already booked for the selected time. Please choose a different time.",
      );
      return;
    }

    // 5. All good
    onSave({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">
          Book - {roombooking.name || "Room Details"}
        </h2>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {bookingError && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 text-orange-700 text-sm rounded-lg flex items-center gap-2">
            <span>🚫</span>
            {bookingError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              min={minDateTime}
              onChange={(e) => {
                setStartDate(e.target.value);
                setError(""); // Clear error when user types
              }}
              className={`w-full border rounded-lg px-3 py-2 outline-none transition-all cursor-pointer ${
                error && !startDate
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={endDate}
              min={startDate || minDateTime}
              onChange={(e) => {
                setEndDate(e.target.value);
                setError("");
              }}
              className={`w-full border rounded-lg px-3 py-2 outline-none transition-all cursor-pointer ${
                error && !endDate
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
            <p className="font-bold text-blue-900 mb-1">
              {roombooking.name || "Room Details"}
            </p>
            <div className="grid grid-cols-2 gap-2 opacity-90">
              <p>Capacity: {roombooking.capacity} ppl</p>
              <p>Type: {roombooking.type}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-primary text-white font-medium rounded-lg cursor-pointer hover:bg-primary/90 shadow-md active:scale-95 transition-all"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookingEditModal({ booking, isOpen, onClose, onSave }) {
  // 1. Initialize state as null or empty strings
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  // 2. Sync state when the 'booking' prop changes (Crucial!)
  useEffect(() => {
    if (booking) {
      setStartDate(toLocalInput(booking.startDate));
      setEndDate(toLocalInput(booking.endDate));
      setError("");
    }
  }, [booking, isOpen]);

  // Don't render anything if closed or if booking data isn't ready
  if (!isOpen || !booking) return null;

  const handleSave = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }

    const newStartISO = start.toISOString();
    const newEndISO = end.toISOString();

    const hasChanges =
      newStartISO !== booking.startDate || newEndISO !== booking.endDate;

    if (!hasChanges) {
      setError("No changes detected. Please modify the dates before saving.");
      return;
    }
    onSave({
      ...booking,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              min={minDateTime}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
              min={startDate || minDateTime}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Update Booking
          </button>
        </div>
      </div>
    </div>
  );
}
