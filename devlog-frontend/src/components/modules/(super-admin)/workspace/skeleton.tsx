import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceTableSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-x-hidden shadow-2xl">
      <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center">
        <div className="flex gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-700/50">
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-24" />
            </th>
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-16" />
            </th>
            <th className="px-8 py-4 text-center">
              <Skeleton className="h-3 w-12 mx-auto" />
            </th>
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-20 ml-auto" />
            </th>
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-20" />
            </th>
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-16" />
            </th>
            <th className="px-8 py-4">
              <Skeleton className="h-3 w-12 ml-auto" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700/30">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="hover:bg-zinc-600/30 transition-colors">
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </td>
              <td className="px-8 py-5 text-center">
                <Skeleton className="h-6 w-12 mx-auto" />
              </td>
              <td className="px-8 py-5">
                <Skeleton className="h-4 w-16 ml-auto" />
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-3.5 h-3.5 rounded" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </td>
              <td className="px-8 py-5">
                <Skeleton className="h-6 w-20" />
              </td>
              <td className="px-8 py-5">
                <Skeleton className="h-4 w-4 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
