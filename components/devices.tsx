import type { ReactNode } from "react";

// Phone and tablet frames that show real Gibble app screenshots.

type FrameProps = {
  children?: ReactNode;
  className?: string;
  /** Real app screenshot; when set it fills the screen instead of `children`. */
  screenshot?: { src: string; alt: string };
};

export function PhoneFrame({ children, className = "", screenshot }: FrameProps) {
  return (
    <div className={`w-[220px] rounded-[2.2rem] bg-ink p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="relative h-[440px] overflow-hidden rounded-[1.75rem] bg-white">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={screenshot.src} alt={screenshot.alt} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full flex-col pt-9">{children}</div>
        )}
      </div>
    </div>
  );
}

export function TabletFrame({ children, className = "", screenshot }: FrameProps) {
  return (
    <div className={`w-[440px] max-w-full rounded-[1.8rem] bg-ink p-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.3rem] bg-white">
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={screenshot.src} alt={screenshot.alt} className="h-full w-full object-cover object-top" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export const screens = {
  tabletProgress: { src: "/screens/tablet-progress.webp", alt: "Gibble on a tablet: a student's progress tracker with star ratings for technique, reading and posture" },
  phonePractical: { src: "/screens/phone-practical.webp", alt: "Gibble on a phone: starting a student's practical lessons with pieces, finger exercises, scales and sight reading" },
  phoneTaskCreation: { src: "/screens/phone-task-creation.webp", alt: "Gibble on a phone: a piece's to-do list of practice tasks with topic progress for technicals, posture and reading" },
  phoneTaskRating: { src: "/screens/phone-task-rating.webp", alt: "Gibble on a phone: rating a task on technical understanding, reading ability and body posture" },
  phoneMusicLibrary: { src: "/screens/phone-music-library.webp", alt: "Gibble on a phone: a piece in the music library with its music sheet, audio clips and referral video" },
  phoneMyStudents: { src: "/screens/phone-my-students.webp", alt: "Gibble on a phone: the My Students list with each student's instrument, level, grade and rating" },
  phoneAddStudent: { src: "/screens/phone-add-student.webp", alt: "Gibble on a phone: the home screen with an Add New Student button for adding your first student" },
  phoneSchedule: { src: "/screens/phone-schedule.webp", alt: "Gibble on a phone: the day schedule with the current class and upcoming practical and theory classes" },
  phoneAiAssistant: { src: "/screens/phone-ai-assistant.webp", alt: "Gibble AI on a phone: suggestions to summarise a class, add tasks and get a student's progress" },
};

