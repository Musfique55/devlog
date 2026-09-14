
import { Terminal, Activity, Brain, Users, History, Lock, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Daily Standup Logging',
    description: 'Answer 3 simple questions every day — what you did, what you will do, and any blockers. Simple, fast, effective.',
    category: 'Core',
  },
  {
    icon: Activity,
    title: 'Streak Tracking',
    description: 'Build consistency with daily streaks. Track your longest streak and never miss a day. Stay accountable.',
    category: 'Engagement',
  },
  {
    icon: Users,
    title: 'Team Workspaces',
    description: 'Create workspaces, invite teammates, and see everyone\'s standup in one unified feed with full visibility.',
    category: 'Collaboration',
  },
  {
    icon: Brain,
    title: 'Blocker Alerts',
    description: 'Workspace admins get instant email alerts when a team member reports a blocker. React immediately.',
    category: 'Automation',
  },
  {
    icon: History,
    title: 'Weekly Reports',
    description: 'Automatic weekly digest every Sunday summarizing team activity, blockers, and progress metrics.',
    category: 'Insights',
  },
  {
    icon: Lock,
    title: 'Role Based Access',
    description: 'Super admin, workspace admin, and member roles with fine-grained permissions and security controls.',
    category: 'Security',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden" id="features">
      {/* Accent background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/3 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-20 sm:mb-32">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Features</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        {/* Alternating feature layout */}
        <div className="space-y-16 sm:space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Visual side */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-sm h-64">
                  {/* Background glow */}
                  <div className={`absolute -inset-6 bg-gradient-to-br ${index % 2 === 0 ? 'from-primary/15 to-primary/5' : 'from-primary/10 to-transparent'} rounded-2xl blur-2xl`} />
                  
                  {/* Card */}
                  <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent p-8 backdrop-blur-sm h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-primary mb-2">{feature.category}</p>
                      <p className="text-sm text-muted-foreground">Essential for modern teams</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-lg">
                    {feature.description}
                  </p>
                </div>
                
                {/* Learn more link */}
                <div className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 cursor-pointer w-fit group">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
