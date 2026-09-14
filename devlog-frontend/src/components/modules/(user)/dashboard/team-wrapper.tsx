"use client";

import { useQuery } from "@tanstack/react-query";
import { OverviewStats } from "../../(workspace)/dashboard/overview-stats";
import { TeamGrid } from "../../(workspace)/dashboard/team-grid";
import { getWorkspacesByUser } from "@/services/workspace.services";
import TeamFallback from "../../(workspace)/ui/fallback";

const TeamWrapper = () => {
  const { data: teams } = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: async () => {
      const res = await getWorkspacesByUser();
      return res.data;
    },
  });


  return (
    <main className="lg:ml-64 pt-16 min-h-screen">
      <div className="p-10 max-w-[1400px] mx-auto">
        {teams && teams.length ? (
          <>
            <OverviewStats />
            <TeamGrid teams={teams} />
          </>
        ) : (
          <TeamFallback />
        )}
      </div>
    </main>
  );
};

export default TeamWrapper;
