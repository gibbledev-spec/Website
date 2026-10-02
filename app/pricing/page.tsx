import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DownloadCta } from "@/components/sections";
import { Button, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple plans for teachers and schools. Start free.",
};

// TODO: replace plan names, prices and limits with real values.
const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    blurb: "Everything you need to try Gibble with one class.",
    color: "bg-white ring-1 ring-line",
    cta: "Download free",
    points: ["1 class", "Task creation & rating", "Basic progress view", "Library up to 50 files"],
  },
  {
    name: "Pro",
    price: "₹—",
    period: "per month",
    blurb: "For teachers running several classes every day.",
    color: "bg-butter",
    featured: true,
    cta: "Start Pro trial",
    points: ["Unlimited classes", "Full progress tracker", "Unlimited library", "Reusable task templates", "Priority support"],
  },
  {
    name: "School",
    price: "Custom",
    period: "per school",
    blurb: "For schools that want every teacher on Gibble.",
    color: "bg-mint",
    cta: "Talk to us",
    points: ["Everything in Pro", "All teachers & classes", "School-wide progress reports", "Admin controls", "Onboarding & training"],
  },
];

const compare: [string, string, string, string][] = [
  ["Classes", "1", "Unlimited", "Unlimited"],
  ["Task creation & rating", "✓", "✓", "✓"],
  ["Progress tracker", "Basic", "Full", "Full + school reports"],
  ["Library storage", "50 files", "Unlimited", "Unlimited"],
  ["Mobile & tablet apps", "✓", "✓", "✓"],
  ["Admin controls", "—", "—", "✓"],
  ["Support", "Email", "Priority", "Dedicated"],
];

const faqs = [
  ["Is there really a free plan?", "Yes. The Free plan is free forever for one class. Upgrade only when you need more."],
  ["Does it work on both phone and tablet?", "Yes. Gibble runs on iPhone, iPad, Android phones and Android tablets, and your data stays in sync across all of them."],
  ["Do my students need to pay?", "No. Students join your class for free with a class code."],
  ["Can I cancel anytime?", "Yes. You can cancel Pro at any time and keep access until the end of your billing period."],
  ["How does school pricing work?", "School plans are priced by number of teachers. Get in touch and we'll put together a quote."],
];

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans. Start free.">
        Pick the plan that fits your classroom today. You can switch any time.
      </PageHero>

      <section className="px-4 pb-16 sm:px-6">
        <p className="mx-auto mb-6 w-fit rounded-full bg-peach px-4 py-1.5 text-center text-sm font-semibold text-peach-ink">
          Draft: prices and limits are placeholders
        </p>
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-[2rem] p-8 ${p.color} ${p.featured ? "md:-translate-y-3 shadow-[0_6px_0_0_var(--color-ink)] ring-2 ring-ink" : ""}`}>
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">Most popular</span>
              )}
              <h2 className="text-2xl font-black">{p.name}</h2>
              <p className="mt-1 text-sm text-ink-soft">{p.blurb}</p>
              <p className="mt-6">
                <span className="font-display text-5xl font-black">{p.price}</span>
                <span className="ml-2 text-sm text-ink-soft">{p.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm">
                    <span className="font-black text-brand">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Button href={p.name === "School" ? "/about/#contact" : "/#download"} variant={p.featured ? "brand" : "dark"} className="mt-8">
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionHeading title="Compare plans" />
        <div className="mx-auto mt-10 max-w-4xl overflow-x-auto rounded-[1.75rem] bg-white ring-1 ring-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="p-4 font-bold">Feature</th>
                {["Free", "Pro", "School"].map((h) => (
                  <th key={h} className="p-4 font-display text-base font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map(([f, ...vals]) => (
                <tr key={f} className="border-b border-line last:border-0">
                  <td className="p-4 font-semibold">{f}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="p-4 text-ink-soft">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionHeading title="Questions? We've got answers" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-white p-5 ring-1 ring-line open:bg-lilac/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <DownloadCta />
    </>
  );
}
