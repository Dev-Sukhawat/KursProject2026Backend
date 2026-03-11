import { useState } from "react";
import { useData } from "../context/DataContext";
import Header from "./RoomBookingPage/header";
import { RoomBookingFilter } from "./RoomBookingPage/RoomBookingFilter";
import RoomGrid from "./RoomBookingPage/RoomGrid";
import { BookingModal } from "../ui/bookings/BookingModal";
import { getCurrentUser } from "../services/authService";

export default function RoomBookingPage() {
  const { rooms, addBooking } = useData();
  // --- 1. Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");

  // --- 2. Modal States ---
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 3. Filtering Logic ---
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || room.type === typeFilter;

    // Capacity logic: e.g., if filter is '4', show rooms with capacity >= 4
    const matchesCapacity =
      capacityFilter === "all" ||
      (room.capacity >= parseInt(capacityFilter) &&
        room.capacity <= parseInt(capacityFilter));

    return matchesSearch && matchesType && matchesCapacity;
  });

  // --- 4. Handlers ---
  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (bookingData) => {
    const currentUser = getCurrentUser();

    const finalBookingPayload = {
      userId: currentUser.id,
      userName: currentUser.name,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      status: "active",
    };
    addBooking(finalBookingPayload);
    setIsModalOpen(false);
    setSelectedRoom(null);
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
        rooms={filteredRooms}
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
          }}
          onSave={handleConfirmBooking}
        />
      )}
    </div>
  );
}
