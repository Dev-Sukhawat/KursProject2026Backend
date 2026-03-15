import React, { createContext, useContext, useState, useEffect } from "react";
import { roomService, bookingService, usersService } from "../../services/api";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Hämta all data från Backend vid start
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [roomsData, bookingsData, usersData] = await Promise.all([
          roomService.getAll(),
          bookingService.getAll(),
          usersService.getAll(),
        ]);
        setRooms(roomsData);
        setBookings(bookingsData);
        setUsers(usersData);
      } catch (err) {
        setError("Kunde inte ladda data från servern.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // ==========================================
  // ROOMS LOGIC (CRUD)
  // ==========================================

  const addRoom = async (roomData) => {
    try {
      const newRoom = await roomService.create(roomData);
      setRooms((prev) => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      console.error("Fel vid skapande av rum:", err);
      throw err;
    }
  };

  const updateRoom = async (id, updatedFields) => {
    try {
      const updatedRoom = await roomService.update(id, updatedFields);
      setRooms((prev) =>
        prev.map((room) => (room.id === id ? updatedRoom : room)),
      );
    } catch (err) {
      console.error("Fel vid uppdatering av rum:", err);
      throw err;
    }
  };

  const deleteRoom = async (id) => {
    try {
      await roomService.delete(id);
      setRooms((prev) => prev.filter((room) => room.id !== id));
      // Vi rensar även bokningar lokalt som tillhörde rummet
      setBookings((prev) => prev.filter((b) => b.room_id !== id));
    } catch (err) {
      console.error("Fel vid borttagning av rum:", err);
      throw err;
    }
  };

  // ==========================================
  // BOOKINGS LOGIC (CRUD)
  // ==========================================

  const addBooking = async (newBookingData) => {
    try {
      // Skicka till backend (väntar på svar med det riktiga ID:t från DB)
      const savedBooking = await bookingService.create(newBookingData);
      setBookings((prev) => [...prev, savedBooking]);
      return savedBooking.id;
    } catch (err) {
      console.error("Fel vid bokning:", err);
      throw err;
    }
  };

  const deleteBooking = async (id) => {
    try {
      await bookingService.delete(id);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      console.error("Fel vid borttagning av bokning:", err);
      throw err;
    }
  };

  // ==========================================
  // UTILS / VALIDATION
  // ==========================================

  const isRoomAvailable = (roomId, startDate, endDate, excludeBookingId) => {
    const roomBookings = bookings.filter(
      (booking) =>
        booking.room_id === roomId &&
        booking.status === "active" &&
        booking.id !== excludeBookingId,
    );

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    for (const booking of roomBookings) {
      const bookingStart = new Date(booking.start_date).getTime();
      const bookingEnd = new Date(booking.end_date).getTime();

      // Kolla överlappning
      if (start < bookingEnd && end > bookingStart) {
        return false;
      }
    }
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        rooms,
        bookings,
        users,
        isLoading,
        error,
        addRoom,
        updateRoom,
        deleteRoom,
        addBooking,
        deleteBooking,
        isRoomAvailable,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
