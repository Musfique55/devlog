"use client";

import { useState } from "react";
import Image from "next/image";
import { Log, resolveBlocker } from "@/services/standupLogs.services";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  MessageSquare,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function ActivityCard({
  log,
  workspaceId,
}: {
  log: Log;
  workspaceId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { data: currentUser } = useAuth();

  const getHours = (date: Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    return Math.floor(diffHrs);
  };

  const isLogCreator = currentUser?.id === log.user?.id;
  const isResolved = log.blockerStatus === "RESOLVED";
  const hasBlocker = Boolean(log.blocker && log.blocker.trim().length > 0);
  const canResolve = hasBlocker && !isResolved && !isLogCreator;

  const { mutateAsync: resolveAsync, isPending } = useMutation({
    mutationFn: async (payload: { blockerComment: string }) => {
      return await resolveBlocker(workspaceId!, log.id, payload);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message || "Blocker marked as RESOLVED");
        setOpen(false);
        setComment("");
        // Invalidate activity logs & workspace logs queries
        queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
        if (workspaceId) {
          queryClient.invalidateQueries({
            queryKey: ["activityLogs", workspaceId],
          });
          queryClient.invalidateQueries({
            queryKey: ["workspace-logs", workspaceId],
          });
          queryClient.invalidateQueries({
            queryKey: ["workspace-stats", workspaceId],
          });
        }
      } else {
        toast.error(data?.message || "Failed to resolve blocker");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.message || "Failed to resolve blocker");
    },
  });

  const handleResolve = async () => {
    await resolveAsync({ blockerComment: comment });
  };

  return (
    <div className="bg-surface-container sm:p-6 rounded-xl hover:bg-surface-container-high transition-all duration-300 group">
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
          <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl shrink-0">
            <p>{log.user?.name ? log.user.name[0] : "?"}</p>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Today's Work */}
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                Todays Work
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed wrap-break-word">
                {log.todayWork}
              </p>
            </div>

            {/* Tomorrow's Work */}
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                Tomorrows Work
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant wrap-break-word">
                {log.tomorrowWork}
              </p>
            </div>

            {/* Blockers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isResolved ? "bg-emerald-500" : "bg-red-500"
                    } shrink-0`}
                  ></span>
                  Blockers
                </p>
                {log.blocker && (
                  <Badge
                    variant={isResolved ? "outline" : "destructive"}
                    className={`text-[9px] px-1.5 py-0.5 uppercase tracking-wider font-semibold ${
                      isResolved
                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {isResolved ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Resolved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        Open
                      </span>
                    )}
                  </Badge>
                )}
              </div>

              {log.blocker ? (
                <div
                  className={`p-3 rounded-lg border space-y-2.5 ${
                    isResolved
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <p
                    className={`text-xs sm:text-sm ${
                      isResolved ? "text-emerald-200/90" : "text-red-200"
                    }`}
                  >
                    {log.blocker}
                  </p>

                  {/* Resolution Comment / Details */}
                  {isResolved && log.blockerComment && (
                    <div className="pt-2 border-t border-emerald-500/20 text-xs space-y-1">
                      <p className="flex items-start gap-1.5 text-zinc-300 bg-zinc-950/40 p-2 rounded border border-emerald-500/10">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-emerald-400 font-semibold">
                            Resolution:{" "}
                          </strong>
                          {log.blockerComment}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Resolve Button for Open Blockers */}
                  {canResolve && (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto mt-2 text-xs h-7 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border-emerald-500/40 font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Resolve Blocker
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-on-surface">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            Resolve Blocker
                          </DialogTitle>
                          <DialogDescription className="text-zinc-400 text-xs">
                            Mark this blocker as resolved and add a comment
                            explaining the resolution.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-3 py-2">
                          <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-md text-xs text-red-300">
                            <p className="font-semibold text-red-400 mb-0.5">
                              Reported Blocker:
                            </p>
                            <p>{log.blocker}</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-300">
                              Resolution Comment
                            </label>
                            <Textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Explain how this blocker was resolved..."
                              className="bg-zinc-950 border-zinc-800 text-zinc-100 text-xs focus-visible:ring-emerald-500 min-h-20"
                            />
                          </div>
                        </div>

                        <DialogFooter className="flex gap-2 justify-end sm:justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setOpen(false)}
                            className="border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white text-xs cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={isPending}
                            onClick={handleResolve}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer"
                          >
                            {isPending ? (
                              <span className="flex items-center gap-1.5">
                                <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                                Resolving...
                              </span>
                            ) : (
                              "Save Resolution"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
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
