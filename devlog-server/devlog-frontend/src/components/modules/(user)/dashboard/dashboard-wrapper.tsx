"use client";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "./stat-card";
import { ArrowUpRight } from "lucide-react";
import { getMyInfo } from "@/services/dashboard.services";
import { StandupForm } from "./standup-form";
import { ContributionChart } from "./contribution-chart"
import { ActivityItem } from "./activity-item";
import Link from "next/link";
import { MyDashboardInfo } from "@/app/(PrivateLayout)/(User)/dashboard/types";

interface MyDashboardResponse  {
  data : MyDashboardInfo | null,
  success : boolean,
  message : string
}

const DashboardWrapper = () => {
    const {data : myDashboardInfo} = useQuery<MyDashboardResponse>({
        queryKey : ['my-dashboard-info'],
        queryFn : () =>  getMyInfo()
    })
    
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-12 px-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Streak"
            value={myDashboardInfo?.data?.currentStreak || 0}
            unit="Days"
            accent="primary"
          />
          <StatCard
            label="Longest Streak"
            value={myDashboardInfo?.data?.longestStreak || 0}
            unit="Days"
          />
          <StatCard label="Total Logs" value={myDashboardInfo?.data?.totalLogs || 0} />
          <div className="bg-zinc-900/60 p-6 rounded-xl hover:bg-zinc-900/80 transition-colors border border-zinc-800/50">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
              This Week Logs
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-zinc-100">
                {myDashboardInfo?.data?.thisWeekLogs || 0}
              </h3>
              <span className="text-primary text-sm font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Standup Form */}
            <StandupForm />

            {/* Contribution Chart */}
            <ContributionChart />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Recent Activity Header */}
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold text-zinc-100">
                Recent Activity
              </h2>
              <Link
                href="/dashboard/my-logs"
                className="text-xs font-semibold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
              >
                View All Logs
              </Link>
            </div>

            {/* Activity Items */}
            <div className="space-y-4">
              {myDashboardInfo && myDashboardInfo.data && myDashboardInfo.data?.recentLogs?.length && myDashboardInfo.data?.recentLogs
             .map((activity, index) => (
                <ActivityItem
                  key={index}
                  standupLog={activity}
                  borderColor={index === 0 ? "border-l-primary" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-10">
        <div className="text-9xl font-bold text-primary">{"}"}</div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
