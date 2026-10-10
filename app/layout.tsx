import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Splash } from "@/components/Splash";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Gibble — The joyful classroom app for teachers",
    template: "%s · Gibble",
  },
  description:
    "Create tasks, rate student work, track progress and manage classes — all from one app on your phone or tablet.",
};

const splashGate = `(function(){var d=document.documentElement;try{var m=/[?&]splash(?:=(\\w+))?\\b/.exec(location.search);if(m&&m[1])d.dataset.splash=m[1];if(!m&&sessionStorage.getItem("gibble:splash")){d.classList.add("splash-done");return}}catch(e){}d.classList.add("splash-active")})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Decide before first paint whether the welcome splash plays (once per session; ?splash or ?splash=white|colour replays it). */}
        <script dangerouslySetInnerHTML={{ __html: splashGate }} />
        <noscript>
          <style>{".gibble-splash{display:none}"}</style>
        </noscript>
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Splash />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
