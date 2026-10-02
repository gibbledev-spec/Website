# Gibble website

Marketing site for Gibble, the classroom app for teachers.

Built with Next.js (static export) and Tailwind CSS.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint     # type check
```

## Structure

| Path | Page |
| --- | --- |
| `app/page.tsx` | Home: hero, instruments, feature bento, mobile & tablet banner, teacher workflows, how it works, download CTA |
| `app/features/` | Features in detail: Task Creation, Task Rating, Progress Tracker, Library, Class Management |
| `app/pricing/` | Plans, comparison table, FAQ |
| `app/about/` | Story, values, team, contact form |
| `app/privacy/`, `app/terms/` | Legal placeholders |

Shared pieces live in `components/`. Colours and fonts are design tokens in `app/globals.css`.

## Placeholders to replace

Search the code for `TODO`. Main items:

- `lib/site.ts`: store links, email, phone, social links
- `public/screens/`: app screenshots shown in the phone and tablet frames (`components/devices.tsx`)
- `components/ui.tsx`: store badges are drafts; use the official Apple / Google artwork
- `app/pricing/page.tsx`: plan prices and limits
- `app/about/page.tsx`: story and team
- `app/privacy/`, `app/terms/`: legal text
