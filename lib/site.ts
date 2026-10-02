// Central place for links and contact details.
export const site = {
  name: "Gibble",
  tagline: "The joyful classroom app for teachers.",
  appStoreUrl: "#", // TODO: App Store link
  playStoreUrl: "#", // TODO: Google Play link
  email: "Gibblelearning@gmail.com",
  phones: ["+91 80074 58523", "+91 70201 35589"],
  instagram: "https://www.instagram.com/gibble_learning/",
  facebook: "", // TODO: Facebook page; the icon is hidden while this is empty
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

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
    short: "Teachers can create tasks and assignments for students and track their completion.",
    color: "bg-butter",
    ink: "text-butter-ink",
    emoji: "📝",
  },
  {
    id: "task-rating",
    title: "Task Rating",
    short: "Teachers can create tasks and assignments for students and track their completion.",
    color: "bg-mint",
    ink: "text-mint-ink",
    emoji: "⭐",
  },
  {
    id: "progress-tracker",
    title: "Progress Tracker",
    short: "Track every student's learning journey. Give every student a structured path to progress.",
    color: "bg-lilac",
    ink: "text-lilac-ink",
    emoji: "📈",
  },
  {
    id: "library",
    title: "Music Library",
    short: "Build your own music library. Create a centralised library for your teaching resources.",
    color: "bg-aqua",
    ink: "text-aqua-ink",
    emoji: "🎼",
  },
  {
    id: "class-management",
    title: "Manage Your Students",
    short: "Keep all your students organised in one place. Create individual student profiles and access important information.",
    color: "bg-peach",
    ink: "text-peach-ink",
    emoji: "🧑‍🎓",
  },
  {
    id: "ai-assistant",
    title: "Your AI Teaching Assistant",
    short: "Ask about your students, their progress, assignments and classes using voice or text. Less time searching, more time teaching.",
    color: "bg-sky",
    ink: "text-sky-ink",
    emoji: "✨",
  },
] as const;
