"use client";

import { useState } from "react";
import { Avatar, SectionHeading } from "./ui";

// TODO: replace with real teacher testimonials.
const quotes = [
  {
    text: "I used to spend Sunday evenings grading. With Gibble I rate work between classes, and my students actually read the feedback.",
    name: "Placeholder Teacher",
    role: "Maths teacher, Grade 5",
    initials: "PT",
  },
  {
    text: "The progress tracker showed me which students were slipping weeks before the test. That changed how I plan my lessons.",
    name: "Placeholder Teacher",
    role: "Science teacher, Grade 7",
    initials: "PT",
  },
  {
    text: "Everything lives in one place now: my worksheets, my classes, my ratings. It's the first app my whole department agreed on.",
    name: "Placeholder Teacher",
    role: "Head of English",
    initials: "PT",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const go = (d: number) => setI((p) => (p + d + quotes.length) % quotes.length);

  return (
    <section className="px-4 py-20 sm:px-6">
      <SectionHeading title="What teachers are saying" />
      <div className="mx-auto mt-10 flex max-w-4xl items-center gap-3 sm:gap-6">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-ink hover:text-white sm:grid">
          ←
        </button>
        <figure className="flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-[2rem] bg-butter px-6 py-10 text-center sm:px-14" aria-live="polite">
          <blockquote className="font-display text-xl font-bold leading-snug sm:text-2xl">“{q.text}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar initials={q.initials} color="bg-white" />
            <span className="text-left text-sm">
              <span className="block font-bold">{q.name}</span>
              <span className="text-ink/70">{q.role}</span>
            </span>
          </figcaption>
        </figure>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-ink hover:text-white sm:grid">
          →
        </button>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show testimonial ${idx + 1}`}
            aria-current={idx === i}
            className={`h-2.5 rounded-full transition-all ${idx === i ? "w-7 bg-ink" : "w-2.5 bg-ink/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
