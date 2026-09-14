interface StandupLog {
  todayWork: string;
  tomorrowWork: string;
  blocker: string | null;
  projectTag: string | null;
  userId: string;
  workspaceId: string | null;
  createdAt: string;
}

interface ActivityItemProps {
  standupLog: StandupLog;
  borderColor?: string;
}

export function ActivityItem({
  standupLog,
  borderColor = "border-l-primary",
}: ActivityItemProps) {
  return (
    <div
      className={`bg-zinc-900/60 hover:bg-zinc-900/80 transition-all p-6 rounded-xl border-l-4 ${borderColor} border border-zinc-800/50`}
    >
      {/* Timestamp */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-medium text-zinc-500">
          {new Date(standupLog.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Standup Content */}
      <div className="space-y-4">
        {/* What did you do today */}

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
            What did you do today?
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {standupLog.todayWork}
          </p>
        </div>

        {/* What will you do tomorrow */}

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
            What will you do tomorrow?
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {standupLog.tomorrowWork}
          </p>
        </div>

        {/* Any blockers */}
        {standupLog.blocker && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
              Any blockers?
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {standupLog.blocker}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
