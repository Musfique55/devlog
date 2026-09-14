'use client';

import StripeCheckoutButton from '@/components/shared/stripe-checkout-button';
import { Check,  Zap, Lock, BarChart3,  OctagonMinus } from 'lucide-react';

interface Feature {
  title: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}


const features: Feature[] = [
  { title: "Everything in Free", icon: <Zap className="w-4 h-4" /> },
  { title: "Create unlimited workspaces", icon: <BarChart3 className="w-4 h-4" /> },
  { title: "Unlimited history" },
  { title: "Invite team members" },
  { title: "Weekly team reports" },
  { title: "Blocker alerts via email", fullWidth: true, icon: <OctagonMinus  className="w-4 h-4" /> },
];

export function PlanCard() {
  return (
    <div className="w-full space-y-6 flex flex-col">
      {/* Main Plan Card */}
      <div className="rounded-2xl overflow-hidden p-6 sm:p-8 relative border border-primary/40 bg-gradient-to-br from-primary/15 via-primary/8 to-primary/3">
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

        {/* Header Section */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">DevLog Pro</h3>
          <p className="text-sm text-muted-foreground font-light">Everything your team needs to scale</p>
        </div>

        {/* Price Section */}
        <div className="mb-10 pb-10 border-b border-primary/20">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl sm:text-6xl font-bold text-foreground">$20</span>
            <span className="text-base text-muted-foreground font-light">/ month per user</span>
          </div>
          <p className="text-xs text-muted-foreground">Billed monthly. Cancel anytime.</p>
        </div>

        {/* Features Grid */}
        <div className="space-y-6 mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Included Features</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${feature.fullWidth ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/30">
                  {feature.icon ? (
                    <span className="text-primary/70 text-xs">{feature.icon}</span>
                  ) : (
                    <Check className="w-3 h-3 text-primary" />
                  )}
                </div>
                <span className="text-sm text-foreground font-light leading-relaxed">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <StripeCheckoutButton />

        {/* Security Info */}
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-secondary/50 border border-border/40">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Payment Security</p>
          <p className="text-xs text-muted-foreground font-light">Secure 256-bit SSL encrypted payment. Your data is fully protected.</p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl p-4 border border-border/50 bg-card/50 backdrop-blur-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">No Lock-In</p>
            <p className="text-xs text-muted-foreground font-light">Cancel anytime</p>
          </div>
        </div>
        <div className="rounded-xl p-4 border border-border/50 bg-card/50 backdrop-blur-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Tax Compliant</p>
            <p className="text-xs text-muted-foreground font-light">All regions covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
