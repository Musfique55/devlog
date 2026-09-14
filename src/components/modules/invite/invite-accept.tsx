"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyTeamLink } from "@/services/workspace.services";

const BouncingDots = () => {
  return (
    <div className="flex justify-center items-center gap-1 py-4">
      <div
        className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

export default function InviteAccept({ token }: { token: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["accept-invite", token],
    queryFn: async () => {
      try {
        const res = await verifyTeamLink(`?token=${token}`);
        if (!res.success) {
          throw new Error(res.message || "Failed to accept invitation");
        }

        // Invalidate queries so that the new workspace is listed in the app
        await queryClient.invalidateQueries({
          queryKey: ["user-workspaces"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["workspace-members"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["user"],
        });

        router.push("/dashboard/team");

        return res;
      } catch (err: any) {
        throw new Error(err.message || "Failed to accept invitation");
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-indigo-500">Log</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Developer Workspace Invitation
        </p>
      </div>

      {/* Card Wrapper */}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 rounded-xl shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="p-8 space-y-6 relative z-10">
          {/* Loading state */}
          {isLoading && (
            <>
              <div className="flex justify-center">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Joining workspace...
                </h2>
                <p className="text-sm text-zinc-400">
                  Please wait while we confirm your invitation.
                </p>
              </div>
            </>
          )}

          {/* Success state */}
          {isSuccess && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Invitation Accepted!
                </h2>
                <p className="text-sm text-zinc-400">
                  You have successfully joined the team. Redirecting to
                  workspaces...
                </p>
              </div>
              <BouncingDots />
            </>
          )}

          {/* Error state */}
          {isError && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Failed to Join Workspace
                </h2>
                <p className="text-sm text-zinc-400">
                  {error instanceof Error
                    ? error.message
                    : "The invitation link is invalid or has expired."}
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-800 text-white hover:bg-zinc-800 cursor-pointer"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
