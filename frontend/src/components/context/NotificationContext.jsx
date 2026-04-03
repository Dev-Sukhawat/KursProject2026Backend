import { createContext, useContext, useState, useEffect } from "react";
import socket from "../../services/socket";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("room:created", (newRoom) => {
      addNotification({
        id: crypto.randomUUID(),
        type: "room:created",
        message: `New room available: ${newRoom.name}`,
        room: newRoom,
        read: false,
        createdAt: new Date(),
      });
    });

    socket.on("room:updated", (newRoom) => {
      if (newRoom.available == true) {
        addNotification({
          id: crypto.randomUUID(),
          type: "room:updated",
          message: `Room updated: ${newRoom.name}`,
          room: newRoom,
          read: false,
          createdAt: new Date(),
        });
      }
    });

    return () => {
      socket.off("room:created");
      socket.off("room:updated");
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
