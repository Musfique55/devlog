import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#0A0A0F] px-6 py-20 sm:py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#2A2A3A] bg-[#14141C] px-6 py-12 text-center sm:px-12 sm:py-16">
        {/* Purple haze */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(168,85,247,0.35),transparent)] blur-2xl"
        />

        <div className="relative flex flex-col items-center gap-5">
          <h2 className="text-3xl font-bold text-[#F5F5F7] sm:text-5xl">
            Ready to organize your{" "}
            <span className="bg-linear-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              standups?
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-[#B4B4C0] sm:text-lg">
            Log in two minutes a day and keep your whole team in sync.
          </p>

          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-lg bg-[#A855F7] px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] transition hover:bg-[#9333EA]"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="text-sm text-[#B4B4C0]">
            Free forever for solo developers.
          </p>
        </div>
      </div>
    </section>
  );
}

