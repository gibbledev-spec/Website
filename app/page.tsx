import Link from "next/link";
import {
  PhoneFrame,
  ProgressScreen,
  RatingScreen,
  TabletDashboard,
  TabletFrame,
  TaskScreen,
} from "@/components/devices";
import { DeviceBanner, DownloadCta, FeatureRow, PraiseMarquee } from "@/components/sections";
import { Testimonials } from "@/components/Testimonials";
import { Button, SectionHeading, Sparkle, StoreBadges, Underline } from "@/components/ui";
import { features } from "@/lib/site";

const instruments: { emoji: string; label: string; color: string; soon?: boolean }[] = [
  { emoji: "🎹", label: "Piano", color: "bg-butter" },
  { emoji: "🎼", label: "Theory of Music", color: "bg-lilac" },
  { emoji: "🎸", label: "Guitar", color: "bg-peach", soon: true },
  { emoji: "🎤", label: "Singing", color: "bg-mint", soon: true },
  { emoji: "🥁", label: "Drums", color: "bg-aqua", soon: true },
  { emoji: "🎻", label: "Violin", color: "bg-sky", soon: true },
  { emoji: "🪈", label: "Flute", color: "bg-butter", soon: true },
  { emoji: "🪘", label: "Tabla", color: "bg-peach", soon: true },
];

function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-10 sm:px-6 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
            Teach smarter,{" "}
            <span className="relative inline-block">
              the joyful
              <Underline className="absolute -bottom-2 left-0 h-3 w-full text-brand" />
            </span>{" "}
            way.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            Create tasks in minutes, rate student work with feedback that helps, and watch every learner grow. All from one app on your phone or tablet.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#download">Download app</Button>
            <Link href="/features/" className="font-bold underline decoration-2 underline-offset-4 hover:text-brand">
              See how it works
            </Link>
          </div>
          <StoreBadges className="mt-8" />
        </div>

        {/* Collage */}
        <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
          <div className="absolute right-0 top-6 h-[360px] w-[85%] rotate-3 rounded-[2.5rem] bg-butter" />
          <div className="absolute bottom-0 left-2 h-48 w-48 rounded-full bg-lilac" />
          <TabletFrame className="absolute right-2 top-12 !w-[370px] max-sm:hidden">
            <TabletDashboard />
          </TabletFrame>
          <PhoneFrame className="absolute bottom-0 left-0 origin-bottom-left scale-[0.8] -rotate-3 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:origin-bottom max-sm:rotate-0">
            <RatingScreen />
          </PhoneFrame>

          {/* Stickers */}
          <span className="absolute left-[38%] top-2 animate-float rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-lg -rotate-6">
            Great work, Aarav! 🎉
          </span>
          <span className="absolute right-0 top-[58%] animate-float rounded-2xl bg-white px-3.5 py-2.5 text-sm font-bold shadow-lg ring-1 ring-line [animation-delay:1.5s]">
            <span className="text-[#f59e0b]">★</span> +20 stars
          </span>
          <span className="absolute bottom-16 right-6 animate-float rounded-2xl bg-mint px-3.5 py-2.5 text-sm font-bold shadow-lg [animation-delay:3s] max-sm:hidden">
            ✓ 28/32 submitted
          </span>
          <Sparkle className="absolute bottom-24 right-[42%] h-8 w-8 text-brand max-sm:hidden" />
        </div>
      </div>
    </section>
  );
}

function InstrumentRow() {
  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-black sm:text-3xl">Made for every Instrument</h2>
      <ul className="mx-auto mt-6 flex max-w-6xl gap-5 overflow-x-auto px-4 pb-2 pt-2 sm:justify-center sm:px-6">
        {instruments.map(({ emoji, label, color, soon }) => (
          <li key={label} className="flex w-24 shrink-0 flex-col items-center gap-2">
            <span className="relative">
              <span className={`grid h-16 w-16 place-items-center rounded-full text-3xl ring-4 ring-white ${color} ${soon ? "opacity-60 grayscale-[60%]" : ""}`}>
                {emoji}
              </span>
              {soon && (
                <span className="absolute -right-3 -top-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Soon
                </span>
              )}
            </span>
            <span className={`text-center text-sm font-semibold leading-tight ${soon ? "text-ink-soft" : ""}`}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Tiny UI snippets that sit inside each bento card */
const snippets: Record<string, React.ReactNode> = {
  "task-creation": (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-xl bg-cream px-3 py-2 text-sm font-semibold">
        📝 Fractions practice <span className="rounded-full bg-butter px-2 py-0.5 text-xs">5A, 5B</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-cream px-3 py-2 text-sm font-semibold">
        🧪 Plant life cycle <span className="rounded-full bg-butter px-2 py-0.5 text-xs">Due Fri</span>
      </div>
    </div>
  ),
  "task-rating": (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-bold">Diya · Essay</p>
        <p className="text-xl tracking-wider text-[#f59e0b]">★★★★★</p>
      </div>
      <span className="rounded-full bg-mint px-3 py-1.5 text-sm font-bold text-mint-ink">Brilliant! 🌟</span>
    </div>
  ),
  "progress-tracker": (
    <div className="flex h-20 items-end gap-1.5">
      {[35, 50, 45, 68, 62, 80, 88].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-lilac-ink/75" style={{ height: `${h}%` }} />
      ))}
    </div>
  ),
  library: (
    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
      {[["📄", "Worksheets"], ["🎬", "Videos"], ["🧩", "Quizzes"]].map(([e, l]) => (
        <div key={l} className="rounded-xl bg-cream p-2">
          <p className="text-xl">{e}</p>
          {l}
        </div>
      ))}
    </div>
  ),
  "class-management": (
    <div className="flex items-center">
      {["bg-butter", "bg-mint", "bg-lilac", "bg-aqua", "bg-sky"].map((c, i) => (
        <span key={c} className={`-ml-2 h-9 w-9 rounded-full ring-2 ring-white first:ml-0 ${c}`} style={{ zIndex: 5 - i }} />
      ))}
      <span className="ml-3 text-sm font-bold">32 students · 5A</span>
    </div>
  ),
};

function FeatureBento() {
  const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];
  return (
    <section className="px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Product features" title="Why teachers love Gibble">
        Five simple tools that take the busywork out of teaching, so you can spend more time with your students.
      </SectionHeading>
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-6">
        {features.map((f, i) => (
          <Link
            key={f.id}
            href={`/features/#${f.id}`}
            className={`group flex flex-col rounded-[1.75rem] p-6 transition-transform hover:-translate-y-1 ${f.color} ${spans[i]}`}
          >
            <h3 className={`text-2xl font-black ${f.ink}`}>{f.title}</h3>
            <p className="mt-2 text-sm text-ink/75">{f.short}</p>
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">{snippets[f.id]}</div>
            <span className="mt-auto pt-5 text-sm font-bold">
              Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mx-auto mt-4 max-w-6xl">
        <DeviceBanner />
      </div>
    </section>
  );
}

function TeacherCan() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="A day with Gibble" title="What can a teacher do on Gibble?" />
      <div className="mx-auto mt-14 max-w-6xl space-y-20">
        <FeatureRow
          bg="bg-mint"
          title="Plan a week of work in one sitting"
          visual={<PhoneFrame><TaskScreen /></PhoneFrame>}
          cta={<Button href="/features/#task-creation" variant="dark">Explore task creation</Button>}
        >
          <p>Write a task once, attach a worksheet from your library, and assign it to every section with its own due date. Gibble reminds students so you don&apos;t have to.</p>
        </FeatureRow>
        <FeatureRow
          reverse
          bg="bg-butter"
          title="Give feedback that actually lands"
          visual={<PhoneFrame><RatingScreen /></PhoneFrame>}
          cta={<Button href="/features/#task-rating" variant="dark">Explore task rating</Button>}
        >
          <p>Rate each submission with stars and a short note in seconds. Students see exactly what went well and what to try next.</p>
        </FeatureRow>
        <FeatureRow
          bg="bg-lilac"
          title="Spot who needs help, early"
          visual={<PhoneFrame><ProgressScreen /></PhoneFrame>}
          cta={<Button href="/features/#progress-tracker" variant="dark">Explore progress tracking</Button>}
        >
          <p>Every rating feeds a live picture of each student and class. See trends over weeks, not just the last test, and step in before anyone falls behind.</p>
        </FeatureRow>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Download Gibble", "Get the app on your phone or tablet from the App Store or Google Play.", "bg-peach"],
    ["Create your class", "Add your sections and invite students with a simple class code.", "bg-aqua"],
    ["Assign your first task", "Pick from your library or start fresh. Ratings and progress follow automatically.", "bg-sky"],
  ];
  return (
    <section className="px-4 py-16 sm:px-6">
      <SectionHeading title="Up and running in three steps" />
      <ol className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-3">
        {steps.map(([t, d, c], i) => (
          <li key={t} className="rounded-[1.75rem] bg-white p-7 ring-1 ring-line">
            <span className={`grid h-12 w-12 place-items-center rounded-full font-display text-xl font-black ${c}`}>{i + 1}</span>
            <h3 className="mt-5 text-2xl font-black">{t}</h3>
            <p className="mt-2 text-ink-soft">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <Hero />
        <InstrumentRow />
      </div>
      <FeatureBento />
      <TeacherCan />
      <HowItWorks />
      <Testimonials />
      <PraiseMarquee />
      <DownloadCta />
    </>
  );
}

