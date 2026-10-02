import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { DownloadCta } from "@/components/sections";
import { SectionHeading, Sparkle } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Why we built Gibble, and the people behind it.",
};

const values = [
  ["💛", "Teachers first", "Every feature starts with a real classroom problem, and we test it with real teachers.", "bg-butter"],
  ["🌱", "Growth over grades", "We help students see progress, not just scores, so learning feels like a journey.", "bg-mint"],
  ["✨", "Joy is a feature", "Teaching tools can be friendly and fun. If it feels like a chore, we redesign it.", "bg-lilac"],
  ["🔒", "Trust by default", "Student data is private and protected. We never sell it, ever.", "bg-aqua"],
];

// TODO: replace with the real team.
const team = [
  ["Founder Name", "Co-founder & CEO", "bg-peach"],
  ["Founder Name", "Co-founder & CTO", "bg-sky"],
  ["Team Member", "Head of Design", "bg-butter"],
  ["Team Member", "Teacher Success", "bg-mint"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="We're on a mission to give teachers their time back">
        Gibble started with a simple question: why does teaching come with so much busywork?
      </PageHero>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="relative rounded-[2rem] bg-peach p-10">
            <Sparkle className="absolute right-8 top-8 h-8 w-8 text-brand" />
            <p className="font-display text-3xl font-black leading-tight">
              “Teachers should spend their energy on students, not spreadsheets.”
            </p>
            <p className="mt-4 text-sm font-semibold text-peach-ink">The idea behind Gibble</p>
          </div>
          <div className="space-y-4 text-lg text-ink-soft">
            <h2 className="text-4xl font-black text-ink">Our story</h2>
            {/* TODO: replace with the real founding story */}
            <p>
              We watched teachers juggle notebooks, chat groups, spreadsheets and late-night grading just to keep track of who did what. Good feedback was getting lost, and so were the students who needed it most.
            </p>
            <p>
              So we built Gibble: one friendly app where teachers can set tasks, rate work, follow progress and keep their resources, on whichever device is in their hand.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionHeading title="What we believe" />
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2">
          {values.map(([e, t, d, c]) => (
            <div key={t} className={`rounded-[1.75rem] p-7 ${c}`}>
              <span className="text-3xl">{e}</span>
              <h3 className="mt-3 text-2xl font-black">{t}</h3>
              <p className="mt-2 text-ink/75">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionHeading title="The team" />
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {team.map(([n, r, c], i) => (
            <li key={i} className="text-center">
              <div className={`mx-auto grid aspect-square w-full max-w-[180px] place-items-center rounded-[2rem] font-display text-4xl font-black ${c}`}>
                {n.split(" ").map((w) => w[0]).join("")}
              </div>
              <p className="mt-3 font-bold">{n}</p>
              <p className="text-sm text-ink-soft">{r}</p>
            </li>
          ))}
        </ul>
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
