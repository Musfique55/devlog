"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Member } from "@/hooks/useWorkspace";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TeamCardProps {
  icon: React.ReactNode;
  name: string;
  status: boolean;
  statusColor: string;
  members: Member[];
  logsThisWeek: number;
  id: string;
}

export function TeamCard({
  id,
  icon,
  name,
  status,
  statusColor,
  members,
  logsThisWeek,
}: TeamCardProps) {
  const { data: user } = useAuth();
  const isAdmin =
    members.find((member) => member.userId === user?.id)?.role === "ADMIN";
  return (
    <div className="group bg-zinc-900/60 p-6 rounded-xl transition-all duration-300 hover:bg-zinc-900/80 hover:translate-y-[-4px] cursor-pointer">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold ${statusColor}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${statusColor.includes("emerald") ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          {status}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-on-surface mb-4">{name}</h4>

      {/* Stats */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
          <span className="text-xs text-on-surface-variant">Members</span>
          <span className="text-xs font-semibold text-on-surface">
            {members.length} Developers
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
          <span className="text-xs text-on-surface-variant">
            Logs this week
          </span>
          <span className="text-xs font-semibold text-primary">
            {logsThisWeek} Updates
          </span>
        </div>
      </div>

      {/* Button */}
      <Link
        href={
          isAdmin
            ? `/workspace/${id}/admin-dashboard`
            : `/workspace/${id}/activity`
        }
      >
        <Button className="w-full bg-surface-container-highest text-on-surface text-xs font-bold group-hover:bg-primary group-hover:text-on-primary transition-all gap-2 cursor-pointer">
          Switch to Workspace
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
