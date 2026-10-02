"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Button, Logo } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const surface = pathname === "/" ? "bg-white" : "bg-cream";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-50 border-b border-line/60 backdrop-blur ${pathname === "/" ? "bg-white/85" : "bg-cream/85"}`}>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(item.href) ? "bg-white text-ink ring-1 ring-line" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/#download" className="hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Download app
          </Button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className={`border-t border-line px-4 pb-6 pt-3 md:hidden ${surface}`} aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 font-display text-xl font-bold ${isActive(item.href) ? (pathname === "/" ? "bg-cream" : "bg-white") : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div onClick={() => setOpen(false)}>
            <Button href="/#download" className="mt-4 w-full">
              Download app
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
