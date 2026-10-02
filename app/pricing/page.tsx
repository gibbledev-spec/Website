import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DownloadCta } from "@/components/sections";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore every Gibble feature, completely free until 31 Dec 2026. Pro and Studio plans are coming soon.",
};

const earlyAccessFeatures = [
  "Add multi students",
  "Track student progress",
  "Conduct online classes",
  "Create music library with our resources",
  "In built assistive intelligence (coming soon)",
  "Unlimited students",
];

// Prices are still to be decided, so these plans show "₹XXX" until launch.
const upcoming = [
  {
    name: "Pro",
    blurb: "Powerful tools to help you manage and grow your music teaching.",
    icon: "🎼",
  },
  {
    name: "Studio",
    blurb: "Advanced tools built for professional music teachers and academies.",
    icon: "🎶",
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans. Start free.">
        Get full access to Gibble during Early Access. More plans are on the way.
      </PageHero>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {/* Early Access: the only plan available today */}
          <article className="relative flex flex-col rounded-[2rem] bg-white p-8 shadow-[0_6px_0_0_var(--color-ink)] ring-2 ring-ink">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-sm font-bold text-mint-ink">
                <span className="h-2 w-2 rounded-full bg-mint-ink" /> Active Now
              </span>
              <span className="text-4xl" aria-hidden>🎵</span>
            </div>
            <h2 className="mt-6 text-3xl font-black">Early Access</h2>
            <p className="mt-2 text-ink-soft">Explore every Gibble feature, completely free until 31 Dec 2026.</p>
            <p className="mt-6 font-display text-5xl font-black">Free</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand">
              <CalendarIcon /> Valid until 31 Dec 2026
            </p>
            <hr className="my-6 border-line" />
            <p className="font-bold">Everything you need, in one place</p>
            <ul className="mt-4 space-y-3">
              {earlyAccessFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-xs font-black text-mint-ink">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/#download" className="mt-8 self-start">
              Get Started - It&apos;s Free →
            </Button>
          </article>

          {/* Plans that are not available yet */}
          {upcoming.map((p) => (
            <article key={p.name} className="flex flex-col rounded-[2rem] bg-white/60 p-8 ring-1 ring-line">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1 text-sm font-bold text-ink-soft">
                  <LockIcon /> Coming Soon
                </span>
                <span className="text-4xl opacity-40 grayscale" aria-hidden>{p.icon}</span>
              </div>
              <h2 className="mt-6 text-3xl font-black text-ink-soft">{p.name}</h2>
              <p className="mt-2 text-ink-soft">{p.blurb}</p>
              <p className="mt-6 text-ink-soft/70">
                <span className="font-display text-5xl font-black">₹XXX</span>
                <span className="ml-2 text-lg">/ month</span>
              </p>
              <hr className="my-6 border-line" />
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-ink-soft/70">
                <span className="flex gap-2" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-3 w-3 animate-pulse rounded-full bg-ink/20" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </span>
                <p className="font-display text-2xl font-bold">Coming soon…</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DownloadCta />
    </>
  );
}
