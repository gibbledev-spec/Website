// Central place for links and contact details.
// TODO: replace placeholders with real values before launch.
export const site = {
  name: "Gibble",
  tagline: "The joyful classroom app for teachers.",
  appStoreUrl: "#", // TODO: App Store link
  playStoreUrl: "#", // TODO: Google Play link
  email: "hello@gibble.app", // TODO: confirm
  phone: "+91 00000 00000", // TODO: confirm
  instagram: "#", // TODO: Instagram profile
  facebook: "#", // TODO: Facebook page
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/features/", label: "Features" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
];

export const features = [
  {
    id: "task-creation",
    title: "Task Creation",
    short: "Build homework, quizzes and projects in minutes — then assign to a whole class or a single student.",
    color: "bg-butter",
    ink: "text-butter-ink",
    emoji: "📝",
  },
  {
    id: "task-rating",
    title: "Task Rating",
    short: "Rate submissions with stars and a quick note, so every student knows exactly how they did.",
    color: "bg-mint",
    ink: "text-mint-ink",
    emoji: "⭐",
  },
  {
    id: "progress-tracker",
    title: "Progress Tracker",
    short: "See how each student and class is growing over time, and spot who needs help early.",
    color: "bg-lilac",
    ink: "text-lilac-ink",
    emoji: "📈",
  },
  {
    id: "library",
    title: "Library",
    short: "Keep worksheets, notes and reusable tasks in one tidy place — ready whenever you are.",
    color: "bg-aqua",
    ink: "text-aqua-ink",
    emoji: "📚",
  },
  {
    id: "class-management",
    title: "Class Management",
    short: "Set up classes, add students and keep every section organised from one screen.",
    color: "bg-peach",
    ink: "text-peach-ink",
    emoji: "🏫",
  },
] as const;
