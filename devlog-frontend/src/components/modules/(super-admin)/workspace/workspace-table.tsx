"use client";
import Pagination from "@/components/shared/pagination";
import { getWorkspaces } from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical, Zap } from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/dist/client/components/navigation";
import Image from "next/image";
import { useState } from "react";
import { WorkspaceTableSkeleton } from "./skeleton";

interface GetWorkspacesResponse {
  data: Workspace[] | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  isActive: boolean;
  admin: {
    name: string;
    email: string;
    id: string;
    image: string | null;
  };
  memberCount: number;
  logCount: number;
}

const WorkspaceTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const [sortby, setSortby] = useState("Total Logs");
  const { data: workspaceData, isLoading } = useQuery<GetWorkspacesResponse>({
    queryKey: ["admin-workspaces", filter],
    queryFn: async () => {
      const response = await getWorkspaces(filter);
      return response;
    },
    select: (data) => {
      if (!data?.data) return data;
      const sortedData = [...data.data].sort((a, b) => {
        if (sortby === "Total Logs") {
          return b.logCount - a.logCount;
        } else if (sortby === "Creation Date") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (sortby === "Member Count") {
          return b.memberCount - a.memberCount;
        }
        return 0;
      });
      return {
        ...data,
        data: sortedData,
      };
    },
    placeholderData: (prevData) => prevData,
  });

  const handleFilter = (filterBy: string) => {
    const url = new URLSearchParams(searchParams);
    if (filterBy === "all") {
      url.delete("filter");
    } else if (filterBy === "active") {
      url.set("filter", "isActive=true");
    } else {
      url.set("filter", "isActive=false");
    }
    router.push(`?${url.toString()}`);
  };

  if (isLoading) {
    return <WorkspaceTableSkeleton />;
  }

  return (
    <section className=" pb-12">
      <div className="p-6 bg-zinc-900 border-b border-zinc-700/50 flex justify-between items-center rounded-xl">
        <div className="flex gap-6">
          <button
            onClick={() => handleFilter("all")}
            className={`${filter === "all" ? "text-purple-300 border-b-2 border-purple-400" : "text-slate-500"} pb-1 text-[10px] lg:text-xs font-bold uppercase tracking-widest`}
          >
            All Workspaces
          </button>
          <button
            onClick={() => handleFilter("active")}
            className={`${filter === "isActive=true" ? "text-purple-300 border-b-2 border-purple-400" : "text-slate-500"} pb-1 text-[10px] lg:text-xs font-bold uppercase tracking-widest`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilter("inactive")}
            className={`${filter === "isActive=false" ? "text-purple-300 border-b-2 border-purple-400" : "text-slate-500"} pb-1 text-[10px] lg:text-xs font-bold uppercase tracking-widest`}
          >
            Inactive
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Sort by:
          </span>
          <select
            value={sortby}
            onChange={(e) => setSortby(e.target.value)}
            className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-purple-300 focus:ring-0 cursor-pointer"
          >
            <option>Total Logs</option>
            <option>Creation Date</option>
            <option>Member Count</option>
          </select>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl mt-5">
        <table className="hidden lg:block w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-700/50">
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                Workspace Name
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                Owner
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase text-center">
                Members
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase text-right">
                Total Logs
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                Plan Type
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                Status
              </th>
              <th className="px-8 py-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700/30">
            {workspaceData &&
              workspaceData?.data &&
              workspaceData.data.map((workspace) => (
                <tr
                  key={workspace.id}
                  className="hover:bg-zinc-600/30 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          workspace.isActive
                            ? "bg-purple-400 shadow-[0_0_8px_rgba(196,181,253,0.6)]"
                            : "bg-slate-600"
                        }`}
                      ></div>
                      <div>
                        <div className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                          {workspace.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          ID: {workspace.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {workspace.admin.image ? (
                        <Image
                          src={workspace.admin.image}
                          alt={workspace.admin.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full grayscale hover:grayscale-0 transition-all"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-slate-400">
                          {workspace.admin.name.charAt(0)}
                        </div>
                      )}

                      <span className="text-sm text-slate-400 font-medium">
                        {workspace.admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-2 py-1 bg-slate-900 text-slate-300 rounded text-xs font-bold">
                      {workspace.memberCount}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-mono text-xs text-purple-300">
                    {workspace.logCount?.toLocaleString?.()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-300" />
                      <span className="text-[10px] font-black tracking-widest text-purple-300 uppercase">
                        {workspace.isActive ? "Enterprise" : "Standard"}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                        workspace.isActive === true
                          ? "bg-purple-500/10 text-purple-300"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          workspace.isActive === true
                            ? "bg-purple-400"
                            : "bg-slate-500"
                        }`}
                      ></span>
                      {workspace.isActive ? "Active" : "Idle"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-500 hover:text-purple-300 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* MOBILE VIEW: Grid of Cards (Visible until 'lg' breakpoint) */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {workspaceData?.data?.map((workspace) => (
            <div
              key={workspace.id}
              className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-5 hover:border-purple-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${workspace.isActive ? "bg-purple-400 shadow-[0_0_8px_rgba(196,181,253,0.6)]" : "bg-slate-600"}`}
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-100">
                      {workspace.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      ID: {workspace.id}
                    </div>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-purple-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-zinc-700/30">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Owner
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Use your existing Image/Avatar logic here */}
                    <span className="text-xs text-slate-300">
                      {workspace.admin.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Status
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${workspace.isActive ? "bg-purple-500/10 text-purple-300" : "bg-slate-500/10 text-slate-400"}`}
                  >
                    {workspace.isActive ? "Active" : "Idle"}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Plan
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-purple-300" />
                    <span className="text-[10px] font-black text-purple-300 uppercase">
                      {workspace.isActive ? "Enterprise" : "Standard"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Logs
                  </div>
                  <div className="text-xs font-mono text-purple-300">
                    {workspace.logCount?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {workspaceData?.meta && (
        <div className="mt-5">
          <Pagination
            itemsName="workspaces"
            limit={10}
            meta={workspaceData?.meta}
          />
        </div>
      )}
    </section>
  );
};

export default WorkspaceTable;
