import AdminDashboardWrapper from "@/components/modules/(workspace)/admin-dashboard/dashboard-wrapper";
import { getWorkspaceLogs } from "@/services/standupLogs.services";
import { getWorkspaceStats } from "@/services/workspace.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function WorkspaceAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["workspace-stats", id],
      queryFn: () => getWorkspaceStats(id),
    }),

    queryClient.prefetchQuery({
      queryKey: ["workspace-logs", id],
      queryFn: () => getWorkspaceLogs(id),
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardWrapper id={id} />
    </HydrationBoundary>
  );
}
