import { Header } from "@/components/modules/(user)/dashboard/header";
import { Sidebar } from "@/components/modules/(user)/dashboard/sidebar";
import { getUserInfo } from "@/services/auth.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async() => {
      const res = await getUserInfo();
      return res.data;
    },
  });

  

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <Sidebar />
       <Header />
      {children}
      </HydrationBoundary>
    </section>
  );
}
