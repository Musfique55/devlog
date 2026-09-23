"use client";

import { getAccessToken } from "@/services/auth.services";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "@/services/workspace.services";

export interface NotificationItem {
  id: string;
  message: string;
  read: boolean;
  workspaceId?: string;
  type: string;
  recipientId?: string;
  actorId?: string;
  createdAt: string | Date;
  timestamp?: string | Date;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  newNotifications: boolean;
  setNewNotifications: (value: boolean) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
  clearNotifications: () => {},
  newNotifications: false,
  setNewNotifications: () => {},
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: user } = useAuth();
  const [newNotifications, setNewNotifications] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async (): Promise<NotificationItem[]> => {
      const res = await getNotifications();
      return res.data || [];
    },
    enabled: !!user?.id,
  });

  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0;

  const markAllAsRead = () => {
    setNewNotifications(false);
  };

  const clearNotifications = () => {
    setNewNotifications(false);
    queryClient.setQueryData(["notifications", userRef.current?.id], []);
  };

  const userRef = useRef(user);
  // Keep the ref updated with the latest user object on every render
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    const initSocket = async () => {
      const publicApiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const socketUrl = publicApiUrl.split("/api/v1")[0];

      const token = await getAccessToken();
      socketInstance = io(socketUrl, {
        auth: {
          token: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      // Listen to real-time notifications
      socketInstance.on("notification", (data: NotificationItem) => {
        if (
          data.type === "BLOCKER_CREATED" &&
          data.recipientId === userRef.current?.id
        ) {
          return;
        } else if (
          data.type === "BLOCKER_RESOLVED" &&
          data.actorId === userRef.current?.id
        ) {
          return;
        }
        const newNotification: NotificationItem = {
          ...data,
          timestamp: data.timestamp || data.createdAt || new Date(),
          createdAt: data.createdAt || data.timestamp || new Date(),
        };
        setNewNotifications(true);

        queryClient.setQueryData<NotificationItem[]>(
          ["notifications", userRef.current?.id],
          (oldData) => {
            if (!oldData) return [newNotification];
            // Prevent merging the same data twice
            if (oldData.some((n) => n.id === newNotification.id)) {
              return oldData;
            }
            return [newNotification, ...oldData];
          },
        );
        toast.info(newNotification.message);
      });

      setSocket(socketInstance);
    };

    initSocket();

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [queryClient]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        unreadCount,
        markAllAsRead,
        clearNotifications,
        newNotifications,
        setNewNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
