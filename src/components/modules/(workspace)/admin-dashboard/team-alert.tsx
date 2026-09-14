import { Log } from "@/services/standupLogs.services";
interface TeamAlertsProps {
  alerts: Log[];
}

export function TeamAlerts({ alerts }: TeamAlertsProps) {
  const getHours = (date : Date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const diff = now.getTime() - givenDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-xl">
      <h3 className="text-lg font-bold tracking-tight text-on-background mb-6">
        Recent Team Alerts
      </h3>

      <div className="space-y-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-4">
            {/* <div
              className={`mt-1 w-2 h-2 rounded-full shrink-0 ${alert.severity === "critical" || alert.severity === "warning" ? "animate-pulse" : ""} ${alertColor[alert.severity]}`}
            ></div> */}
            <div>
              <p className="text-sm font-semibold text-on-background leading-tight">
                {alert.user.name} is blocked
              </p>
              <p className="text-xs text-zinc-500 mt-1">{alert.blocker}</p>
              <p className="text-[0.6875rem] text-zinc-600 mt-2 font-mono">
                {getHours(alert.createdAt)}h
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
