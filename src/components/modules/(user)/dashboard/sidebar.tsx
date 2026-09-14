"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, FileText, Users, Settings, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContent from "./sidebar-content";
import { toast } from "sonner";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "logs",
      label: "My Logs",
      icon: FileText,
      href: "/dashboard/my-logs",
    },
    { id: "team", label: "Team", icon: Users, href: "/dashboard/team" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const activeItem = navItems.find((item) => item.href === pathname)?.id;

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* MOBILE TRIGGER - Only visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Sheet open={open} onOpenChange={setOpen}>
          {!open && (
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-zinc-900 border-zinc-800 text-zinc-400"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
          )}
          <SheetContent
            side="left"
            className="p-0 bg-zinc-950 border-r border-zinc-800 w-64"
          >
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SidebarContent
              activeItem={activeItem!}
              navItems={navItems}
              setOpen={setOpen}
              handleLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR - Hidden on small screens, fixed on lg+ */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-zinc-900/50 backdrop-blur-xl flex-col z-50 border-r border-zinc-800/20">
        <SidebarContent
          activeItem={activeItem!}
          navItems={navItems}
          setOpen={setOpen}
          handleLogout={handleLogout}
        />
      </aside>
    </>
  );
}
