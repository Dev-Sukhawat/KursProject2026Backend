import React, { useState, useContext } from "react";
import Header from "./Booking/header";
import { useData } from "../context/DataContext";
import { BookingFilter } from "./Booking/BookingFilter";
import { BookingList } from "./Booking/BookingList";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export default function Booking() {
  const { bookings, deleteBooking } = useData();

  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const now = new Date();

  const filtered = bookings.filter((booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (statusFilter === "all") return true;
    if (statusFilter === "active") {
      return now >= startDate && now <= endDate;
    }
    if (statusFilter === "upcoming") {
      return startDate > now;
    }
    if (statusFilter === "past") {
      return endDate < now;
    }

    return true;
  });

  const handleDeleteTrigger = (id) => {
    setBookingToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookingToDelete) {
      deleteBooking(bookingToDelete);
      setIsModalOpen(false);
      setBookingToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />

      <BookingFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <BookingList bookings={filtered} onDeleteClick={handleDeleteTrigger} />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Cancel Booking?"
        description="Are you sure you want to cancel this booking? The time slot will be released immediately."
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
      />
    </div>
  );
}
