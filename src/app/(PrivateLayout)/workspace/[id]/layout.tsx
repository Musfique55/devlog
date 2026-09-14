import { Header } from "@/components/modules/(user)/dashboard/header";
import { WorkspaceSidebar } from "@/components/modules/(workspace)/ui/sidebar";
import { WorkspaceSocketHandler } from "@/components/modules/(workspace)/ui/workspace-socket-handler";
import { getWorkspace } from "@/services/workspace.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const WorkspaceLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspace(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col lg:flex-row">
        <WorkspaceSocketHandler id={id} />
        <WorkspaceSidebar />

        <div className="flex flex-col flex-1 lg:ml-64">
          <Header />
          <div className="mt-20">{children}</div>
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default WorkspaceLayout;
