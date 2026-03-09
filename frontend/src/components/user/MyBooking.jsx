import Header from "./MyBookings/header";
import UpcomingBookings from "../ui/bookings/UpcomingBookings";
import { useData } from "../context/DataContext";
import { useState } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import BookingModal from "../ui/bookings/BookingModal";

export default function MyBooking() {
  const { rooms, bookings, deleteBooking, updateBooking } = useData();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const handleDeleteTrigger = (id) => {
    setBookingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookingToDelete) {
      deleteBooking(bookingToDelete);
      setIsDeleteModalOpen(false);
      setBookingToDelete(null);
    }
  };

  const handleEditTrigger = (id) => {
    const booking = bookings.find((b) => b.id === id);

    if (booking) {
      setEditingBooking({
        ...booking,
        room: rooms.find((r) => r.id === booking.roomId),
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateBooking = (updatedData) => {
    updateBooking(editingBooking.id, updatedData);
    setIsEditModalOpen(false);
    setEditingBooking(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />

      <UpcomingBookings
        rooms={rooms}
        bookings={bookings}
        onDeleteClick={handleDeleteTrigger}
        onEditClick={handleEditTrigger}
      />

      {/* Booking Edit Modal */}
      <BookingModal
        booking={editingBooking}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleUpdateBooking}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Cancel Booking?"
        description="Are you sure you want to cancel this booking? The time slot will be released immediately."
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
      />
    </div>
  );
}
