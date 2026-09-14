import { SuperAdminHeader } from "@/components/modules/(super-admin)/ui/header";
import { SuperAdminSidebar } from "@/components/modules/(super-admin)/ui/sidebar";
import { getUserInfo } from "@/services/auth.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const SuperAdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUserInfo();
      return res.data;
    },
  });
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex">
        <div>
          <SuperAdminSidebar />
        </div>
        <div className="flex-1 lg:ml-64 overflow-x-hidden">
          <SuperAdminHeader />
          <div className="m-5">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default SuperAdminLayout;
