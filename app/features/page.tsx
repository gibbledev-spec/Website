import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ClassScreen,
  LibraryScreen,
  PhoneFrame,
  ProgressScreen,
  RatingScreen,
  TaskScreen,
} from "@/components/devices";
import { PageHero } from "@/components/PageHero";
import { DeviceBanner, DownloadCta, FeatureRow } from "@/components/sections";
import { features } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description: "Task creation, task rating, progress tracking, a resource library and class management, in one app for teachers.",
};

const detail: Record<string, { headline: string; body: string; points: string[]; screen: ReactNode }> = {
  "task-creation": {
    headline: "Turn every lesson into actionable practice",
    body: "Create tasks and assignments for your students and track their completion. Students work through their assigned activities, while you see what's done and what still needs attention.",
    points: [
      "Create tasks and assignments for students",
      "Students work on assigned activities",
      "See what's done and what's pending",
      "Rate each assignment with feedback",
    ],
    screen: <TaskScreen />,
  },
  "task-rating": {
    headline: "Rate work with feedback that helps",
    body: "Review submissions on the go and give every student a clear, kind response.",
    points: [
      "Star ratings with a quick written note",
      "Ready-made praise and suggestions to save time",
      "See who has submitted and who hasn't at a glance",
      "Students are notified as soon as you rate",
    ],
    screen: <RatingScreen />,
  },
  "progress-tracker": {
    headline: "Watch every learner grow",
    body: "Every rating builds a picture of progress, for each student and each class.",
    points: [
      "Trends over weeks and terms, not just one test",
      "Highlights students who may need extra help",
      "Compare sections side by side",
      "Share progress summaries with parents and school leaders",
    ],
    screen: <ProgressScreen />,
  },
  library: {
    headline: "All your resources, in one tidy place",
    body: "Stop digging through folders and chats. Your teaching material lives where your tasks do.",
    points: [
      "Store worksheets, notes, videos and quizzes",
      "Organise by subject, class or topic",
      "Search everything instantly",
      "Add any resource to a task in one tap",
    ],
    screen: <LibraryScreen />,
  },
  "class-management": {
    headline: "Every class, organised",
    body: "Set up classes and students once, and Gibble keeps everything sorted from there.",
    points: [
      "Create classes and sections in seconds",
      "Invite students with a simple class code",
      "Switch between classes from one home screen",
      "Archive old classes at the end of the year",
    ],
    screen: <ClassScreen />,
  },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Features" title="Everything a teacher needs, in one joyful app">
        Five tools that work together, from the moment you set a task to the moment you see a student improve.
      </PageHero>

      <nav aria-label="Features" className="sticky top-[72px] z-40 bg-cream/90 px-4 py-3 backdrop-blur sm:px-6">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto md:justify-center">
          {features.map((f) => (
            <li key={f.id}>
              <a href={`#${f.id}`} className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${f.color} hover:ring-2 hover:ring-ink`}>
                {f.emoji} {f.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-24">
          {features.map((f, i) => {
            const d = detail[f.id];
            return (
              <FeatureRow
                key={f.id}
                id={f.id}
                reverse={i % 2 === 1}
                bg={f.color}
                title={
                  <>
                    <span className={`mb-3 block font-sans text-sm font-bold uppercase tracking-widest ${f.ink}`}>
                      {f.emoji} {f.title}
                    </span>
                    {d.headline}
                  </>
                }
                visual={<PhoneFrame>{d.screen}</PhoneFrame>}
              >
                <p>{d.body}</p>
                <ul className="space-y-2 pt-2 text-base text-ink">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-black ${f.color}`}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </FeatureRow>
            );
          })}
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <DeviceBanner />
        </div>
      </section>

      <DownloadCta />
    </>
  );
}
