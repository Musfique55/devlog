import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InviteAccept from "@/components/modules/invite/invite-accept";

export default async function InviteAcceptPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // If the user does not have active auth tokens, redirect them to login
  if (!accessToken && !refreshToken) {
    const dest = `/invite/accept?token=${token}`;
    redirect(`/auth/login?redirect=${encodeURIComponent(dest)}`);
  }

  return <InviteAccept token={token} />;
}
