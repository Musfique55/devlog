"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceMembers } from "@/services/workspace.services";
import { useDebounce } from "use-debounce";
import PopoverAction from "./popover-action";
import { MemberTableSkeleton } from "./member-table-skeleton";

interface Member {
  id: string;
  workspaceId: string;
  role: "ADMIN" | "MEMBER";
  createdAt: Date;
  updatedAt: Date;
  joinedAt: Date;
  deletedAt: Date | null;
  lastLog: Date | null;
  user: {
    name: string;
    email: string;
    id: string;
    image: string | null;
  };
}

export function MemberTable({ id }: { id: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { data: members, isLoading } = useQuery<Member[]>({
    queryKey: ["workspace-members", id, debouncedQuery],
    queryFn: async () => {
      const response = await getWorkspaceMembers(id, {
        searchTerm: debouncedQuery,
      });
      return response.data;
    },
    placeholderData: (prevData) => prevData,
  });

  return (
    <div className="bg-surface-container rounded-xl overflow-hidden shadow-2xl shadow-black/20">
      <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-container-high/30">
        <h3 className="text-lg font-bold tracking-tight text-on-background">
          Member Overview
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <Input
              className="bg-surface-container-lowest border-none ring-1 ring-outline-variant/10 rounded-lg pl-9 pr-4 py-2 text-xs text-on-background focus:ring-primary transition-all outline-none w-full"
              placeholder="Search members..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-surface-container-highest ring-1 ring-outline-variant/15"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container-high/50 text-[0.6875rem] font-bold uppercase tracking-widest text-zinc-500 border-b border-outline-variant/10">
              <th className="px-8 py-4">Name</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Last Log</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <MemberTableSkeleton />
          ) : (
            <tbody className="divide-y divide-outline-variant/10">
              {members && members.length ? (
                members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-surface-container-high transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        {member.user.image ? (
                          <Image
                            width={32}
                            height={32}
                            alt={member.user.name}
                            className="w-8 h-8 rounded object-cover"
                            src={member.user.image}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
                            <p>{member.user.name[0]}</p>
                          </div>
                        )}

                        <div>
                          <p className="font-bold text-on-background">
                            {member.user.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[0.6875rem] font-bold uppercase tracking-tight">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-zinc-400 text-xs">
                      {member.lastLog
                        ? new Date(member.lastLog).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <PopoverAction
                        workspaceId={id}
                        memberId={member.user.id}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Member Found</td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
