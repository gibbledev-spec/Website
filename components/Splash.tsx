"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Welcome splash: the Gibble wordmark assembles letter by letter, then hands
 * off into the header logo.
 *
 * The letter images in /public/splash are slices of /public/gibble-logo.png
 * (616×227). Every visible pixel belongs to exactly one slice, so the settled
 * letters recompose the original logo pixel for pixel. x/y/w/h are each
 * slice's position inside the original image.
 *
 * Two looks:
 *  - "colour": the full-colour logo on a deep indigo stage.
 *  - "white":  the letterforms in solid white on a warm brand gradient (closest
 *    to the reference); they take on the logo's colours as they glide into the
 *    header. The *-white slices are the logo's white fill, cut on the same
 *    boundaries as the colour slices.
 * DEFAULT_VARIANT picks the one visitors see; ?splash=white or ?splash=colour
 * previews either.
 *
 * mode="intro" (the /intro page) plays the white animation on its own and holds
 * on the finished logo instead of handing off to the site. With ?render it waits
 * for window.__introRender(t) calls instead of playing, so it can be captured
 * frame by frame into a video.
 */
type Variant = "colour" | "white";
const DEFAULT_VARIANT: Variant = "colour";

const LOGO_W = 616;
const LOGO_H = 227;
const LETTERS = [
  { id: "g", x: 0, y: 12, w: 175, h: 206 },
  { id: "i", x: 130, y: 22, w: 112, h: 202 },
  { id: "b1", x: 205, y: 3, w: 124, h: 220 },
  { id: "b2", x: 309, y: 3, w: 129, h: 220 },
  { id: "l", x: 413, y: 3, w: 129, h: 217 },
  { id: "e", x: 482, y: 66, w: 131, h: 151 },
];

// Timeline, in seconds.
const T = {
  lettersIn: 0.12, // G launches; i b b l e follow, staggered
  bgIn: 0.4, // backdrop fades from black to colour
  bgDur: 0.55,
  stagger: 0.14,
  sheen: 1.62,
  exit: 2.65, // logo travels into the header
  exitDur: 0.85,
};
const REDUCED = { fadeIn: 0.45, exit: 1.5, exitDur: 0.45 };
const GHOSTS = [0.5, 0.32, 0.2, 0.1]; // motion-blur sample weights
const GHOST_STEP = 1 / 90; // seconds between blur samples
const STORAGE_KEY = "gibble:splash";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const easeInOutQuint = (x: number) => (x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2);

/** Displacement of an underdamped spring released from 1; settles to 0 with a small overshoot. */
function spring(t: number, zeta: number, omega: number) {
  if (t <= 0) return 1;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
}

/** Pose of a flying letter `tau` seconds after it launches. `dist` is its travel in px. */
function flight(tau: number, dist: number) {
  const r = spring(tau, 0.7, 7.5); // 1 → 0, dips slightly below 0 = lands a touch past its slot
  return {
    x: r * dist,
    rotY: r * 68,
    rotZ: r * 9,
    scale: 1 - Math.max(r, 0) * 0.12,
    opacity: smooth(0, 0.12, tau),
  };
}

const letterTransform = (p: ReturnType<typeof flight>) =>
  `translate3d(${p.x.toFixed(2)}px, 0, 0) perspective(700px) rotateY(${p.rotY.toFixed(2)}deg) rotateZ(${p.rotZ.toFixed(2)}deg) scale(${p.scale.toFixed(4)})`;

declare global {
  interface Window {
    __introRender?: (t: number) => void;
    __introReady?: boolean;
  }
}

export function Splash({ mode = "site" }: { mode?: "site" | "intro" }) {
  const intro = mode === "intro";
  const [visible, setVisible] = useState(true);
  // Letters render once the variant is known on the client; until then the black stage covers the page.
  const [variant, setVariant] = useState<Variant | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (intro) {
      setVariant("white");
      return;
    }
    if (html.classList.contains("splash-done")) {
      setVisible(false);
      return;
    }
    const v = html.dataset.splash;
    setVariant(v === "white" || v === "colour" ? v : DEFAULT_VARIANT);
  }, [intro]);

  useEffect(() => {
    const html = document.documentElement;
    if (!variant || !root.current) return;

    const el = root.current;
    const q = <E extends Element>(s: string) => el.querySelector<E>(s)!;
    const qa = <E extends Element>(s: string) => Array.from(el.querySelectorAll<E>(s));
    const backdrop = q<HTMLElement>("[data-backdrop]");
    const frame = q<HTMLElement>("[data-frame]");
    const word = q<HTMLElement>("[data-word]");
    const letters = qa<HTMLElement>("[data-letter]");
    const ghosts = letters.map((_, i) => qa<HTMLElement>(`[data-ghost="${i}"]`));
    const reduced = !intro && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    html.style.overflow = "hidden";
    if (reduced) letters.forEach((l) => (l.style.opacity = "1"));
    let raf = 0;
    let start = 0;
    let skipTo = -1;
    let exitFrom: { dx: number; dy: number; scale: number } | null = null;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      html.style.overflow = "";
      html.classList.remove("splash-active");
      html.classList.add("splash-done");
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setVisible(false);
    };

    // Where the assembled word should land: on top of the header logo.
    const measureExit = () => {
      const target = document.querySelector('header a[aria-label="Gibble home"] img')?.getBoundingClientRect();
      const from = frame.getBoundingClientRect();
      if (!target || !target.width || target.bottom < 0) return { dx: 0, dy: -12, scale: 0.92 };
      return {
        dx: target.left + target.width / 2 - (from.left + from.width / 2),
        dy: target.top + target.height / 2 - (from.top + from.height / 2),
        scale: target.width / from.width,
      };
    };

    const exitAt = intro ? Infinity : reduced ? REDUCED.exit : T.exit;
    const exitDur = reduced ? REDUCED.exitDur : T.exitDur;

    const render = (t: number) => {
      const W = frame.offsetWidth;
      const k = W / LOGO_W; // px per logo pixel
      const vw = window.innerWidth;
      const frameLeft = (vw - W) / 2;

      // Exit: the word glides into the header logo while the backdrop dissolves.
      const u = clamp((t - exitAt) / exitDur);
      if (u > 0 && !exitFrom) exitFrom = measureExit();
      const e = reduced ? 0 : easeInOutQuint(u);
      const fade = reduced ? smooth(0, 1, u) : smooth(0.3, 0.9, u);

      el.style.setProperty("--tint", String(reduced ? u : smooth(0.1, 0.7, u)));

      if (reduced) {
        const a = smooth(0, REDUCED.fadeIn, t) * (1 - fade);
        backdrop.style.opacity = String(1 - fade);
        el.style.setProperty("--bg", String(smooth(0, REDUCED.fadeIn, t)));
        word.style.opacity = String(a);
        return u >= 1;
      }

      // Backdrop: the colour version blooms from black; the white version is on its gradient from the first frame.
      el.style.setProperty("--bg", String(variant === "white" ? 1 : smooth(T.bgIn, T.bgIn + T.bgDur, t)));
      backdrop.style.opacity = String(1 - fade);

      const m = exitFrom ?? { dx: 0, dy: 0, scale: 1 };
      word.style.transform = `translate3d(${(m.dx * e).toFixed(2)}px, ${(m.dy * e).toFixed(2)}px, 0) scale(${lerp(1, m.scale, e).toFixed(4)})`;

      // Every letter slides in from just past the right edge straight into its slot: G first, then the rest, staggered.
      for (let i = 0; i < LETTERS.length; i++) {
        const L = LETTERS[i];
        const tau = t - (T.lettersIn + i * T.stagger);
        const dist = vw + 8 - (frameLeft + L.x * k);
        const p = flight(tau, dist);
        letters[i].style.opacity = String(p.opacity);
        letters[i].style.transform = letterTransform(p);

        // Motion blur: earlier samples of the same path, weighted by current speed.
        const speed = Math.abs(p.x - flight(tau - 1 / 120, dist).x) * 120;
        const strength = clamp(speed / 1800) * p.opacity;
        ghosts[i].forEach((gh, j) => {
          const s = flight(tau - (j + 1) * GHOST_STEP, dist);
          gh.style.opacity = (GHOSTS[j] * strength).toFixed(3);
          gh.style.transform = letterTransform(s);
        });
      }

      if (variant === "colour" && t >= T.sheen && !el.classList.contains("is-sheen")) el.classList.add("is-sheen");
      return u >= 1;
    };

    const tick = (now: number) => {
      if (!start) start = now;
      let t = (now - start) / 1000;
      if (skipTo >= 0 && t < skipTo) {
        start -= (skipTo - t) * 1000;
        t = skipTo;
      }
      if (render(t)) finish();
      else raf = requestAnimationFrame(tick);
    };

    // Tap, click or any key skips straight to the hand-off.
    const skip = () => {
      if (!intro) skipTo = exitAt;
    };
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    // Start once the slices are decoded so the first frames don't stutter.
    const imgs = qa<HTMLImageElement>("img");
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {})));
    const timeout = new Promise((r) => setTimeout(r, 1500));
    let cancelled = false;
    const capture = intro && /[?&]render\b/.test(location.search);
    // When capturing, wait for every slice however long it takes.
    (capture ? ready : Promise.race([ready, timeout])).then(() => {
      if (cancelled) return;
      if (capture) {
        window.__introRender = (t) => void render(t);
        render(0);
        window.__introReady = true;
      } else raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      html.style.overflow = "";
    };
  }, [variant, intro]);

  if (!visible) return null;

  return (
    <div ref={root} className={`gibble-splash${intro ? " is-intro" : ""}`} data-variant={variant ?? undefined} aria-hidden="true">
      <div data-backdrop className="gibble-splash__backdrop">
        <div className="gibble-splash__colour">
          {variant === "white" && (
            <svg className="gibble-splash__waves" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {/* Soft diagonal light bands, as on the app icon. */}
              {[-160, -80, 0, 80, 160, 240].map((o, i) => (
                <path
                  key={o}
                  d={`M${-120 + o} 520 C ${-20 + o} 380, ${60 + o} 330, ${120 + o} 220 S ${260 + o} 40, ${380 + o} -120`}
                  fill="none"
                  stroke={i % 2 ? "#000" : "#fff"}
                  strokeOpacity={i % 2 ? 0.045 : 0.09}
                  strokeWidth="42"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          )}
        </div>
      </div>

      <div data-frame className="gibble-splash__frame">
        <div data-word className="gibble-splash__word">
          {variant && LETTERS.map((L, i) => {
            const box = {
              left: `${(L.x / LOGO_W) * 100}%`,
              top: `${(L.y / LOGO_H) * 100}%`,
              width: `${(L.w / LOGO_W) * 100}%`,
              aspectRatio: `${L.w} / ${L.h}`,
            };
            const colour = `/splash/${L.id}.webp`;
            const src = variant === "white" ? `/splash/${L.id}-white.webp` : colour;
            return (
              <div key={L.id} className="contents">
                {GHOSTS.map((_, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={j} data-ghost={i} src={src} alt="" className="gibble-splash__letter" style={{ ...box, opacity: 0 }} />
                ))}
                <div data-letter className="gibble-splash__letter" style={{ ...box, opacity: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={colour} alt="" width={L.w} height={L.h} className="gibble-splash__face" />
                  {variant === "white" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="gibble-splash__white" />
                  )}
                </div>
              </div>
            );
          })}
          {variant === "colour" && <div className="gibble-splash__sheen" />}
        </div>
      </div>
    </div>
  );
}
