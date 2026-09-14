import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PaymentCancelProps {
  reason?: string;
}

export function PaymentCancel({ reason }: PaymentCancelProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12">
      {/* Cancel Icon */}
      <div className="mb-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-amber-500" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your payment was cancelled. Your subscription was not created.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-surface-container rounded-lg p-6 space-y-4 border border-border">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">What happened?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {reason ||
                'Your payment was cancelled before it could be processed. No charges have been made to your account.'}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            What you can do:
          </h3>
          <ul className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <li>• Try the payment again</li>
            <li>• Use a different payment method</li>
            <li>• Contact our support team for assistance</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold"
          >
            <Link href="/pricing">
              Try Again
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border hover:bg-surface-container"
          >
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Support CTA */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Need help?{' '}
            <Link href="/support" className="text-indigo-500 hover:text-indigo-600 font-semibold">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
