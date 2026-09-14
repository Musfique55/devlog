"use client";

import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLog,
  getMyLogs,
  updateLog,
} from "@/services/standupLogs.services";
import { toast } from "sonner";
import LogList from "./log-list";
import { MyLogsSkeleton } from "./logs-skeleton";

export interface LogPromise<T> {
  success: boolean;
  message: string;
  data: T[] | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LogEntry {
  id: string;
  todayWork: string;
  tomorrowWork: string;
  projectTags: string[];
  blocker: string | null;
  createdAt: string;
  userId: string;
  workspaceId: string | null;
}

export interface EditingLog {
  id: string;
  todayWork: string;
  tomorrowWork: string;
  blocker: string | null;
}

export default function MyLogsWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("newest");
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editingLog, setEditingLog] = useState<EditingLog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const queryClient = useQueryClient();

  const { data: logsData,isLoading } = useQuery<LogPromise<LogEntry>>({
    queryKey: ["logs", sortBy, debouncedSearchQuery, currentPage, limit],
    queryFn: async () => {
      const data = await getMyLogs({
        page: currentPage.toString(),
        limit: limit.toString(),
        searchTerm: debouncedSearchQuery,
        sortOrder: sortBy === "newest" ? "desc" : "asc",
      });
      return data;
    },
    placeholderData: (previousData) => previousData,
  });

  const { mutateAsync: deleteLogAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteLog(id);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["logs", sortBy, debouncedSearchQuery, currentPage, limit],
      });
      toast.success(data.message);
      return data;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutateAsync: updateLogAsync, isPending: isUpdating } = useMutation({
    mutationFn: async (id: string) => {
      const data = await updateLog(id, editingLog as EditingLog);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["logs", sortBy, debouncedSearchQuery, currentPage, limit],
      });
      toast.success(data.message);
      return data;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleDelete = async (id: string) => {
    try {
      toast.message("Are you sure?", {
        action: {
          label: "Yes",
          onClick: async () => {
            await deleteLogAsync(id);
          },actionButtonStyle : {
            backgroundColor : "red",
            color : "white",
            width : "100%"
          }
        },
        cancel: {
          label: "No",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      toast.error(error.message);
    }
  };

  const handlePagination = (operation: string) => {
    if (logsData && logsData?.meta && logsData?.meta.totalPages > 1) {
      if (operation === "next") {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };


  if(isLoading){
    return <MyLogsSkeleton />
  }

  return (
    <main className="lg:ml-64 pt-24 pb-12 px-12 min-h-screen bg-background">
      {/* Header & Breadcrumbs */}
      
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">
          <span>Workspace</span>
          <span className="text-xs">›</span>
          <span className="text-primary">Personal Logs</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-foreground">
          Daily Log Activity
        </h1>
      </div>

      {/* Filter Bar */}
      <section className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-75 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            type="text"
            placeholder="Filter by log work or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900/60 border-zinc-800 text-foreground"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-foreground"
          >
            This Month
          </Button>
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-foreground"
          >
            Newest First
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-primary"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Logs List */}
      {logsData && logsData.data && (
        <LogList
          editingLog={editingLog}
          editingLogId={editingLogId}
          setEditingLog={setEditingLog}
          setEditingLogId={setEditingLogId}
          logsData={logsData}
          deleteLogAsync={handleDelete}
          isPending={isPending}
          updateLogAsync={updateLogAsync}
          isUpdating={isUpdating}
        />
      )}

      {/* Pagination */}
      <footer className="mt-12 flex items-center justify-between">
        <div className="text-xs text-zinc-500">
          Showing{" "}
          <span className="text-foreground font-bold">
            1-{logsData?.data?.length || 0}
          </span>{" "}
          of{" "}
          <span className="text-foreground font-bold">
            {logsData?.meta?.total || 0}
          </span>{" "}
          logs
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handlePagination("prev")}
            variant="ghost"
            size="icon"
            className="bg-zinc-900/60 border border-zinc-800 text-zinc-500 hover:text-zinc-100 cursor-pointer disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-1 px-4">
            {logsData && logsData.meta && logsData.meta.totalPages > 1 ? (
              [...Array(logsData.meta.totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-8 h-8 bg-primary text-white cursor-pointer text-xs font-bold ${currentPage === index + 1 ? "bg-primary/20" : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))
            ) : (
              <Button
                variant="ghost"
                className="w-8 h-8 bg-primary text-white cursor-pointer text-xs font-bold"
              >
                1
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-zinc-900/60 border border-zinc-800 text-zinc-500 hover:text-zinc-100 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => handlePagination("next")}
            disabled={currentPage === logsData?.meta?.totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </main>
  );
}
