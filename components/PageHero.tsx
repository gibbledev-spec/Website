import type { ReactNode } from "react";
import { Sparkle, Squiggle } from "./ui";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-14 text-center sm:px-6 md:pt-20">
      <Sparkle className="absolute left-[10%] top-16 hidden h-8 w-8 text-brand md:block" />
      <Squiggle className="absolute right-[8%] top-24 hidden h-10 w-28 text-lilac-ink/40 md:block" />
      <p className="mx-auto mb-4 w-fit rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand ring-1 ring-line">
        {eyebrow}
      </p>
      <h1 className="mx-auto max-w-3xl text-5xl font-black leading-[1.03] sm:text-6xl">{title}</h1>
      {children && <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">{children}</p>}
    </section>
  );
}
