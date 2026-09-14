import { Skeleton } from '@/components/ui/skeleton';

export function WorkspaceSidebarSkeleton() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-low flex flex-col py-4 sm:py-6 px-3 sm:px-4 z-50 transition-all duration-200 border-r border-white/5">
      {/* Logo Skeleton */}
      <div className="mb-6 sm:mb-10 px-2">
        <Skeleton className="h-6 w-32 rounded" />
      </div>

      {/* Navigation Skeleton */}
      <nav className="flex-1 space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2"
          >
            <Skeleton className="w-4 sm:w-5 h-4 sm:h-5 rounded flex-shrink-0" />
            <Skeleton className="hidden sm:block h-4 flex-1 rounded max-w-xs" />
          </div>
        ))}
      </nav>

      {/* Bottom Button Skeleton */}
      <div className="mt-auto px-2">
        <Skeleton className="w-full h-10 sm:h-11 rounded-lg" />
      </div>
    </aside>
  );
}