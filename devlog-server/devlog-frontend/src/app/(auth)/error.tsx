// app/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => {
    // console.log(error);
  }, [error, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600">
        {error.message ? error.message : "Something went wrong!"}{" "}
      </h2>
      {error.message === "SESSION_EXPIRED" ? (
        <button
          onClick={() => router.push("/auth/login")}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
