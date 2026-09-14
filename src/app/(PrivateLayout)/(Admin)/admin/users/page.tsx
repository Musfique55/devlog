import { UsersTable } from "@/components/modules/(super-admin)/users/user-table";
import { getUsers } from "@/services/admin.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const queryClient = new QueryClient();
  const { page } = await searchParams;
  const { filter } = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ["admin-users", page, filter],
    queryFn: async () => {
      const data = await getUsers({
        page: page || "1",
        limit: "3",
        ...(filter === "active" && { isDeleted: "false" }),
        ...(filter === "banned" && { isDeleted: "true" }),
        ...(filter === "inactive" && { isBlocked: "true" }),
      });
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable currentFilter={filter} currentPage={parseInt(page) || 1} />
    </HydrationBoundary>
  );
};

export default UserManagementPage;
