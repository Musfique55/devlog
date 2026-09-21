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
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/workspace.services";

export interface NotificationItem {
  id: string;
  message: string;
  read: boolean;
  workspaceId?: string;
  type: string;
  recipientId?: string;
  actorId?: string;
  createdAt: Date;
  timestamp : Date;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
  newNotifications: boolean;
  setNewNotifications: (value: boolean) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
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
  const queryClient = new QueryClient();
  const { data : notifications = [], isPending } = useQuery({
    queryKey: ["notifications",user?.id],
    queryFn: async (): Promise<NotificationItem[]> => {
      const res = await getNotifications();
      return res.data;
    },
  });

  // console.log(notifications);

  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0;

  // const clearNotifications = () => setNotifications([]);

  const markAllAsRead = () => {
    setNewNotifications(false);
    // setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
        const newNotification: NotificationItem = {
          ...data,
          timestamp : data.createdAt
        }
        setNewNotifications(true);
        queryClient.setQueryData(["notifications",user?.id], (oldData : NotificationItem[]) =>{
          console.log(oldData);
          return [newNotification,...(oldData ?? [])];
        } );
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
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        unreadCount,
        // clearNotifications,
        markAllAsRead,
        newNotifications,
        setNewNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
