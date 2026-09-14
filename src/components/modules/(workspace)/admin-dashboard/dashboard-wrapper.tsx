"use client";

import { Button } from "@/components/ui/button";
import { MemberTable } from "./member-overview";

import { AlertTriangle, Calendar, LoaderCircle } from "lucide-react";
import { WorkspaceAdminStatCard } from "./stat-card";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkspaceStats,
  inviteUserToWorkspace,
} from "@/services/workspace.services";
import { getWorkspaceLogs, Log } from "@/services/standupLogs.services";
import { TeamAlerts } from "./team-alert";
import TeamHealthHeatmap from "./team-health-heat-map";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import SubscriptionAlert from "@/components/ui/subscription-alert";

interface WorkspaceResponse {
  data: WorkspaceStats;
  success: boolean;
  message: string;
}
export interface WorkspaceLogResponse<T> {
  data: T[] | null;
  success: boolean;
  message: string;
  meta?: {
    totalPages: number;
    total: number;
    page: number;
    limit: number;
  };
}

interface WorkspaceStats {
  totalLogs: number;
  totalBlockers: number;
  complianceRate: number;
}

const AdminDashboardWrapper = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const { data: user } = useAuth();

  const { data: workspaceStats } = useQuery<WorkspaceResponse>({
    queryKey: ["workspace-stats", id],
    queryFn: () => getWorkspaceStats(id),
  });

  const { data: workspaceLogs } = useQuery<WorkspaceLogResponse<Log>>({
    queryKey: ["workspace-logs", id],
    queryFn: () => getWorkspaceLogs(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { email: string; workspaceId: string }) => {
      const result = await inviteUserToWorkspace(payload);
      return result;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const payload = {
      email,
      workspaceId: id,
    };
    try {
      const res = await mutateAsync(payload);
      setOpen(false);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const blockedLogs = workspaceLogs?.data?.filter(
    (log) => log.blocker && log.blockerStatus === "OPEN",
  );

  return (
    <div className=" h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-8  mx-auto w-full space-y-12">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-background leading-none mb-4">
                Workspace Administration
              </h1>
              <p className="text-zinc-500 font-medium tracking-tight">
                Real-time governance and team metrics for DevLog core team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* <Button
                variant="outline"
                className="border-outline-variant/15 bg-surface-container-highest hover:bg-surface-variant"
              >
                Export Reports
              </Button> */}
              <Button
                onClick={() => setOpen(!open)}
                className=" text-[9px] sm:text-xs py-1.5 sm:py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-bold transition-colors cursor-pointer"
              >
                Send Invite
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 ">
            <WorkspaceAdminStatCard
              label="Active Blockers"
              value={workspaceStats?.data?.totalBlockers || 0}
              //   subtext="3 issues pending more than 24 hours."
              trend="Critical"
              trendColor="text-tertiary"
              icon={
                <AlertTriangle className="w-5 h-5 text-tertiary-container" />
              }
              variant="warning"
            />

            <WorkspaceAdminStatCard
              label="Log Compliance"
              value={`${workspaceStats?.data?.complianceRate || 0}%`}
            >
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[94.2%]"></div>
              </div>
            </WorkspaceAdminStatCard>

            <WorkspaceAdminStatCard
              label="Total Standups (Week)"
              value={workspaceStats?.data?.totalLogs || 0}
              subtext="Across 14 active projects."
              icon={<Calendar className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* Recent Team Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
              <TeamHealthHeatmap />
            </div>
            {blockedLogs && blockedLogs.length ? (
              <TeamAlerts alerts={blockedLogs} />
            ) : (
              "No Alerts Found"
            )}
          </div>

          {/* Member Table */}
          {<MemberTable id={id} />}

          {open && user?.plan === "PRO" ? (
            <Modal open={open} setOpen={setOpen} title="Invite Member">
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  name="email"
                  placeholder="enter an email"
                  required
                />
                <Button
                  disabled={isPending}
                  type="submit"
                  className="text-white/80 cursor-pointer"
                >
                  {isPending ? (
                    <span className="flex gap-2 items-center">
                      <LoaderCircle className="animate-spin transition-all" />
                      Sending Invite
                    </span>
                  ) : (
                    "Invite"
                  )}
                </Button>
              </form>
            </Modal>
          ) : (
            <SubscriptionAlert open={open} setOpen={setOpen} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardWrapper;
