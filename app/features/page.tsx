import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PhoneFrame, TabletFrame, screens } from "@/components/devices";
import { PageHero } from "@/components/PageHero";
import { DeviceBanner, DownloadCta, FeatureRow } from "@/components/sections";
import { features } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description: "Task creation, task rating, progress tracking, a resource library and class management, in one app for teachers.",
};

const detail: Record<string, { headline: string; body: string; points: string[]; visual: ReactNode }> = {
  "task-creation": {
    headline: "Turn every lesson into actionable practice",
    body: "Create tasks and assignments for your students and track their completion. Students work through their assigned activities, while you see what's done and what still needs attention.",
    points: [
      "Create tasks and assignments for students",
      "Students work on assigned activities",
      "See what's done and what's pending",
      "Rate each assignment with feedback",
    ],
    visual: <PhoneFrame screenshot={screens.phoneTaskCreation} />,
  },
  "task-rating": {
    headline: "Rate every task on what matters",
    body: "Each task is rated on technique, body posture and reading ability. The average becomes the task's overall rating, which shows up in the student's progress tracker.",
    points: [
      "Rate each task individually",
      "Score technique, posture and reading",
      "Average becomes the task rating",
      "Ratings feed the progress tracker",
    ],
    visual: <PhoneFrame screenshot={screens.phoneTaskRating} />,
  },
  "progress-tracker": {
    headline: "Track every student's learning journey",
    body: "Give every student a structured path to progress. Gibble organises learning across two key areas: practical music and music theory.",
    points: [
      "Track practical instrument learning",
      "Follow practice, tasks and performance",
      "Teach theory alongside practical lessons",
      "Build technique and understanding",
    ],
    visual: <TabletFrame screenshot={screens.tabletProgress} />,
  },
  library: {
    headline: "Build your own music library",
    body: "Create a centralised library for your teaching resources. Instead of searching through folders, chats, drives and different platforms, keep all your music resources in one organised space.",
    points: [
      "Store sheets, audio and videos",
      "Keep all your learning materials",
      "Arrange resources by learning level",
      "Share materials with students easily",
    ],
    visual: <PhoneFrame screenshot={screens.phoneMusicLibrary} />,
  },
  "class-management": {
    headline: "Keep all your students organised in one place",
    body: "Whether you teach a handful of students or many, Gibble keeps you organised without scattered notes, spreadsheets or multiple tools.",
    points: [
      "Create individual student profiles",
      "See each student's learning journey",
      "Track progress, tasks and activities",
      "Replace notes, spreadsheets and apps",
    ],
    visual: <PhoneFrame screenshot={screens.phoneMyStudents} />,
  },
  "ai-assistant": {
    headline: "Less time searching, more time teaching",
    body: "Gibble brings assistive intelligence into your workflow. Ask about students, their learning journey, progress, assignments or classes using voice or text, without moving through multiple screens.",
    points: [
      "Talk or type to Gibble's AI",
      "Ask about students and progress",
      "Check assignments and classes fast",
      "Hands-free voice while you teach",
    ],
    visual: <PhoneFrame screenshot={screens.phoneAiAssistant} />,
  },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Features" title="Everything a teacher needs, in one joyful app">
        Six tools that work together, from the moment you set a task to the moment you see a student improve.
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
                visual={d.visual}
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
