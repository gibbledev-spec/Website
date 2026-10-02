import type { ReactNode } from "react";
import { PhoneFrame, TabletDashboard, TabletFrame, ClassScreen } from "./devices";
import { Avatar, SectionHeading, Sparkle, Squiggle, StoreBadges } from "./ui";

/* Zig-zag row: visual on one side, copy on the other */
export function FeatureRow({
  id,
  title,
  children,
  visual,
  bg,
  reverse = false,
  cta,
}: {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  visual: ReactNode;
  bg: string;
  reverse?: boolean;
  cta?: ReactNode;
}) {
  return (
    <div id={id} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={`relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[2rem] p-8 ${bg} ${reverse ? "md:order-2" : ""}`}>
        {visual}
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <h3 className="text-3xl font-black leading-[1.08] sm:text-4xl">{title}</h3>
        <div className="mt-4 space-y-3 text-lg text-ink-soft">{children}</div>
        {cta && <div className="mt-7">{cta}</div>}
      </div>
    </div>
  );
}

/* Orange banner that tells people Gibble runs on phones and tablets */
export function DeviceBanner() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-10 text-white sm:px-10 md:py-12">
      <Squiggle className="absolute -right-6 -top-2 h-16 w-40 text-white/25" />
      <Sparkle className="absolute bottom-6 left-[45%] h-6 w-6 text-butter" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h3 className="text-3xl font-black leading-tight sm:text-4xl">
            Your classroom, on your phone <span className="italic">and</span> tablet.
          </h3>
          <p className="mt-3 max-w-md text-white/90">
            Plan on the tablet at your desk, rate work on your phone in the staff room. Everything stays in sync.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["📱 iPhone", "📱 Android phones", "📲 iPad", "📲 Android tablets"].map((d) => (
              <span key={d} className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/30">
                {d}
              </span>
            ))}
          </div>
          <StoreBadges className="mt-6" light />
        </div>
        <div className="relative hidden h-[330px] md:block">
          <TabletFrame className="absolute right-0 top-0 !w-[360px] rotate-2">
            <TabletDashboard />
          </TabletFrame>
          <PhoneFrame className="absolute left-0 top-10 origin-top-left scale-[0.62] -rotate-3">
            <ClassScreen />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

/* Endless scrolling strip of praise pills */
const praise = [
  ["Well done!", "bg-butter", "AK"],
  ["Shabash!", "bg-mint", "RS"],
  ["Excellent work", "bg-lilac", "PN"],
  ["बहुत बढ़िया!", "bg-peach", "MV"],
  ["Great effort!", "bg-aqua", "DJ"],
  ["Keep it up!", "bg-sky", "SR"],
  ["Superb!", "bg-butter", "TK"],
  ["Brilliant answer", "bg-mint", "AN"],
];

function PraiseRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...praise, ...praise];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className={`flex shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {items.map(([text, color, initials], i) => (
          <li key={i} aria-hidden={i >= praise.length} className={`flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-5 font-display text-lg font-bold ${color}`}>
            <Avatar initials={initials} color="bg-white" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PraiseMarquee() {
  return (
    <section className="py-20">
      <SectionHeading title="A little praise goes a long way">
        Every rating on Gibble comes with a kind word. Students feel seen, and they keep coming back.
      </SectionHeading>
      <div className="mt-10 space-y-3">
        <PraiseRow />
        <PraiseRow reverse />
      </div>
    </section>
  );
}

/* Final download call to action */
export function DownloadCta() {
  return (
    <section id="download" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-butter px-6 py-16 text-center sm:px-12">
        <Sparkle className="absolute left-[8%] top-10 h-8 w-8 text-brand" />
        <Sparkle className="absolute bottom-12 right-[10%] h-6 w-6 text-ink" />
        <Squiggle className="absolute -left-8 bottom-6 h-14 w-40 text-brand/40" />
        <div className="relative mx-auto max-w-2xl">
          <p className="mx-auto mb-5 w-fit rounded-full bg-white px-4 py-1.5 text-sm font-bold">
            Free to start · iOS & Android · Phone & Tablet
          </p>
          <h2 className="text-4xl font-black leading-[1.05] sm:text-6xl">Bring more joy to your classroom.</h2>
          <p className="mt-4 text-lg text-ink/75">
            Download Gibble and set up your first class in under five minutes.
          </p>
          <StoreBadges className="mt-8 justify-center" />
        </div>
      </div>
    </section>
  );
}
