import Header from "./MyBookings/header";
import UpcomingBookings from "../ui/bookings/UpcomingBookings";
import { useData } from "../context/DataContext";
import { useState, useEffect } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { BookingEditModal } from "../ui/bookings/BookingModal";
import { getCurrentUser } from "../../services/authService";

export default function MyBooking() {
  const { rooms, getUserBookings, deleteBooking, updateBooking } = useData();
  const user = getCurrentUser();

  const [userBookings, setUserBookings] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  useEffect(() => {
    if (user?.id) {
      getUserBookings(user.id).then((data) => {
        setUserBookings(data ?? []);
      });
    }
  }, [user?.id]);

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
    const booking = userBookings.find((b) => b.id === id);

    if (booking) {
      setEditingBooking({
        ...booking,
        room: rooms.find((r) => r.id === booking.room_id),
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
        bookings={userBookings}
        onDeleteClick={handleDeleteTrigger}
        onEditClick={handleEditTrigger}
      />

      <BookingEditModal
        booking={editingBooking}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleUpdateBooking}
      />

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
