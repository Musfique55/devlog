"use client";

import UserProfilePopover from "@/components/shared/user-profile-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/hooks/useAuth";
import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { Bell, Settings, Download } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SuperAdminHeader() {
  const pathname = usePathname();
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUserInfo();
      return res.data;
    },
  });

  const lastSegment = pathname.split("/").pop() || "dashboard";
  
  const currentRoute = lastSegment.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1);



  return (
    <header className="sticky top-0 right-0 w-full bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 flex justify-between items-center h-16 lg:px-4 px-8 z-40">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-xl font-bold text-zinc-100 hidden sm:block">
          {currentRoute}
        </h2>
        <div className="relative hidden lg:block">
          <Input
            className="bg-zinc-800 border-zinc-700 ring-1 ring-white/5 rounded-lg pl-4 pr-4 py-2 text-sm w-64 focus:ring-purple-500 focus:ring-2 transition-all text-zinc-100"
            placeholder="Search metrics..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-purple-400 h-10 w-10"
        >
          <Download className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-purple-400 h-10 w-10"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-purple-400 h-10 w-10"
        >
          <Settings className="w-5 h-5" />
        </Button>
        {user?.image ? (
          <UserProfilePopover>
            <Image
              width={32}
              height={32}
              alt="User Avatar"
              className="w-8 h-8 rounded-full bg-zinc-800 object-cover hidden sm:block"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
            />
          </UserProfilePopover>
        ) : (
          <UserProfilePopover>
            <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl cursor-pointer">
              <p>{user?.name[0]}</p>
            </div>
          </UserProfilePopover>
        )}
      </div>
    </header>
  );
}
