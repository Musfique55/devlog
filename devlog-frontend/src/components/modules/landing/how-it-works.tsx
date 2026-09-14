
import { Zap, Sparkles, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Zap,
    title: 'Log Your Standup',
    description: 'Answer 3 simple questions daily — what you did, what you will do, and any blockers. Takes under 2 minutes.',
    number: '01',
  },
  {
    icon: Sparkles,
    title: 'Track Your Streak',
    description: 'Build consistency with streak tracking. See your progress on the activity calendar and celebrate milestones.',
    number: '02',
  },
  {
    icon: Rocket,
    title: 'Collaborate & Report',
    description: 'Invite teammates, get blocker alerts, and receive automatic weekly digests summarizing team activity.',
    number: '03',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/3 to-background relative overflow-hidden">
      {/* Accent gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-20 sm:mb-32 text-center items-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
            The path to perfect standups
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
            A streamlined process that feels natural and fits seamlessly into your team&apos;s workflow.
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Connecting line - only on desktop */}
          <div className="hidden md:block absolute top-20 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col">
                {/* Step number and icon */}
                <div className="flex flex-col items-center md:items-start gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Number badge */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30 z-10">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Icon in circle */}
                    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 hidden md:flex">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Arrow between steps - mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden">
                      <ArrowRight className="w-6 h-6 text-primary/40 rotate-90" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-foreground leading-tight">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
