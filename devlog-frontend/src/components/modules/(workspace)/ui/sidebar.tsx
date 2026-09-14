"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/hooks/useWorkspace";
import { Menu, TrendingUp, Briefcase, Settings, Grid } from "lucide-react";

import { useParams, usePathname } from "next/navigation";
import Modal from "@/components/ui/modal";
import { StandupForm } from "../../(user)/dashboard/standup-form";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getWorkspace } from "@/services/workspace.services";
import SidebarContents from "./sidebar-content";

export interface WorkspaceResponse {
  data: Workspace;
  message: string;
  success: boolean;
}



export function WorkspaceSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const { id } = useParams();

  const {data : workspace} = useQuery({
    queryKey: ["workspace", id],
    queryFn:  () =>  getWorkspace(id as string)
  })

   const navItems = [
    ...(workspace?.data?.userRole === "ADMIN"
      ? [
          {
            icon: Grid,
            label: "Dashboard",
            href: `/workspace/${id}/admin-dashboard`,
          },
        ]
      : []),
    { icon: TrendingUp, label: "Activity", href: `/workspace/${id}/activity` },
    { icon: Briefcase, label: "Workspaces", href: "/dashboard/team" }
  ];

  return (
    <>
      {/* MOBILE TRIGGER - Only visible on small screens */}
      <div className="lg:hidden fixed top-3.5 left-4 z-[60]">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          {
            !isSheetOpen &&
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-zinc-950 border-zinc-800 text-zinc-400">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          }
          <SheetContent side="left" className="p-0 bg-zinc-950 border-r border-zinc-800 w-64">
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SidebarContents navItems={navItems} setIsSheetOpen={setIsSheetOpen} setIsModalOpen={setIsModalOpen} pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR - Visible only on lg+ */}
      <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-zinc-950 flex-col z-50 transition-all duration-200 border-r border-white/5">
        <SidebarContents navItems={navItems} setIsSheetOpen={setIsSheetOpen} setIsModalOpen={setIsModalOpen} pathname={pathname}/>
      </aside>

      {/* Standup Form Modal */}
      {isModalOpen && (
        <Modal title="Create New Log" open={isModalOpen} setOpen={setIsModalOpen}>
          <StandupForm workspaceId={id as string} />
        </Modal>
      )}
    </>
  );
}