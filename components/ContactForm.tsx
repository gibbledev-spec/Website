"use client";

import { useState, type FormEvent } from "react";
import { gmailComposeUrl } from "@/lib/site";

// No backend: submitting opens a new Gmail message to Gibble with the details filled in.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Gibble enquiry from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})\nSchool: ${data.get("school") || "-"}`;
    const url = gmailComposeUrl(subject, body);
    // Open Gmail in a new tab; if the browser blocks the pop-up, open it in this tab instead.
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = url;
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
      {sent && <p className="text-sm text-ink-soft" role="status">Gmail has opened with your message ready. Click Send in Gmail to deliver it.</p>}
    </form>
  );
}
