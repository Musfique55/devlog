import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-20 overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-b from-primary/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-t from-primary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust indicators above headline */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Trusted by 5,000+ teams</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main content - asymmetrical layout */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.1] text-foreground text-balance">
                Your daily standup,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  finally organized
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                Stop chasing updates across Slack threads and endless meetings. DevLog centralizes your team&apos;s daily standups into one clean, organized workspace where visibility meets simplicity.
              </p>
            </div>

            {/* CTA with better hierarchy */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold text-base px-8 h-12 shadow-lg hover:shadow-xl hover:shadow-primary/25"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-2 border-border font-medium text-base px-8 h-12 hover:bg-secondary/50 transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Social proof stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
              <div>
                <p className="text-2xl font-bold text-foreground">5K+</p>
                <p className="text-sm text-muted-foreground font-light">Active Teams</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground font-light">Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground font-light">User Rating</p>
              </div>
            </div>
          </div>

          {/* Visual showcase - asymmetrical right side */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              
              {/* Main showcase card */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Mock dashboard elements */}
                  <div className="h-3 w-24 bg-primary/30 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-primary/20 rounded" />
                    <div className="h-2 w-5/6 bg-primary/15 rounded" />
                    <div className="h-2 w-4/5 bg-primary/10 rounded" />
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/30" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-20 bg-primary/25 rounded" />
                        <div className="h-2 w-16 bg-primary/15 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-20 bg-primary/25 rounded" />
                        <div className="h-2 w-16 bg-primary/15 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
