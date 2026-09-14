"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import React from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logout } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const UserProfilePopover = ({
  children,
}: {
  children: React.ReactNode;
}) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if(!res.success) return toast.error(res.message);
            toast.success(res.message);
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            router.push('/auth/login');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            toast.error(error.message);
        }
    }

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col justify-start items-start">
          <Link href="/settings#profile">
            <Button className="flex items-center gap-3 bg-transparent text-zinc-400 cursor-pointer">
            <User /> Update Profile
          </Button>
          </Link>
          <Button onClick={() => handleLogout()} className="flex items-center gap-3 bg-transparent text-zinc-400 cursor-pointer">
            <LogOut /> Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfilePopover;
