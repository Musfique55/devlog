"use client";

import { getUserGrowthStats } from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



interface UserGrowthChart {
  week: string;
  active: number;
  inactive: number;
}

export function UserGrowthChart() {
  const { data: userGrowthData } = useQuery<UserGrowthChart[]>({
    queryKey: ["admin-user-growth"],
    queryFn: async () => {
      const res = await getUserGrowthStats();
      return res.data;
    },
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-100">User Growth</h3>
        <p className="text-sm text-zinc-400">Active vs Inactive users weekly</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="week" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fafafa" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="active" fill="#a855f7" radius={[8, 8, 0, 0]} />
          <Bar dataKey="inactive" fill="#d946ef" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
