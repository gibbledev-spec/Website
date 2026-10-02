"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

// No backend yet: submitting opens the visitor's email app with the message filled in.
// TODO: connect to a form service or API when ready.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Gibble enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})\nSchool: ${data.get("school") || "-"}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field = "mt-1.5 w-full rounded-2xl border-0 bg-white px-4 py-3 ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-brand";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Your name
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        School (optional)
        <input name="school" className={field} autoComplete="organization" />
      </label>
      <label className="block text-sm font-semibold">
        Message
        <textarea name="message" required rows={4} className={field} />
      </label>
      <button type="submit" className="rounded-full bg-brand px-6 py-3 font-bold text-white shadow-[0_4px_0_0_var(--color-brand-dark)] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_var(--color-brand-dark)]">
        Send message
      </button>
      {sent && <p className="text-sm text-ink-soft" role="status">Your email app should open with the message ready to send.</p>}
    </form>
  );
}
