"use client"

import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PaymentSuccessProps {
  orderId: string;
  amount: number;
}

export function PaymentSuccess({
  payment
}: {payment: PaymentSuccessProps}) {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12">
      {/* Success Icon */}
      <div className="mb-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Payment Successful! 
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Thank you for upgrading. Your subscription is now active.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-surface-container rounded-lg p-6 space-y-4 border border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="text-sm font-semibold text-foreground">Pro</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount Paid</span>
            <span className="text-sm font-semibold text-foreground">${payment?.amount}</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Order ID</span>
            <span className="text-xs sm:text-sm font-mono text-foreground">{payment?.orderId}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            A confirmation email has been sent to your inbox. You can now access all premium features.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold"
          >
            <Link href="/dashboard">
              Back to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          {/* <Button
            variant="outline"
            className="flex-1 border-border hover:bg-surface-container"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button> */}
        </div>
      </div>
    </div>
  );
}
