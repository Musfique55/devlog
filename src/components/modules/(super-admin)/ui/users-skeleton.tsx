import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UsersSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Identity
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Email Address
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Tier & Role
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Enrollment
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-lg bg-zinc-800" />
                    <div className="space-y-2">
                      <Skeleton className="w-24 h-4 bg-zinc-800" />
                      <Skeleton className="w-16 h-3 bg-zinc-800" />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Skeleton className="w-32 h-4 bg-zinc-800" />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-5 bg-zinc-800" />
                    <Skeleton className="w-20 h-4 bg-zinc-800" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Skeleton className="w-28 h-4 bg-zinc-800" />
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="w-8 h-8 bg-zinc-800" />
                    <Skeleton className="w-8 h-8 bg-zinc-800" />
                    <Skeleton className="w-8 h-8 bg-zinc-800" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 px-6 py-4">
        <Skeleton className="w-48 h-4 bg-zinc-800" />
        <div className="flex gap-2">
          <Skeleton className="w-20 h-8 bg-zinc-800" />
          <Skeleton className="w-32 h-8 bg-zinc-800" />
          <Skeleton className="w-20 h-8 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};

export default UsersSkeleton;
