"use client";

import { useAuth } from "@/hooks/useAuth";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";

export interface NotificationItem {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: NotificationItem[];
  unreadCount: number;
  clearNotifications: () => void;
  markAllAsRead: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
  unreadCount: 0,
  clearNotifications: () => {},
  markAllAsRead: () => {},
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { data: user } = useAuth();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const clearNotifications = () => setNotifications([]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const userRef = useRef(user);
  // 3. Keep the ref updated with the latest user object on every render
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    // Derive the socket URL (e.g. http://localhost:5000) from the API URL
    const publicApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const socketUrl = publicApiUrl.split("/api/v1")[0];

    const socketInstance = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {});

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    // Listen to real-time blocker warnings inside joined workspace rooms
    socketInstance.on(
      "New_Blocker",
      (data: {
        message: string;
        data: string;
        success: boolean;
        userId: string;
      }) => {
        if (data.userId !== userRef.current?.id) {
          const text = data.data || data.message || "New Blocker Alert!";
          toast.warning(text);

          setNotifications((prev) => [
            {
              id: Math.random().toString(36).substring(2, 9),
              message: text,
              timestamp: new Date(),
              read: false,
            },
            ...prev,
          ]);
        }
      },
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        unreadCount,
        clearNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
