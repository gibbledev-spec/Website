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
| `app/about/` | Mission, what Gibble is, the learning cycle, contact form |
| `app/privacy/`, `app/terms/` | Legal placeholders |

Shared pieces live in `components/`. The welcome splash (`components/Splash.tsx`) plays once per browser session; add `?splash` to any URL to replay it. It has two looks, the full-colour logo and solid white letters on a warm gradient: preview them with `?splash=colour` and `?splash=white`, and pick the default with `DEFAULT_VARIANT` in the component. `/intro` plays the white animation on its own and ends on the logo (no hand-off to the site); `/intro/?render` exposes `window.__introRender(t)` for frame-by-frame video capture. Its letter images in `public/splash/` are exact slices of `public/gibble-logo.png`, so regenerate them if the logo changes. Colours and fonts are design tokens in `app/globals.css`.

## Placeholders to replace

Search the code for `TODO`. Main items:

- `lib/site.ts`: App Store and Google Play links, Facebook page
- `public/screens/`: app screenshots shown in the phone and tablet frames (`components/devices.tsx`)
- `components/ui.tsx`: store badges are drafts; use the official Apple / Google artwork
- `app/pricing/page.tsx`: plan prices and limits
- `app/terms/`: legal text
- `app/privacy/page.tsx`: privacy policy needs a legal review before launch
