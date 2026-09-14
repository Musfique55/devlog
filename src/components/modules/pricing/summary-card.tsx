'use client';

import { Sparkles, Check } from 'lucide-react';

export function SummaryCard() {
  return (
    <div className="w-full space-y-6 flex flex-col">
      {/* Main Summary Card */}
      <div className="rounded-2xl p-6 sm:p-8 border border-primary/20 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-primary" />
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">Order Summary</h2>
        </div>

        <div className="space-y-6">
          {/* Plan Section */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Selected Plan</p>
            <div className="flex justify-between items-center py-4 px-4 rounded-lg bg-secondary/50">
              <div>
                <p className="text-foreground font-semibold">DevLog Pro</p>
                <p className="text-xs text-muted-foreground">Monthly Subscription</p>
              </div>
              <p className="text-foreground font-bold text-lg">$20.00</p>
            </div>
          </div>

          {/* Active Seats */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Seats</p>
            <div className="flex justify-between items-center py-4 px-4 rounded-lg bg-secondary/50">
              <p className="text-foreground">Active Seats</p>
              <p className="text-foreground font-mono font-bold">01</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40" />

          {/* Total Due */}
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Amount Due</p>
            <div>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                $20.00
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Billed monthly. Plus applicable taxes based on your region.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="rounded-2xl p-6 sm:p-8 border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 border border-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground mb-1">AI-Powered Features Unlocked</p>
            <p className="text-sm text-muted-foreground font-light">
              Get access to advanced summaries, unlimited history, and custom bot integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="rounded-2xl p-6 sm:p-8 border border-border/50 bg-card/50 backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground font-light">Cancel anytime - no lock-in contracts</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground font-light">Secure SSL-encrypted payments</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground font-light">Tax compliant across regions</span>
        </div>
      </div>

      {/* Footer Links */}
      <p className="text-xs text-muted-foreground leading-relaxed text-center sm:text-left font-light">
        By completing your purchase, you agree to DevLog&apos;s{' '}
        <a href="#" className="text-primary hover:underline transition-colors font-medium">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline transition-colors font-medium">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
