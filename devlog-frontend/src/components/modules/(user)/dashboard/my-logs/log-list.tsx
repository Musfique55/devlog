"use client";

import { Button } from "@/components/ui/button";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import { EditingLog, LogEntry, LogPromise } from "./my-logs-wrapper";
import { StandupData } from "../standup-form";
import { UseMutateAsyncFunction } from "@tanstack/react-query";




interface LogListProps {
    editingLogId: string | null;
    setEditingLogId: React.Dispatch<React.SetStateAction<string | null>>;
    editingLog: EditingLog | null;
    setEditingLog: React.Dispatch<React.SetStateAction<EditingLog | null>>;
    logsData: LogPromise<LogEntry> | undefined,
    deleteLogAsync: (id : string) => void,
    isPending: boolean,
    updateLogAsync: UseMutateAsyncFunction<{
    success: boolean;
    data: Partial<StandupData> | null;
    message: string;
} | undefined, Error, string, unknown>,
    isUpdating: boolean
}

const LogList = ({ editingLog, editingLogId, setEditingLog, setEditingLogId, logsData, deleteLogAsync, isPending, updateLogAsync, isUpdating}: LogListProps) => {
  

  return (
    <div>
      <div className="space-y-6">
        {logsData &&
          logsData.data &&
          logsData.data.map((log) => {
            const isEditing = editingLogId === log.id;
            return (
              <article
                key={log.id}
                className="bg-zinc-900/60 rounded-xl p-8 border border-l-4 border-l-primary border-zinc-800/50 hover:bg-zinc-900/80 transition-all group relative"
              >
                {/* Header with date and actions */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {log.projectTags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/20 text-primary/80 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">
                      {new Date(log.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-500 hover:text-zinc-200"
                          onClick={() => {
                            setEditingLogId(log.id);
                            setEditingLog({
                              id: log.id,
                              todayWork: log.todayWork,
                              tomorrowWork: log.tomorrowWork,
                              blocker: log.blocker || null,
                            });
                          }}
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() => deleteLogAsync(log.id)}
                          variant="ghost"
                          size="icon"
                          className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <LoaderCircle className="w-5 h-5 animate-spin text-zinc-500 transition-all" />
                          ) : (
                            <Trash className="w-5 h-5" />
                          )}
                        </Button>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingLogId(null);
                            setEditingLog(null);
                          }}
                          className="border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-foreground"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            updateLogAsync(log.id);
                            setEditingLogId(null);
                            setEditingLog(null);
                          }}
                          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold"
                        >
                          {isUpdating ? (
                            <LoaderCircle className="w-5 h-5 animate-spin text-white transition-all" />
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Today's Work & Tomorrow's Work Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-zinc-950/40 p-4 rounded-lg">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                      What did you do today?
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={editingLog?.todayWork || ""}
                        onChange={(e) =>
                          setEditingLog({
                            ...(editingLog as EditingLog),
                            todayWork: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full bg-zinc-950 border border-zinc-800 ring-1 ring-white/5 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary transition-all text-zinc-100 placeholder:text-zinc-600"
                      />
                    ) : (
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {log.todayWork}
                      </p>
                    )}
                  </div>
                  <div className="bg-zinc-950/40 p-4 rounded-lg">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                      What will you do tomorrow?
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={editingLog?.tomorrowWork || ""}
                        onChange={(e) =>
                          setEditingLog({
                            ...(editingLog as EditingLog),
                            tomorrowWork: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full bg-zinc-950 border border-zinc-800 ring-1 ring-white/5 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary transition-all text-zinc-100 placeholder:text-zinc-600"
                      />
                    ) : (
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {log.tomorrowWork}
                      </p>
                    )}
                  </div>
                </div>

                {/* Blockers */}
                {log.blocker && (
                  <div
                    className={
                      isEditing
                        ? "bg-zinc-950/40 p-4 rounded-lg"
                        : "bg-red-500/5 p-4 rounded-lg border border-red-500/20"
                    }
                  >
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isEditing ? "text-zinc-400" : "text-red-400"}`}
                    >
                      {!isEditing && (
                        <span className="w-4 h-4 rounded-full bg-red-500/30 flex items-center justify-center text-red-400 text-[10px]">
                          ⚠
                        </span>
                      )}
                      Any blockers?
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={editingLog?.blocker || ""}
                        onChange={(e) =>
                          setEditingLog({
                            ...(editingLog as EditingLog),
                            blocker: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-zinc-950 border border-zinc-800 ring-1 ring-white/5 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary transition-all text-zinc-100 placeholder:text-zinc-600"
                      />
                    ) : (
                      <p
                        className={`text-sm ${isEditing ? "text-zinc-300" : "text-red-300"}`}
                      >
                        {log.blocker}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
      </div>

      {logsData && logsData.data && logsData.data.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center opacity-60">
          <div className="w-24 h-24 mb-6 rounded-full bg-zinc-900/60 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-400">No logs found</h3>
          <p className="text-sm text-zinc-600 mt-1">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default LogList;
