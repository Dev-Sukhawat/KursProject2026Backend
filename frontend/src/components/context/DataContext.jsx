import React, { createContext, useContext, useState } from "react";
import { idagMedTid } from "../services/idagMedTid";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Initial mock data
const initialRooms = [
  { id: "1", name: "Focus Room A", type: "workspace", capacity: 1, available: true },
  { id: "2", name: "Focus Room B", type: "workspace", capacity: 1, available: true },
  { id: "3", name: "Hot Desk 1", type: "workspace", capacity: 1, available: true },
  { id: "4", name: "Hot Desk 2", type: "workspace", capacity: 1, available: true },
  { id: "5", name: "Conference Room A", type: "conference", capacity: 8, available: true },
  { id: "6", name: "Conference Room B", type: "conference", capacity: 12, available: true },
  { id: "7", name: "Meeting Room Small", type: "conference", capacity: 4, available: true },
  { id: "8", name: "Board Room", type: "conference", capacity: 16, available: true },
];

const initialBookings = [    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      roomId: 1,
      roomName: "Conference Room A",
      startDate: idagMedTid(10, 0), // Idag kl. 10:00
      endDate: idagMedTid(18, 0), // Idag kl. 18:00
      status: "active",
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      roomId: 5,
      roomName: "Meeting Room B",
      startDate: new Date(Date.now() - 86400000),
      endDate: new Date(Date.now() + 86400000),
      status: 'active',
    },
    {
      id: 'booking-3',
      userId: 'user-1',
      userName: 'Emma Anderson',
      roomId: '3',
      roomName: 'Hot Desk 1',
      startDate: new Date(2026, 2, 5, 8, 0), // Tomorrow, March 5, 8:00 AM
      endDate: new Date(2026, 2, 5, 17, 0), // Tomorrow, 5:00 PM
      status: 'active',
  },
  {
    id: 'booking-4',
    userId: 'user-2',
    userName: 'Lucas Nielsen',
    roomId: '6',
    roomName: 'Conference Room B',
    startDate: new Date(2026, 2, 5, 10, 0), // Tomorrow, 10:00 AM
    endDate: new Date(2026, 2, 5, 12, 0), // Tomorrow, 12:00 PM
    status: 'active',
  },
  {
    id: 'booking-5',
    userId: 'user-3',
    userName: 'Sofia Larsson',
    roomId: '7',
    roomName: 'Meeting Room Small',
    startDate: new Date(2026, 2, 6, 13, 0), // March 6, 1:00 PM
    endDate: new Date(2026, 2, 6, 15, 0), // March 6, 3:00 PM
    status: 'active',
  },
  {
    id: 'booking-6',
    userId: 'user-1',
    userName: 'Emma Anderson',
    roomId: '2',
    roomName: 'Focus Room B',
    startDate: new Date(2026, 2, 7, 9, 0), // March 7, 9:00 AM
    endDate: new Date(2026, 2, 7, 11, 0), // March 7, 11:00 AM
    status: 'active',
  },
  {
    id: 'booking-7',
    userId: 'user-2',
    userName: 'Lucas Nielsen',
    roomId: '8',
    roomName: 'Board Room',
    startDate: new Date(2026, 2, 9, 14, 0), // March 9, 2:00 PM
    endDate: new Date(2026, 2, 9, 17, 0), // March 9, 5:00 PM
    status: 'active',
  },
  {
    id: 'booking-8',
    userId: 'user-1',
    userName: 'Emma Anderson',
    roomId: '4',
    roomName: 'Hot Desk 2',
    startDate: new Date(2026, 2, 10, 8, 0), // March 10, 8:00 AM
    endDate: new Date(2026, 2, 10, 12, 0), // March 10, 12:00 PM
    status: 'active',
  },
  {
    id: 'booking-9',
    userId: 'user-3',
    userName: 'Sofia Larsson',
    roomId: '5',
    roomName: 'Conference Room A',
    startDate: new Date(2026, 2, 11, 10, 0), // March 11, 10:00 AM
    endDate: new Date(2026, 2, 11, 12, 30), // March 11, 12:30 PM
    status: 'active',
  },
  {
    id: 'booking-10',
    userId: 'user-1',
    userName: 'Emma Anderson',
    roomId: '1',
    roomName: 'Focus Room A',
    startDate: new Date(2026, 2, 2, 14, 0), // Past booking: March 2, 2:00 PM
    endDate: new Date(2026, 2, 2, 16, 0), // March 2, 4:00 PM
    status: 'active',
  },
  {
    id: 'booking-11',
    userId: 'user-2',
    userName: 'Lucas Nielsen',
    roomId: '7',
    roomName: 'Meeting Room Small',
    startDate: new Date(2026, 2, 1, 9, 0), // Past booking: March 1, 9:00 AM
    endDate: new Date(2026, 2, 1, 11, 0), // March 1, 11:00 AM
    status: 'cancelled',
  },
  {
    id: 'booking-12',
    userId: 'user-3',
    userName: 'Sofia Larsson',
    roomId: '6',
    roomName: 'Conference Room B',
    startDate: new Date(2026, 2, 12, 15, 0), // March 12, 3:00 PM
    endDate: new Date(2026, 2, 12, 18, 0), // March 12, 6:00 PM
    status: 'active',
  },
  ];

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [bookings, setBookings] = useState(initialBookings);

  const addRoom = (room) => {
    const newRoom = {
      ...room,
      id: "room-" + Date.now(),
    };
    setRooms([...rooms, newRoom]);
  };

  const updateRoom = (id, updatedRoom) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, ...updatedRoom } : room
      )
    );
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
    setBookings(bookings.filter((booking) => booking.roomId !== id));
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: "booking-" + Date.now(),
    };
    setBookings([...bookings, newBooking]);
    return newBooking.id;
  };

  const updateBooking = (id, updatedBooking) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const isRoomAvailable = (
    roomId,
    startDate,
    endDate,
    excludeBookingId
  ) => {
    const roomBookings = bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        booking.status === "active" &&
        booking.id !== excludeBookingId
    );

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    for (const booking of roomBookings) {
      const bookingStart = new Date(booking.startDate).getTime();
      const bookingEnd = new Date(booking.endDate).getTime();

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
        addRoom,
        updateRoom,
        deleteRoom,
        addBooking,
        updateBooking,
        deleteBooking,
        isRoomAvailable,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};