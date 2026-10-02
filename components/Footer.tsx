import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { Logo, StoreBadges } from "./ui";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: [
      { href: "/features/", label: "Features" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/#download", label: "Download app" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About us" },
      { href: "/about/#contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy/", label: "Privacy policy" },
      { href: "/terms/", label: "Terms of service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{site.tagline}</p>
          <StoreBadges className="mt-5" light />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-sm font-bold tracking-normal">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-soft hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-sans text-sm font-bold tracking-normal">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone}>
                <a href={telHref(phone)} className="hover:text-brand">{phone}</a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Gibble on Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-brand hover:text-white">
              <InstagramIcon />
            </a>
            {site.facebook && (
              <a href={site.facebook} aria-label="Gibble on Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-line hover:bg-brand hover:text-white">
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ink-soft sm:px-6">
          © {new Date().getFullYear()} Gibble. Made with care for teachers.
        </p>
      </div>
    </footer>
  );
}
