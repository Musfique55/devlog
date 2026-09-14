import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceDashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col p-8 mx-auto w-full space-y-12 bg-background">
      {/* Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-72 sm:w-96 rounded-lg" />
          <Skeleton className="h-5 w-56 sm:w-80 rounded" />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900/60 border border-zinc-800/50 p-6 rounded-xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        ))}
      </div>

      {/* Charts / Alerts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800/50 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          {/* Mock Heatmap Grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full rounded" />
            ))}
          </div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/50 p-6 rounded-xl space-y-6">
          <Skeleton className="h-5 w-36 rounded" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Table Skeleton */}
      <div className="bg-zinc-900/60 border border-zinc-800/50 p-6 rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
              </div>
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
