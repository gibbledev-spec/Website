import type { ReactNode } from "react";

// Placeholder app screens built in HTML/CSS.
// TODO: replace with real Gibble screenshots once available.

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
};

function AppBar({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-4 pb-3">
      {sub && <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{sub}</p>}
      <p className="font-display text-lg font-black leading-tight">{title}</p>
    </div>
  );
}

export function TaskScreen() {
  return (
    <>
      <AppBar sub="New task" title="Für Elise practice" />
      <div className="space-y-2.5 px-4">
        <div className="rounded-xl bg-cream p-3">
          <p className="text-[10px] font-semibold text-ink-soft">Assign to</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {["Kevin Shah", "Sara Khan"].map((c) => (
              <span key={c} className="rounded-full bg-butter px-2.5 py-1 text-[10px] font-bold">{c}</span>
            ))}
            <span className="rounded-full border border-dashed border-ink/30 px-2.5 py-1 text-[10px] font-semibold text-ink-soft">+ Add</span>
          </div>
        </div>
        <div className="rounded-xl bg-cream p-3">
          <p className="text-[10px] font-semibold text-ink-soft">Due</p>
          <p className="text-xs font-bold">Friday, 4:00 PM</p>
        </div>
        <div className="rounded-xl bg-cream p-3">
          <p className="text-[10px] font-semibold text-ink-soft">Activities</p>
          {["Bars 1–8", "C major scale", "Sight-reading ex. 4"].map((q, i) => (
            <p key={q} className="mt-1.5 flex items-center gap-2 text-[11px] font-medium">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-white text-[9px] font-bold">{i + 1}</span>
              {q}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-full bg-brand py-2.5 text-center text-xs font-bold text-white">Assign task</div>
      </div>
    </>
  );
}

export function RatingScreen() {
  const scores: [string, number][] = [
    ["Technique", 5],
    ["Body posture", 4],
    ["Reading", 4],
  ];
  const avg = scores.reduce((t, [, v]) => t + v, 0) / scores.length;
  return (
    <>
      <AppBar sub="Rate task · Kevin Shah" title="Für Elise practice" />
      <div className="space-y-2 px-4">
        {scores.map(([label, v]) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-cream px-3 py-2.5">
            <span className="text-[11px] font-semibold">{label}</span>
            <span className="text-sm tracking-wider text-[#f59e0b]">
              {"★".repeat(v)}
              <span className="text-ink/20">{"★".repeat(5 - v)}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl bg-mint p-3">
          <div>
            <p className="text-[10px] font-semibold text-mint-ink">Task rating</p>
            <p className="text-[9px] text-ink-soft">Average of all three</p>
          </div>
          <p className="font-display text-xl font-black">{avg.toFixed(1)}<span className="text-xs text-ink-soft">/5</span></p>
        </div>
        <div className="rounded-xl bg-cream p-3">
          <p className="text-[10px] font-semibold text-ink-soft">Feedback</p>
          <p className="mt-1 text-[11px] font-medium">Lovely dynamics! Keep your wrists level.</p>
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-full bg-ink py-2.5 text-center text-xs font-bold text-white">Save rating</div>
      </div>
    </>
  );
}

export function ProgressScreen() {
  const bars = [40, 55, 48, 70, 66, 82];
  return (
    <>
      <AppBar sub="Progress" title="Class 5A" />
      <div className="space-y-2.5 px-4">
        <div className="rounded-xl bg-lilac p-3">
          <p className="text-[10px] font-semibold text-lilac-ink">Avg. score · last 6 weeks</p>
          <div className="mt-2 flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-lilac-ink/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {[
          ["Diya", 92, "bg-mint"],
          ["Kabir", 74, "bg-butter"],
          ["Meera", 58, "bg-peach"],
        ].map(([n, v, c]) => (
          <div key={n as string} className="flex items-center gap-2 rounded-xl bg-cream p-2.5">
            <span className={`grid h-6 w-6 place-items-center rounded-full text-[9px] font-bold ${c}`}>{(n as string)[0]}</span>
            <span className="flex-1 text-[11px] font-semibold">{n}</span>
            <span className="text-[11px] font-bold">{v}%</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function LibraryScreen() {
  const items = [
    ["📄", "Worksheet · Fractions", "bg-butter"],
    ["🧪", "Lab notes · Plants", "bg-mint"],
    ["📖", "Reading · Chapter 4", "bg-lilac"],
    ["🗺️", "Map activity", "bg-peach"],
  ];
  return (
    <>
      <AppBar sub="Library" title="My resources" />
      <div className="px-4">
        <div className="mb-2.5 rounded-full bg-cream px-3 py-2 text-[11px] text-ink-soft">🔍 Search worksheets, tasks…</div>
        <div className="grid grid-cols-2 gap-2">
          {items.map(([e, t, c]) => (
            <div key={t} className={`rounded-xl p-3 ${c}`}>
              <p className="text-lg">{e}</p>
              <p className="mt-1 text-[10px] font-bold leading-tight">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ClassScreen() {
  return (
    <>
      <AppBar sub="Classes" title="Good morning, Ms. Rao" />
      <div className="space-y-2 px-4">
        {[
          ["Class 5A", "32 students", "bg-peach"],
          ["Class 5B", "29 students", "bg-aqua"],
          ["Class 6A", "35 students", "bg-butter"],
        ].map(([n, s, c]) => (
          <div key={n} className={`flex items-center justify-between rounded-xl p-3 ${c}`}>
            <div>
              <p className="text-xs font-bold">{n}</p>
              <p className="text-[10px] text-ink-soft">{s}</p>
            </div>
            <span className="text-xs">→</span>
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-ink/25 p-3 text-center text-[11px] font-semibold text-ink-soft">+ Create class</div>
      </div>
    </>
  );
}

// Wide dashboard used inside the tablet frame.
export function TabletDashboard() {
  return (
    <div className="flex h-full text-ink">
      <aside className="hidden w-[26%] flex-col gap-1.5 bg-cream p-3 sm:flex">
        <p className="mb-1 font-display text-sm font-black">Gibble</p>
        {["Home", "Tasks", "Ratings", "Progress", "Library", "Classes"].map((l, i) => (
          <span key={l} className={`rounded-lg px-2 py-1.5 text-[10px] font-semibold ${i === 0 ? "bg-brand text-white" : "text-ink-soft"}`}>{l}</span>
        ))}
      </aside>
      <div className="flex-1 space-y-2.5 p-3">
        <p className="font-display text-sm font-black">Today</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["12", "To review", "bg-mint"],
            ["3", "Due today", "bg-butter"],
            ["86%", "Avg. score", "bg-lilac"],
          ].map(([v, l, c]) => (
            <div key={l} className={`rounded-xl p-2 ${c}`}>
              <p className="font-display text-base font-black">{v}</p>
              <p className="text-[9px] font-semibold text-ink-soft">{l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-cream p-2.5">
          <p className="text-[9px] font-semibold text-ink-soft">Weekly progress</p>
          <div className="mt-1.5 flex h-14 items-end gap-1">
            {[30, 45, 40, 62, 58, 75, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-brand/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          {["Fractions practice · 5A", "Plant life cycle · 6A"].map((t) => (
            <div key={t} className="flex items-center justify-between rounded-lg bg-cream px-2.5 py-1.5">
              <span className="text-[10px] font-semibold">{t}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold">Review</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OnboardScreen() {
  const field = (l: string, v: string) => (
    <div className="rounded-xl bg-cream px-3 py-2">
      <p className="text-[10px] font-semibold text-ink-soft">{l}</p>
      <p className="text-xs font-bold">{v}</p>
    </div>
  );
  return (
    <>
      <AppBar sub="New student" title="Create profile" />
      <div className="space-y-2 px-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sky text-sm font-bold">KS</span>
          <span className="text-[11px] font-semibold text-ink-soft">+ Add photo</span>
        </div>
        {field("Student name", "Kevin Shah")}
        <div className="grid grid-cols-2 gap-2">
          {field("Age", "15")}
          {field("Level", "Basic")}
        </div>
        {field("Lesson", "Mon · 4:00–5:00 pm")}
        <div className="rounded-xl bg-cream p-3">
          <p className="text-[10px] font-semibold text-ink-soft">Instrument</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-butter px-2.5 py-1 text-[10px] font-bold">🎹 Piano</span>
            <span className="rounded-full bg-lilac px-2.5 py-1 text-[10px] font-bold">🎼 Theory</span>
          </div>
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-full bg-brand py-2.5 text-center text-xs font-bold text-white">Add student</div>
      </div>
    </>
  );
}

export function StudentsScreen() {
  const students = [
    ["Kevin Shah", "Piano · Basic", "Mon 4:00 pm", "bg-sky"],
    ["Ananya Rao", "Theory · Grade 2", "Mon 5:30 pm", "bg-butter"],
    ["Rohan Mehta", "Piano · Grade 1", "Tue 6:00 pm", "bg-mint"],
    ["Sara Khan", "Piano · Basic", "Wed 4:30 pm", "bg-peach"],
  ];
  return (
    <>
      <AppBar sub="My students" title="24 students" />
      <div className="px-4">
        <div className="mb-2.5 flex gap-1.5">
          {["All", "Piano", "Theory"].map((t, i) => (
            <span key={t} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${i === 0 ? "bg-ink text-white" : "bg-cream"}`}>{t}</span>
          ))}
        </div>
        <div className="space-y-2">
          {students.map(([n, d, t, c]) => (
            <div key={n} className="flex items-center gap-2.5 rounded-xl bg-cream p-2.5">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ${c}`}>
                {n.split(" ").map((w) => w[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold">{n}</p>
                <p className="truncate text-[9px] text-ink-soft">{d}</p>
                <p className="truncate text-[9px] font-semibold text-brand">{t}</p>
              </div>
              <span className="text-xs text-ink-soft">›</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
