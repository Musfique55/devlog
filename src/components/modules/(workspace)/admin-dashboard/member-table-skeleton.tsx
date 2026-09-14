import { Skeleton } from "@/components/ui/skeleton";

export function MemberTableSkeleton() {
  return (
    <tbody className="divide-y divide-outline-variant/10">
      {Array.from({ length: 8 }).map((_, index) => (
        <tr
          key={index}
          className="hover:bg-surface-container-high transition-colors"
        >
          {/* Name & Email */}
          <td className="px-8 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </td>

          {/* Role */}
          <td className="px-8 py-5">
            <Skeleton className="h-6 w-20 rounded" />
          </td>

          {/* Last Log */}
          <td className="px-8 py-5">
            <Skeleton className="h-4 w-32" />
          </td>

          {/* Actions */}
          <td className="px-8 py-5 text-right">
            <Skeleton className="h-8 w-8 rounded ml-auto" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
