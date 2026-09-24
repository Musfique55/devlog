import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import StandupCardLayout from "@/components/modules/landing/standup-card"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-20 overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-b from-primary/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-linear-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-linear-to-t from-primary/8 to-transparent rounded-full blur-3xl" />
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
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  finally organized
                </span>
              </h1>
              <p className="text-[1.05rem] sm:text-[1.18rem] text-[#B4B4C0] leading-relaxed max-w-2xl font-light">
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
                className="rounded-lg border border-white/20 bg-transparent font-medium text-base px-8 h-12 hover:bg-secondary/50 transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Social proof stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-foreground leading-none">5K+</p>
                <p className="mt-2 text-sm sm:text-[0.95rem] text-[#B4B4C0] font-light">Active Teams</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-foreground leading-none">99.9%</p>
                <p className="mt-2 text-sm sm:text-[0.95rem] text-[#B4B4C0] font-light">Uptime</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-foreground leading-none">4.9★</p>
                <p className="mt-2 text-sm sm:text-[0.95rem] text-[#B4B4C0] font-light">User Rating</p>
              </div>
            </div>
          </div>

          {/* Visual showcase - asymmetrical right side */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              {/* Main showcase card */}
              <StandupCardLayout />
          </div>
        </div>
      </div>
    </section>
  );
}
