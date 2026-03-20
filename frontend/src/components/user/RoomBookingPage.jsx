import { useState } from "react";
import { useData } from "../context/DataContext";
import Header from "./RoomBookingPage/header";
import { RoomBookingFilter } from "./RoomBookingPage/RoomBookingFilter";
import RoomGrid from "./RoomBookingPage/RoomGrid";
import { BookingModal } from "../ui/bookings/BookingModal";
import { getCurrentUser } from "../../services/authService";

export default function RoomBookingPage() {
  const { rooms, addBooking } = useData();
  // --- 1. Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");

  // --- 2. Modal States ---
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // --- 3. Filtering Logic ---
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || room.type === typeFilter;

    // Capacity logic: e.g., if filter is '4', show rooms with capacity >= 4
    let matchesCapacity = true;
    if (capacityFilter !== "all") {
      const cap = room.capacity;
      if (capacityFilter === "1") matchesCapacity = cap === 1;
      else if (capacityFilter === "4") matchesCapacity = cap >= 2 && cap <= 4;
      else if (capacityFilter === "8") matchesCapacity = cap >= 5 && cap <= 8;
      else if (capacityFilter === "9") matchesCapacity = cap >= 9 && cap <= 17;
      else if (capacityFilter === "18+") matchesCapacity = cap >= 18;
    }

    return matchesSearch && matchesType && matchesCapacity;
  });
  const finalFilteredRooms = [...filteredRooms].sort(
    (a, b) => b.available - a.available,
  );

  // --- 4. Handlers ---
  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    const currentUser = getCurrentUser();

    if (!bookingData || !selectedRoom) {
      console.error("Missing bookingData or selectedRoom:", {
        bookingData,
        selectedRoom,
      });
      return;
    }

    const finalBookingPayload = {
      user_id: currentUser.id,
      room_id: selectedRoom.id,
      start_date: bookingData.startDate,
      end_date: bookingData.endDate,
    };

    try {
      await addBooking(finalBookingPayload);
      setIsModalOpen(false);
      setSelectedRoom(null);
    } catch (err) {
      if (err.message.includes("already booked")) {
        setBookingError("This room is already booked for the selected time.");
      }
      console.error("Fel vid bokning:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />

      {/* Passing states and setters to the Filter component */}
      <RoomBookingFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        capacityFilter={capacityFilter}
        setCapacityFilter={setCapacityFilter}
      />

      {/* Passing the filtered list to the Grid */}
      <RoomGrid
        rooms={finalFilteredRooms}
        onBook={handleBookClick}
        onClearFilters={() => {
          setSearchQuery("");
          setTypeFilter("all");
          setCapacityFilter("all");
        }}
      />

      {/* The Modal for actually creating the booking */}
      {selectedRoom && (
        <BookingModal
          roombooking={selectedRoom}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRoom(null);
            setBookingError(null);
          }}
          onSave={handleConfirmBooking}
          bookingError={bookingError}
        />
      )}
    </div>
  );
}
