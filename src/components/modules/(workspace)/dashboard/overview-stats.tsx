"use client";

import { Button } from "@/components/ui/button";
import { getUsersOverallWorkspaceStats } from "@/services/workspace.services";
import { useQuery } from "@tanstack/react-query";
import { Filter, BookOpen, Zap, AlertCircle } from "lucide-react";

export function OverviewStats() {
  const {data} = useQuery({
    queryKey: ["user-workspace-stats"],
    queryFn: async () => {
      const res = await getUsersOverallWorkspaceStats();
      return res.data;
    },
  });
  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-on-surface mb-1">
            Ecosystem Overview
          </h2>
          <p className="text-on-surface-variant text-sm font-medium">
            Real-time performance across 12 connected workspaces
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-outline-variant/20 bg-surface-container text-on-surface hover:bg-surface-container-high gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          {/* <Button
            variant="outline"
            size="sm"
            className="border-outline-variant/20 bg-surface-container text-on-surface hover:bg-surface-container-high gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Logs */}
        <div className="col-span-1 lg:col-span-1 bg-surface-container p-8 rounded-xl border-l-2 border-primary relative overflow-hidden bg-zinc-900/60">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BookOpen className="w-20 h-20" />
          </div>
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant mb-2 font-medium">
            Total Logs Contributed
          </p>
          <div className="flex items-center gap-4">
            <h3 className="text-5xl font-extrabold tracking-tighter text-on-surface">
              {data?.totalLogs || 0}
            </h3>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full">
              +12% vs LW
            </span>
          </div>
          <div className="mt-6 w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4 rounded-full" />
          </div>
        </div>

        {/* Team Streak */}
        <div className="col-span-1 bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 bg-zinc-900/60">
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant mb-2 font-medium">
            Average Team Streak
          </p>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary" />
            <h3 className="text-4xl font-bold tracking-tight text-on-surface">
              {data?.avgStreak || 0} Days
            </h3>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border border-surface bg-surface-container-highest" />
              <div className="w-6 h-6 rounded-full border border-surface bg-primary-container" />
              <div className="w-6 h-6 rounded-full border border-surface bg-surface-container-high" />
            </div>
            <span className="text-[11px] text-on-surface-variant">
              Top 5% of organizations
            </span>
          </div>
        </div>

        {/* Active Blockers */}
        <div className="col-span-1 bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 bg-zinc-900/60">
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant mb-2 font-medium">
            Active Blockers
          </p>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h3 className="text-4xl font-bold tracking-tight text-on-surface">
              {data?.totalBlockers || 0}
            </h3>
          </div>
          <p className="mt-6 text-xs text-error/80 font-medium">
            Critical resolution required in 2 workspaces
          </p>
        </div>
      </div>
    </section>
  );
}
