import React, { useState, useContext } from 'react';
import Header from "./Booking/header";
import { useData } from "../context/DataContext";
import { BookingFilter } from "./Booking/BookingFilter";
import { BookingList } from "./Booking/BookingList";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export default function Booking() {
  // 1. Hämta data och funktioner från din Context
  const { bookings, deleteBooking } = useData();

  // 2. Local State för filter och modal
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const now = new Date();

  // 3. Filtreringslogik
  const filtered = bookings.filter(booking => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (statusFilter === 'all') return true;
    
    if (statusFilter === 'active') {
      // En bokning är aktiv om den pågår JUST NU
      return now >= startDate && now <= endDate;
    }
    
    if (statusFilter === 'upcoming') {
      // Framtida bokningar
      return startDate > now;
    }
    
    if (statusFilter === 'past') {
      // Avslutade bokningar
      return endDate < now;
    }

    return true;
  });

  // 4. Handlers för Delete-flödet
  const handleDeleteTrigger = (id) => {
    setBookingToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookingToDelete) {
      deleteBooking(bookingToDelete); // Anropar funktionen i din Context
      setIsModalOpen(false);
      setBookingToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header />

      {/* Filter sektion */}
      <BookingFilter 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />

      {/* Lista med bokningar */}
    <BookingList 
        bookings={filtered} 
        onDeleteClick={handleDeleteTrigger} 
      />

    {/* Modal för bekräftelse av borttagning */}
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