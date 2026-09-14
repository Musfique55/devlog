"use client";
import { TeamDirectory } from "./team-directory";
import { ActivityCard } from "./activity-card";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceLogs, Log } from "@/services/standupLogs.services";
import { LogPromise } from "../../(user)/dashboard/my-logs/my-logs-wrapper";
import { getWorkspaceMembers } from "@/services/workspace.services";
import useWorkspace from "@/hooks/useWorkspace";

const ActivityWrapper = ({ id }: { id: string }) => {
  const { data: activityLogs } = useQuery({
    queryKey: ["activityLogs", id],
    queryFn: async (): Promise<LogPromise<Log>> => {
      const response = await getWorkspaceLogs(id);
      return response;
    },
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });
  const { data: workspace } = useWorkspace(id);
  const { data: members } = useQuery({
    queryKey: ["workspace-members", id],
    queryFn: async () => {
      const response = await getWorkspaceMembers(id);
      return response;
    },
  });

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between flex-1 overflow-hidden">
      {/* Central Feed */}
      <section className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 lg:space-y-12">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 text-primary uppercase tracking-[0.2em] text-[9px] sm:text-[10px] font-bold">
              <span className="w-6 sm:w-8 h-px bg-primary"></span>
              Team Feed
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-on-background">
              Activity Stream
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg">
              Real-time developer logs and workspace synchronization points.
            </p>
          </div>

          {/* Feed Cards */}
          <div className="space-y-4 sm:space-y-6">
            {activityLogs && activityLogs?.data && activityLogs?.data.length > 0
              ? activityLogs.data.map((log) => (
                  <ActivityCard key={log.id} log={log} />
                ))
              : "No feed items found."}
          </div>
        </div>
      </section>

      {/* Team Directory Sidebar - Hidden on mobile/tablet, visible on large screens */}
      <div className="hidden lg:block lg:w-80">
        {members?.data && members.data.length && (
          <TeamDirectory
            workspaceId={id}
            members={members.data}
            isAdmin={workspace!.userRole}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityWrapper;
