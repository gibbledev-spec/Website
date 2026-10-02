import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { DownloadCta } from "@/components/sections";
import { SectionHeading, Sparkle } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Gibble bridges the gap between music lessons and practice, so home practice is as productive as in-class time.",
};

const cycle = [
  ["🧑‍🏫", "Teacher", "Sets clear tasks and shares the right resources after each lesson.", "bg-butter"],
  ["🎹", "Student", "Knows exactly what to work on before the next class.", "bg-mint"],
  ["🔁", "Practice", "Works through assignments at home, with structure instead of guesswork.", "bg-lilac"],
  ["📈", "Progress", "Ratings show what's improving, so the next lesson starts in the right place.", "bg-aqua"],
];


export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Gibble: smarter music teaching & learning">
        Bridge the gap between music lessons and practice.
      </PageHero>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="relative rounded-[2rem] bg-peach p-10">
            <Sparkle className="absolute right-8 top-8 h-8 w-8 text-brand" />
            <p className="text-sm font-bold uppercase tracking-widest text-peach-ink">Our mission</p>
            <p className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">
              Make home practice as productive as in-class time.
            </p>
          </div>
          <div className="space-y-4 text-lg text-ink-soft">
            <h2 className="text-4xl font-black text-ink">What is Gibble?</h2>
            <p>
              Gibble is an intelligent assistive platform designed to make music teaching and learning more structured, connected and effective.
            </p>
            <p>
              Built for music teachers and their students, Gibble brings student management, learning journeys, progress tracking, assignments, classes and music resources into one centralised platform.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionHeading title="Built for better music learning">
          Learning an instrument doesn&apos;t stop when a lesson ends. Real progress happens between lessons, when students practise, complete assignments and apply what their teacher has taught them.
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink-soft">
          But without the right structure, practice can become inconsistent, repetitive and difficult to track. Gibble creates a continuous learning cycle between teacher, student, practice and progress.
        </p>

        <ol className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="The Gibble learning cycle">
          {cycle.map(([emoji, title, text, color], i) => (
            <li key={title} className={`relative rounded-[1.75rem] p-6 ${color}`}>
              <span className="text-3xl" aria-hidden>{emoji}</span>
              <h3 className="mt-3 text-2xl font-black">{title}</h3>
              <p className="mt-2 text-ink/75">{text}</p>
              {i < cycle.length - 1 && (
                <span className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-ink text-sm font-bold text-white lg:grid" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold ring-1 ring-line">
          <span aria-hidden>↺</span> Then the cycle starts again, one lesson at a time.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-white p-8 ring-1 ring-line md:grid-cols-[1fr_1.4fr] md:p-12">
          <div>
            <h2 className="text-4xl font-black">Say hello</h2>
            <p className="mt-3 text-ink-soft">Questions, school plans, or just feedback? We read every message.</p>
            <ul className="mt-6 space-y-3 font-semibold">
              <li>
                ✉️ <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
              </li>
              <li>
                📞 <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand">{site.phone}</a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <DownloadCta />
    </>
  );
}
