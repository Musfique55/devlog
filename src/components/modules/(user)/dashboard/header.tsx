"use client";

import UserProfilePopover from "@/components/shared/user-profile-popover";
import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { Bell, HelpCircle } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSocket } from "@/providers/SocketProvider";

interface HeaderProps {
  title?: string;
  onSearch?: (value: string) => void;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUserInfo();
      return res.data;
    },
  });

  const { notifications, unreadCount, markAllAsRead, clearNotifications } =
    useSocket();

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/20 flex justify-between items-center px-4 md:px-8 z-40 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Spacer for the mobile menu button (which is fixed at left-4) */}
        <div className="w-10 lg:hidden" />

        <h2 className="text-base md:text-lg font-bold text-zinc-100 tracking-tight truncate">
          {title}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-6">
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button
              onClick={markAllAsRead}
              className="relative text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-zinc-950 animate-pulse"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-zinc-900 border-zinc-800 text-zinc-100 p-4 rounded-xl shadow-2xl z-50">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800/50 mb-3">
              <h4 className="font-semibold text-sm">Notifications</h4>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-primary hover:text-primary/80 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
              {notifications.length === 0 ? (
                <p className="text-zinc-500 text-xs text-center py-6">
                  No new notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-850 hover:border-zinc-800 transition-all flex flex-col gap-1"
                  >
                    <p className="text-xs font-medium text-zinc-200 leading-normal">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-semibold self-end">
                      {new Date(n.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <div className="ml-1 md:ml-0">
          {user && user?.image ? (
            <UserProfilePopover>
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/20 cursor-pointer">
                <Image
                  src={user.image}
                  alt="User profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </UserProfilePopover>
          ) : (
            <UserProfilePopover>
              <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-amber-700 transition-colors">
                <p>{user?.name?.[0] || "U"}</p>
              </div>
            </UserProfilePopover>
          )}
        </div>
      </div>
    </header>
  );
}
