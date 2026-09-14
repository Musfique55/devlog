"use client";

import { Button } from "@/components/ui/button";
import { sendEmailVerificationLink } from "@/lib/bauth/manualEmailVerification";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailNotice({
  email,
}: {
  email: string | undefined;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-16 text-center">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-indigo-500">Log</span>
        </h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-xl bg-zinc-900 border border-zinc-800 p-8 sm:p-10 shadow-xl">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Check your email
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We&apos;ve sent a verification link to{" "}
            {email && (
              <>
                {" "}
                to <span className="text-zinc-200 font-medium">{email}</span>
              </>
            )}
          </p>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Click the link in your email to verify your account and get started
            with DevLog.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-8">
          <p className="text-xs sm:text-sm text-zinc-300">
            Tip: The verification link will expire in 24 hours. If you
            don&apos;t see the email, check your spam folder.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          {email && (
            <Button
              onClick={() => sendEmailVerificationLink(email)}
              variant="outline"
              className="w-full cursor-pointer border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-11"
            >
              Resend Link
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-11"
            asChild
          >
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-zinc-900 text-zinc-500">Need help?</span>
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center">
          <Link
            href="/support"
            className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}
