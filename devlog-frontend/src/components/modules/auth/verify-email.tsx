"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/bauth/authClient";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.services";


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

export default function VerifyEmail({ token }: { token: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: ["verify-email"],
    queryFn: async () => {
      const res = await authClient.verifyEmail({
        query: { token },
      });

      if (!res.data?.status) {
        throw new Error(res.error?.message);
      }

      await logout();
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push("/auth/login");
      return res.data;
    },
    retry: false,
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-indigo-500">Log</span>
        </h1>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 rounded-xl">
        <div className="p-8 space-y-6">
          {/* Verifying State */}
          {isLoading && (
            <>
              <div className="flex justify-center">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Verifying your email...
                </h2>
                <p className="text-sm text-zinc-400">
                  Please wait while we confirm your email address.
                </p>
              </div>
            </>
          )}

          {/* Success State */}
          {isSuccess && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Email Verified!
                </h2>
                <p className="text-sm text-zinc-400">
                  Your email has been successfully verified. Redirecting to
                  dashboard...
                </p>
              </div>
              <BouncingDots />
            </>
          )}

          {/* Error State */}
          {isError && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  Verification Failed
                </h2>
                <p className="text-sm text-zinc-400">
                  Your verification link has expired or is invalid. Please
                  request a new verification email.
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-800 text-white hover:bg-zinc-800"
                  >
                    Back to Login
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
