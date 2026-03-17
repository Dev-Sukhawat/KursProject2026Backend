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

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const activeBookings = bookings
    .filter(
      (b) =>
        b.status === "active" &&
        new Date(b.startDate) <= now &&
        new Date(b.endDate) >= now,
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const upcomingBookings = bookings
    .filter((b) => b.status === "active" && new Date(b.startDate) > now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastBookings = bookings
    .filter((b) => b.status === "active" && new Date(b.endDate) < now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const recentBookings = bookings
    .filter(
      (b) =>
        new Date(b.created_at) >= startOfToday && new Date(b.created_at) <= now,
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const allBookings = [...activeBookings, ...upcomingBookings, ...pastBookings];

  // ← now filtered is a simple lookup, no nested filters
  const filtered =
    statusFilter === "active"
      ? activeBookings
      : statusFilter === "upcoming"
        ? upcomingBookings
        : statusFilter === "past"
          ? pastBookings
          : statusFilter === "recent"
            ? recentBookings
            : allBookings; // default "all"

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
