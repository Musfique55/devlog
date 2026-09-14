import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "For solo developers getting started.",
    price: "$0",
    period: "/mo",
    features: [
      "Solo standup logging",
      "Streak tracking",
      "30 days log history",
      "Up to 2 project tags",
      "Join team workspaces",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For teams who want full collaboration.",
    price: "$20",
    period: "/mo",
    features: [
      "Everything in Free",
      "Create unlimited workspaces",
      "Invite team members",
      "Blocker alerts via email",
      "Weekly team reports",
      "Unlimited log history",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section
      className="py-24 bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      id="pricing"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-20 sm:mb-32 text-center items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">PRICING</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Plans for every team
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl">
            Choose the plan that fits your needs. No hidden fees, cancel
            anytime. Start free, upgrade when you scale.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border rounded-2xl transition-all duration-300 overflow-hidden group ${
                plan.highlighted
                  ? "border-primary/50 md:col-span-1 md:row-span-2 flex flex-col"
                  : "border-border/50"
              }`}
            >
              {/* Glow effect for highlighted card */}
              {plan.highlighted && (
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Card background */}
              <div
                className={`flex flex-col gap-8 p-8 h-full relative z-10 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 border-primary/40"
                    : "bg-gradient-to-br from-secondary/50 to-transparent backdrop-blur-sm hover:from-secondary/70"
                }`}
              >
                {/* Badge */}
                {plan.highlighted && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </Badge>
                    <span className="text-xs text-primary font-semibold">
                      Save 20% on annual
                    </span>
                  </div>
                )}

                {/* Plan info */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl sm:text-6xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-base text-muted-foreground font-light">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Billed monthly
                  </p>
                </div>

                {/* CTA Button */}
                <Link href={"/pricing"} className="block">
                  <Button
                    className={`w-full cursor-pointer rounded-xl font-semibold text-base h-12 transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25"
                        : "bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary/100 hover:border-border"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features list */}
                <div className="space-y-4 flex-1 pt-4 border-t border-border/20">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 font-bold" />
                      <span className="text-sm text-foreground font-light leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 sm:mt-24">
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                ✓
              </div>
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                ✓
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
