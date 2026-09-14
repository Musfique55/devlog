"use client";

import Image from "next/image";
import { Log } from "@/services/standupLogs.services";

export function ActivityCard({ log }: { log: Log }) {
  const getHours = (date: Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    return Math.floor(diffHrs);
  };
  return (
    <div className="bg-surface-container  sm:p-6 rounded-xl hover:bg-surface-container-high transition-all duration-300 group ">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 border border-white/20 p-4 rounded-xl">
        {log.user.image ? (
          <Image
            height={32}
            width={32}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg shrink-0 object-cover"
            alt={log.user.name}
            src={log.user.image}
          />
        ) : (
          <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
            <p>{log.user?.name[0]}</p>
          </div>
        )}

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-4">
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                {log.user.name}
              </h3>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest font-semibold truncate">
                {getHours(log.createdAt)}h ago
              </p>
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-zinc-700 group-hover:text-primary transition-colors h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              <MoreHorizontal className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Todays Work */}
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                Todays Work
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed wrap-break-word">
                {log.todayWork}
              </p>
            </div>

            {/* To Do */}
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                Tomorrows Work
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant wrap-break-word">
                {log.tomorrowWork}
              </p>
            </div>

            {/* Blockers */}
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                Blockers
              </p>
              {log.blocker ? (
                <div className="bg-red-500/20 border-l-2 border-red-500 p-2 rounded-sm">
                  <p className="text-xs sm:text-sm text-on-error-container">
                    {log.blocker}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zinc-600 italic">
                  None reported.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
