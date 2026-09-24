

import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    desc: "For solo developers getting started.",
    price: "$0",
    cta: "Get Started Free",
    href: "/signup", // change to your real signup route
    highlight: false,
    features: [
      "Solo standup logging",
      "Streak tracking",
      "30 days log history",
      "Up to 2 project tags",
      "Join team workspaces",
    ],
  },
  {
    name: "Pro",
    desc: "For teams who want full collaboration.",
    price: "$20",
    cta: "Upgrade to Pro",
    href: "/signup?plan=pro", // change to your real route
    highlight: true,
    features: [
      "Everything in Free",
      "Create unlimited workspaces",
      "Invite team members",
      "Blocker alerts via email",
      "Weekly team reports",
      "Unlimited log history",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0A0A0F] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A855F7]">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#F5F5F7] sm:text-5xl">
            Plans for every team
          </h2>
          <p className="mt-4 text-[#B4B4C0]">
            Start free, upgrade when you scale.
          </p>
        </div>

        {/* Cards: both start at the same top line and stretch to equal height */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-7 ${
                p.highlight
                  ? "border-2 border-[#A855F7] bg-[#171122] shadow-[0_0_60px_rgba(168,85,247,0.25)]"
                  : "border border-[#2A2A3A] bg-[#14141C]"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-[#A855F7] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-[#F5F5F7]">{p.name}</h3>
              <p className="mt-1 text-sm text-[#B4B4C0]">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[#F5F5F7]">
                  {p.price}
                </span>
                <span className="text-[#B4B4C0]">/mo</span>
              </div>

              <Link
                href={p.href}
                className={`mt-6 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-[#A855F7] text-white hover:bg-[#9333EA]"
                    : "border border-white/20 text-[#F5F5F7] hover:bg-white/5"
                }`}
              >
                {p.cta}
              </Link>

              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[15px] text-[#F5F5F7]"
                  >
                    <Check
                      className={`h-4 w-4 shrink-0 ${
                        p.highlight ? "text-[#A855F7]" : "text-[#B4B4C0]"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#B4B4C0]">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </section>
  );
}

