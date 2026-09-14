"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/hooks/useAuth";
import { getUsers, updateUserStatus } from "@/services/admin.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Ban, Trash2, ArchiveRestore, Unlock } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { FilterBar } from "./filter-bar";
import UsersSkeleton from "../ui/users-skeleton";
import UsersFallback from "../ui/users-fallback";
import Pagination from "@/components/shared/pagination";
import { Suspense } from "react";

interface UserTableResponse {
  success: boolean;
  message: string;
  data: User[] | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

function getStatusColor(status: string) {
  switch (status) {
    case "isBlocked : false":
      return "bg-purple-500";
    case "isBlocked : true":
      return "bg-zinc-700";
    case "isDeleted : true":
      return "bg-red-500";
    default:
      return "bg-zinc-700";
  }
}

export function UsersTable({
  currentPage,
  currentFilter,
}: {
  currentPage: number;
  currentFilter: string;
}) {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<UserTableResponse>({
    queryKey: ["admin-users", currentPage, currentFilter],
    queryFn: async () => {
      const res = await getUsers({
        page: currentPage.toString(),
        limit: "3",
        ...(currentFilter === "active" && { isDeleted: "false" }),
        ...(currentFilter === "banned" && { isDeleted: "true" }),
        ...(currentFilter === "inactive" && { isBlocked: "true" }),
      });
      return res;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleUserStatusChange = async (
    userId: string,
    action: "block" | "unblock" | "delete" | "restore",
  ) => {
    toast.message(`Are you sure you want to ${action} this user?`, {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            let payload = {};
            if (action === "block") {
              payload = { isBlocked: true };
            } else if (action === "unblock") {
              payload = { isBlocked: false };
            } else if (action === "delete") {
              payload = { isDeleted: true };
            } else if (action === "restore") {
              payload = { isDeleted: false };
            }

            const res = await updateUserStatus(userId, payload);
            if (!res.data.success) {
              toast.error(
                res.data.message ||
                  "An error occurred while updating user status.",
              );
            } else {
              toast.success(
                res.data.message || "User status updated successfully.",
              );
              queryClient.invalidateQueries({
                queryKey: ["admin-users"],
              });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast.error(
              error.message || "An error occurred while updating user status.",
            );
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  if (isLoading) {
    return <UsersSkeleton />;
  }

  // Empty state
  if (users && users.data?.length === 0) {
    return (
      <>
        <FilterBar />
        <UsersFallback />
      </>
    );
  }

  return (
    <div>
      <Suspense>
        <FilterBar />
      </Suspense>
      {/* User Table */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <table className="hidden lg:block w-full text-left border-collapse">
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
            {users &&
              users.data &&
              users.data.length > 0 &&
              users.data.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {user.image ? (
                          <Image
                            alt={user.name}
                            className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                            src={user.image}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-zinc-700 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-medium">
                            {user.name.charAt(0)}
                          </div>
                        )}

                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                            `isBlocked : ${user.isBlocked}, isDeleted : ${user.isDeleted}`,
                          )} border-2 border-zinc-900 rounded-full`}
                        ></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-100">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-medium">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-zinc-400 font-medium">
                      {user.email}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 ${
                          user?.plan === "PRO"
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                        } text-[10px] font-bold uppercase rounded`}
                      >
                        {user.plan}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-xs text-zinc-400 font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.isBlocked ? (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "unblock")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10"
                        >
                          <Unlock className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "block")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}

                      {user.isDeleted ? (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "restore")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <ArchiveRestore className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "delete")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* --- MOBILE/TABLET VIEW (Hidden on LG) --- */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {users?.data?.map((user) => (
            <div
              key={user.id}
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {user.image ? (
                      <Image
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                        src={user.image}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm text-zinc-400 font-medium">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${getStatusColor(`isBlocked : ${user.isBlocked}, isDeleted : ${user.isDeleted}`)} border-2 border-zinc-900 rounded-full`}
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-zinc-100">
                      {user.name}
                    </p>
                  </div>
                </div>

                {/* Actions are always visible on mobile for better UX */}
                <div className="flex items-center gap-1">
                  {user.isBlocked ? (
                    <Button
                      onClick={() => handleUserStatusChange(user.id, "unblock")}
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-purple-400"
                    >
                      <Unlock className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUserStatusChange(user.id, "block")}
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-red-400"
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      handleUserStatusChange(
                        user.id,
                        user.isDeleted ? "restore" : "delete",
                      )
                    }
                    variant="ghost"
                    size="sm"
                    className="text-zinc-500"
                  >
                    {user.isDeleted ? (
                      <ArchiveRestore className="w-4 h-4" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-800/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Email
                  </span>
                  <span className="text-sm text-zinc-300">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Tier & Role
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 ${user?.plan === "PRO" ? "bg-purple-500/10 text-purple-300" : "bg-zinc-500/10 text-zinc-400"} text-[10px] font-bold uppercase rounded border border-white/5`}
                    >
                      {user.plan}
                    </span>
                    <span className="text-xs text-zinc-500">{user.role}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Enrolled
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Controls */}
      {users && users?.meta && (
        <Suspense>
          <Pagination
            limit={3}
            itemsName="users"
            currentPage={currentPage}
            meta={users?.meta}
          />
        </Suspense>
      )}
    </div>
  );
}
