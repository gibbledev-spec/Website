import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Gibble home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/gibble-logo.png" alt="Gibble" width={616} height={227} className="h-11 w-auto" />
    </Link>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "brand" | "dark" | "outline";
  className?: string;
};

export function Button({ href, children, variant = "brand", className = "" }: ButtonProps) {
  const styles = {
    brand: "bg-brand text-white shadow-[0_4px_0_0_var(--color-brand-dark)] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_var(--color-brand-dark)]",
    dark: "bg-ink text-white shadow-[0_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#000]",
    outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition-all ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <p className="mb-3 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand ring-1 ring-line">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-black leading-[1.05] sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-ink-soft">{children}</p>}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c.02 2.5 2.2 3.33 2.23 3.34-.02.06-.35 1.19-1.15 2.36-.69 1.01-1.41 2.02-2.55 2.04-1.11.02-1.47-.66-2.75-.66-1.27 0-1.67.64-2.73.68-1.1.04-1.93-1.1-2.63-2.1-1.43-2.07-2.52-5.85-1.06-8.4.73-1.27 2.02-2.07 3.43-2.09 1.07-.02 2.09.72 2.74.72.66 0 1.89-.89 3.19-.76.54.02 2.07.22 3.05 1.65-.08.05-1.82 1.06-1.8 3.17M14.28 4.9c.58-.71.98-1.7.87-2.68-.84.03-1.86.56-2.46 1.27-.54.62-1.01 1.62-.89 2.58.94.07 1.9-.48 2.48-1.17" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path fill="#34d399" d="M4 2.6 13.6 12 4 21.4a1.4 1.4 0 0 1-.6-1.2V3.8c0-.5.2-.9.6-1.2Z" />
      <path fill="#60a5fa" d="m16.8 8.8-3.2 3.2L4 2.6c.3-.2.8-.2 1.2 0l11.6 6.2Z" />
      <path fill="#f87171" d="M16.8 15.2 5.2 21.4c-.4.2-.9.2-1.2 0l9.6-9.4 3.2 3.2Z" />
      <path fill="#fbbf24" d="m20.6 13.3-3.8 1.9-3.2-3.2 3.2-3.2 3.8 1.9c1 .5 1 2.1 0 2.6Z" />
    </svg>
  );
}

// Draft badges — swap for the official Apple / Google badge artwork before launch.
export function StoreBadges({ className = "", light = false }: { className?: string; light?: boolean }) {
  const base = light
    ? "bg-white text-ink ring-1 ring-line hover:bg-cream-deep"
    : "bg-ink text-white hover:bg-black";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={site.appStoreUrl} className={`inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5 transition-colors ${base}`}>
        <AppleIcon />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium opacity-80">Download on the</span>
          <span className="block text-base font-bold">App Store</span>
        </span>
      </a>
      <a href={site.playStoreUrl} className={`inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5 transition-colors ${base}`}>
        <PlayIcon />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium opacity-80">Get it on</span>
          <span className="block text-base font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}

/* ---------- Doodles ---------- */

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden>
      <path d="M4 28c10-18 20-18 26 0s16 18 24 0 18-18 26 0 16 14 34-8" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

export function Underline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden>
      <path d="M3 10c40-7 90-9 194-5" />
    </svg>
  );
}
