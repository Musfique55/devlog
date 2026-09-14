import { RevenueChart } from "@/components/modules/(super-admin)/dashboard/revenue-chart";
import { SuperAdminStatsGrid } from "@/components/modules/(super-admin)/dashboard/stat-grid";
import { UserGrowthChart } from "@/components/modules/(super-admin)/dashboard/user-growth-chart";
import { getProfitStats, getStats, getUserGrowthStats } from "@/services/admin.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["admin-dashboard"],

      queryFn: async () => {
        const res = await getStats();
        return res.data;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ["admin-yearly-profit"],
      queryFn: async () => {
        const res = await getProfitStats();
        return res.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["admin-user-growth"],
      queryFn: async () => {
        const res = await getUserGrowthStats();
        return res.data;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
  
        <SuperAdminStatsGrid />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1"> 
         <RevenueChart />
         <UserGrowthChart />
        </div>
 
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
