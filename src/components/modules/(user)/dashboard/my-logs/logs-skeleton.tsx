'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function MyLogsSkeleton() {
  return (
    <main className="lg:ml-64 pt-24 pb-12 px-12 min-h-screen bg-background">
      {/* Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">
          <Skeleton className="h-4 w-20" />
          <span className="text-xs">›</span>
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-80 mb-2" />
      </div>

      {/* Filter Bar */}
      <section className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-10" />
        </div>
      </section>

      {/* Logs List Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="bg-zinc-900/60 rounded-xl p-8 border border-l-4 border-l-primary border-zinc-800/50"
          >
            {/* Header with date and actions */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {Array.from({ length: 2 }).map((_, tagIndex) => (
                    <Skeleton key={tagIndex} className="h-6 w-24 rounded" />
                  ))}
                </div>
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>

            {/* Today's Work & Tomorrow's Work Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-zinc-950/40 p-4 rounded-lg">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="bg-zinc-950/40 p-4 rounded-lg">
                <Skeleton className="h-4 w-40 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>

            {/* Blockers */}
            <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/20">
              <Skeleton className="h-4 w-32 mb-3" />
              <Skeleton className="h-16 w-full" />
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <footer className="mt-12 flex items-center justify-between">
        <Skeleton className="h-4 w-56" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex items-center gap-1 px-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </footer>
    </main>
  );
}
