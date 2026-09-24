

import {
  Terminal,
  Flame,
  Users,
  AlertTriangle,
  BarChart3,
  Lock,
} from "lucide-react";


function LogPreview() {
  return (
    <div className="space-y-2">
      {["Yesterday", "Today", "Blockers"].map((l) => (
        <div key={l} className="flex items-center gap-3">
          <span className="w-16 text-xs text-[#B4B4C0]">{l}</span>
          <span className="h-2 flex-1 rounded-full bg-[#2A2A3A]" />
        </div>
      ))}
    </div>
  );
}

function StreakPreview() {
  const days = [1, 1, 1, 1, 1, 1, 0];
  return (
    <div>
      <div className="flex gap-1.5">
        {days.map((d, i) => (
          <span
            key={i}
            className={`h-6 flex-1 rounded-md ${
              d ? "bg-[#A855F7]" : "border border-[#2A2A3A] bg-[#1C1C28]"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-[#F5F5F7]">🔥 12 day streak</p>
    </div>
  );
}

function TeamPreview() {
  const av = ["bg-[#6D4AA8]", "bg-[#3B4A8C]", "bg-[#7A3B5C]", "bg-[#2F6B5E]"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {av.map((c, i) => (
          <span
            key={i}
            className={`h-8 w-8 rounded-full border-2 border-[#14141C] ${c} ${
              i > 0 ? "-ml-2" : ""
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-[#B4B4C0]">4 updates today</span>
    </div>
  );
}

function BlockerPreview() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#7F2A33] bg-[#2A1216] p-3">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F87171]" />
      <div>
        <p className="text-sm font-medium text-[#F87171]">Blocker reported</p>
        <p className="text-xs text-[#B4B4C0]">Alex: waiting on design review</p>
      </div>
    </div>
  );
}

function ReportPreview() {
  const bars = [40, 65, 50, 80, 60, 90];
  return (
    <div className="flex h-16 items-end gap-2">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 rounded-t-md bg-linear-to-t from-[#6D28D9] to-[#A855F7]"
        />
      ))}
    </div>
  );
}

function RolePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-[#A855F7] px-3 py-1 text-xs font-medium text-white">
        Super admin
      </span>
      <span className="rounded-full border border-[#3A3A50] px-3 py-1 text-xs text-[#F5F5F7]">
        Admin
      </span>
      <span className="rounded-full border border-[#2A2A3A] px-3 py-1 text-xs text-[#B4B4C0]">
        Member
      </span>
    </div>
  );
}


const features = [
  {
    icon: Terminal,
    title: "Daily Standup Logging",
    text: "Answer 3 simple questions in under 2 minutes: what you did, what you'll do, and any blockers.",
    preview: <LogPreview />,
  },
  {
    icon: Flame,
    title: "Streak Tracking",
    text: "Build the habit with daily streaks. Track your longest run and never miss a day.",
    preview: <StreakPreview />,
  },
  {
    icon: Users,
    title: "Team Workspaces",
    text: "Invite teammates and see everyone's standup in one shared feed.",
    preview: <TeamPreview />,
  },
  {
    icon: AlertTriangle,
    title: "Blocker Alerts",
    text: "Admins get an instant email when someone is blocked, so help arrives fast.",
    preview: <BlockerPreview />,
  },
  {
    icon: BarChart3,
    title: "Weekly Reports",
    text: "An automatic digest every Sunday summarizing activity, blockers and progress.",
    preview: <ReportPreview />,
  },
  {
    icon: Lock,
    title: "Role Based Access",
    text: "Super admin, admin and member roles with fine-grained permissions.",
    preview: <RolePreview />,
  },
];


export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#0A0A0F] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A855F7]">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#F5F5F7] sm:text-5xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text, preview }) => (
            <div
              key={title}
              className="group flex flex-col rounded-2xl border border-[#2A2A3A] bg-[#14141C] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A855F7]/60 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]"
            >
              {/* Preview area */}
              <div className="mb-6 rounded-xl border border-[#2A2A3A] bg-[#0F0F16] p-4">
                {preview}
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#2A2450] text-[#D8B4FE]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="text-lg font-semibold text-[#F5F5F7]">
                  {title}
                </h3>
              </div>

              <p className="text-[1rem] leading-relaxed text-[#B4B4C0] sm:text-[1.05rem]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

