"use client";

import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";

export function WorkspaceSocketHandler({ id }: { id: string }) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Join the workspace room on mount or when the ID changes
    socket.emit("join_workspace", id);

    return () => {
      // Leave the workspace room when unmounting or switching workspaces
      socket.emit("leave_workspace", id);
    };
  }, [socket, id]);

  return null;
}
