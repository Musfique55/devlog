const entries = [
  { label: "Yesterday", text: "Finished login API" },
  { label: "Today", text: "Build dashboard UI" },
  { label: "Blockers", text: "Waiting on design review" },
];

const teamAvatars = [
  { letter: "S", bg: "bg-[#6D4AA8]" },
  { letter: "J", bg: "bg-[#3B4A8C]" },
  { letter: "M", bg: "bg-[#7A3B5C]" },
];

export default function StandupCardLayout() {
  return (
    <div className="relative w-full max-w-110 scale-[1.12] p-6">
      {/* Soft purple haze behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[20%] -inset-y-[10%] z-0 blur-[30px] bg-[radial-gradient(closest-side,rgba(168,85,247,0.32),transparent)]"
      />

      <div className="relative z-10 rounded-2xl border border-[#2A2A3A] bg-[#14141C] p-5 text-[#F5F5F7] shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:p-7">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2A2450] font-semibold text-purple-300">
            A
          </div>
          <span className="text-[17px] font-semibold">Alex Rivera</span>
          <span className="ml-auto text-sm text-[#B4B4C0]">Sep 24</span>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((e) => (
            <div key={e.label}>
              <div className="mb-0.5 text-[13px] font-semibold text-[#B4B4C0]">
                {e.label}
              </div>
              <div className="text-base leading-snug sm:text-[17px]">
                {e.text}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="my-5 flex flex-wrap gap-2">
          <span className="whitespace-nowrap rounded-full border border-[#7F2A33] bg-[#2A1216] px-3 py-1 text-sm text-[#F87171]">
            Blocker
          </span>
          <span className="whitespace-nowrap rounded-full bg-[#A855F7] px-3 py-1 text-sm font-medium text-white">
            🔥 12 day streak
          </span>
        </div>

        {/* Team feed */}
        <div className="flex items-center gap-2.5 text-sm text-[#B4B4C0]">
          <div className="flex">
            {teamAvatars.map((a, i) => (
              <span
                key={a.letter}
                className={`grid h-7 w-7 place-items-center rounded-full border-2 border-[#14141C] text-xs font-semibold text-[#F5F5F7] ${a.bg} ${
                  i > 0 ? "-ml-2" : ""
                }`}
              >
                {a.letter}
              </span>
            ))}
          </div>
          Team feed
        </div>
      </div>
    </div>
  );
}
