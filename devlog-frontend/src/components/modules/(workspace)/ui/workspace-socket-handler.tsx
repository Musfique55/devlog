"use client";

import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";

export function WorkspaceSocketHandler({ id }: { id: string }) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit(id);

    return () => {
      socket.emit(id);
    };
  }, [socket, id]);

  return null;
}
