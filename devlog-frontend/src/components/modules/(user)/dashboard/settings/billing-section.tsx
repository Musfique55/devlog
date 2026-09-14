"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Download, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { cancelSubscription } from "@/services/payment.services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Invoice {
  id: string;
  amount: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  invoiceUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function BillingSection({
  invoicePromise,
}: {
  invoicePromise: Promise<{ data: Invoice[] | null } | undefined>;
}) {
  const invoices = use(invoicePromise);
  const { data: user } = useAuth();
  const queryClient = useQueryClient();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      const res = await cancelSubscription();
      if (res?.success) {
        toast.success("Subscription cancelled successfully!");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setShowCancelModal(false);
      } else {
        toast.error(res?.message || "Failed to cancel subscription.");
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <section className="relative" id="billing">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Plan & Billing</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Manage your subscription, payment methods, and view your transaction
            history.
          </p>
        </div>
        <div className="w-full md:w-2/3 space-y-6">
          {/* Plan Card */}
          <div className="bg-zinc-900/40 rounded-xl p-8 border border-l-4 border-l-primary border-zinc-800/50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30">
                    Current Plan
                  </span>
                  <h4 className="font-bold text-2xl text-zinc-100">
                    DevLog Pro
                  </h4>
                </div>
                <p className="text-sm text-zinc-400">
                  $20/month • Billed monthly
                </p>
              </div>
              {user?.plan === "FREE" ? (
                <Link href={"/pricing"}>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
                    Upgrade Plan
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="bg-zinc-950/40 rounded-lg p-4 flex items-center justify-between border border-zinc-800/30">
              <div className="flex items-center gap-3">
                <span className="text-primary">ℹ️</span>
                <span className="text-xs text-zinc-400">
                  Next billing cycle starts on{" "}
                  <span className="text-zinc-200 font-medium">
                    {user
                      ? new Date(user?.expiresAt)?.toLocaleDateString?.(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : ""}
                  </span>
                </span>
              </div>
              {user?.plan === "PRO" &&
              !user?.subscriptions?.[0]?.cancelAtPeriodEnd ? (
                <Button
                  onClick={() => setShowCancelModal(true)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/5 font-semibold transition-all duration-300"
                >
                  Cancel Subscription
                </Button>
              ) : user?.plan === "PRO" &&
                user?.subscriptions?.[0]?.cancelAtPeriodEnd ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/5 font-semibold transition-all duration-300"
                >
                  Cancelled
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-800/50">
            <div className="px-8 py-6 border-b border-zinc-800/30">
              <h4 className="font-bold text-sm text-zinc-100">
                Invoice History
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800/20">
                    <th className="px-8 py-4 font-medium">Date</th>
                    <th className="px-8 py-4 font-medium">Amount</th>
                    <th className="px-8 py-4 font-medium">Status</th>
                    <th className="px-8 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/20">
                  {invoices?.data?.length &&
                    invoices.data.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="px-8 py-4 text-zinc-300">
                          {new Date(invoice.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-8 py-4 font-medium text-zinc-100">
                          {invoice.amount}
                        </td>
                        <td className="px-8 py-4">
                          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {invoice.status === "SUCCESS" ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <Link
                            target="_blank"
                            href={invoice.invoiceUrl}
                            className="flex justify-center"
                          >
                            <Download className="w-4 h-4 text-primary hover:text-primary/80" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- Cancel Subscription safety confirmation Dialog --- */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-red-500/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in scale-in duration-300">
            <div className="px-6 py-5 border-b border-zinc-850 flex justify-between items-center">
              <h4 className="font-bold text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Cancel Subscription?
              </h4>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Are you sure you want to cancel your{" "}
                <span className="text-zinc-200 font-bold">DevLog Pro</span>{" "}
                subscription?
              </p>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 space-y-2 text-xs text-zinc-500">
                <p>
                  • You will lose access to premium pipelines and workspaces.
                </p>
                <p>
                  • Your shared developer workspace will downgrade to the
                  1-member tier.
                </p>
                <p>
                  • Historical invoices and statements remain downloadable at
                  any time.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-800/80 mt-6">
                <Button
                  onClick={() => setShowCancelModal(false)}
                  variant="ghost"
                  className="flex-1 text-zinc-400 hover:text-zinc-200 text-sm py-5 rounded-xl border border-transparent hover:border-zinc-800"
                >
                  Keep Pro
                </Button>
                <Button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    "Confirm Cancel"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
