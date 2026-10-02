import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", description: "How Gibble collects, uses and protects information." };

// TODO: replace with the final legal text.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 ring-1 ring-line md:p-12">
          <p className="rounded-2xl bg-peach px-4 py-3 text-sm font-semibold text-peach-ink">
            Draft placeholder. The final privacy policy will be added before launch.
          </p>
          <p className="mt-6 text-ink-soft">
            For questions in the meantime, email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline">{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
