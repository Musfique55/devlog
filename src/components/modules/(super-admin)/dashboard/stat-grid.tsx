"use client";
import { getStats } from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { Users, DollarSign, Network, Logs } from "lucide-react";

interface Stat {
  totalUsers: number;
  totalWorkspaces: number;
  totalLogs: number;
  proUsers: number;
  freeUsers: number;
  newUsersThisWeek: number;
  monthlyRevenue: number;
}

export function SuperAdminStatsGrid() {
  const { data: stats } = useQuery<Stat>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await getStats();
      return res.data;
    },
  });


  return (
    <div className="grid  grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div
              className={`bg-gradient-to-br from-purple-500 to-violet-500 p-2.5 rounded-lg text-white`}
            >
              <DollarSign />
            </div>
        </div>
        <h3 className="text-sm font-medium text-zinc-400 mb-2">
          Monthly Revenue
        </h3>
        <p className="text-2xl font-bold text-zinc-100 mb-2">{stats?.monthlyRevenue}</p>
        <p className="text-xs text-emerald-400">{}</p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div
              className={`bg-gradient-to-br from-purple-500 to-violet-500 p-2.5 rounded-lg text-white`}
            >
              <Users />
            </div>
        </div>
        <h3 className="text-sm font-medium text-zinc-400 mb-2">
          Active Subscribers
        </h3>
        <p className="text-2xl font-bold text-zinc-100 mb-2">{stats?.proUsers}</p>
        {/* <p className="text-xs text-emerald-400">{}</p> */}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div
              className={`bg-gradient-to-br from-purple-500 to-violet-500 p-2.5 rounded-lg text-white`}
            >
              <Network />
            </div>
        </div>
        <h3 className="text-sm font-medium text-zinc-400 mb-2">
          Total Workspaces
        </h3>
        <p className="text-2xl font-bold text-zinc-100 mb-2">{stats?.totalWorkspaces}</p>
        <p className="text-xs text-emerald-400">{}</p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div
              className={`bg-gradient-to-br from-purple-500 to-violet-500 p-2.5 rounded-lg text-white`}
            >
              <Logs />
            </div>
        </div>
        <h3 className="text-sm font-medium text-zinc-400 mb-2">
          Total Logs
        </h3>
        <p className="text-2xl font-bold text-zinc-100 mb-2">{stats?.totalLogs}</p>
        <p className="text-xs text-emerald-400">{}</p>
      </div>
    </div>
  );
}
