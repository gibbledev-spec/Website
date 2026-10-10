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
 */
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
  markIn: 0.08, // G zooms down onto the stage
  bgIn: 0.4, // backdrop fades from black to colour
  bgDur: 0.55,
  lettersIn: 0.62, // first flying letter
  stagger: 0.095,
  recentre: [0.55, 1.5], // word slides from G-centred to word-centred
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
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const easeInOutQuint = (x: number) => (x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2);
const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;

/** Displacement of an underdamped spring released from 1; settles to 0 with a small overshoot. */
function spring(t: number, zeta: number, omega: number) {
  if (t <= 0) return 1;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
}

/** Pose of a flying letter `tau` seconds after it launches. `dist` is its travel in px. */
function flight(tau: number, dist: number) {
  const r = spring(tau, 0.7, 11); // 1 → 0, dips slightly below 0 = lands a touch past its slot
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

export function Splash() {
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("splash-done") || !root.current) {
      setVisible(false);
      return;
    }

    const el = root.current;
    const q = <E extends Element>(s: string) => el.querySelector<E>(s)!;
    const qa = <E extends Element>(s: string) => Array.from(el.querySelectorAll<E>(s));
    const backdrop = q<HTMLElement>("[data-backdrop]");
    const frame = q<HTMLElement>("[data-frame]");
    const word = q<HTMLElement>("[data-word]");
    const letters = qa<HTMLElement>("[data-letter]");
    const ghosts = letters.map((_, i) => qa<HTMLElement>(`[data-ghost="${i}"]`));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const exitAt = reduced ? REDUCED.exit : T.exit;
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

      if (reduced) {
        const a = smooth(0, REDUCED.fadeIn, t) * (1 - fade);
        backdrop.style.opacity = String(1 - fade);
        el.style.setProperty("--bg", String(smooth(0, REDUCED.fadeIn, t)));
        el.style.setProperty("--refl", "1");
        word.style.opacity = String(a);
        return u >= 1;
      }

      // Backdrop: black → colour, then away.
      el.style.setProperty("--bg", String(smooth(T.bgIn, T.bgIn + T.bgDur, t)));
      el.style.setProperty("--refl", String(smooth(T.bgIn + 0.1, T.bgIn + T.bgDur + 0.2, t) * (1 - smooth(0, 0.3, u))));
      backdrop.style.opacity = String(1 - fade);

      // The group starts with G in the centre of the screen and drifts to centre the full word.
      const gCentre = (LETTERS[0].x + LETTERS[0].w / 2) * k;
      const offset = (W / 2 - gCentre) * (1 - easeInOutCubic(smooth(T.recentre[0], T.recentre[1], t) ** 0.9));
      const m = exitFrom ?? { dx: 0, dy: 0, scale: 1 };
      word.style.transform = `translate3d(${(offset + m.dx * e).toFixed(2)}px, ${(m.dy * e).toFixed(2)}px, 0) scale(${lerp(1, m.scale, e).toFixed(4)})`;

      // G: arrives large and soft, springs down to size with a slight undershoot.
      const tg = t - T.markIn;
      const g = letters[0];
      const gs = 1 + 1.4 * spring(tg, 0.62, 9.5);
      g.style.opacity = String(smooth(0, 0.22, tg));
      g.style.transform = `scale(${gs.toFixed(4)})`;
      const blur = 14 * (1 - easeOutCubic(clamp(tg / 0.42)));
      g.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";

      // i b b l e: fly in from the right edge, staggered.
      for (let i = 1; i < LETTERS.length; i++) {
        const L = LETTERS[i];
        const tau = t - (T.lettersIn + (i - 1) * T.stagger);
        const dist = Math.max(vw * 0.98 - (frameLeft + offset + L.x * k), W * 0.6);
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

      if (t >= T.sheen && !el.classList.contains("is-sheen")) el.classList.add("is-sheen");
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
      skipTo = exitAt;
    };
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    // Start once the slices are decoded so the first frames don't stutter.
    const imgs = qa<HTMLImageElement>("img");
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {})));
    const timeout = new Promise((r) => setTimeout(r, 1500));
    let cancelled = false;
    Promise.race([ready, timeout]).then(() => {
      if (!cancelled) raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      html.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className="gibble-splash" aria-hidden="true">
      <div data-backdrop className="gibble-splash__backdrop">
        <div className="gibble-splash__colour" />
      </div>

      <div data-frame className="gibble-splash__frame">
        <div data-word className="gibble-splash__word">
          {LETTERS.map((L, i) => {
            const box = {
              left: `${(L.x / LOGO_W) * 100}%`,
              top: `${(L.y / LOGO_H) * 100}%`,
              width: `${(L.w / LOGO_W) * 100}%`,
              aspectRatio: `${L.w} / ${L.h}`,
            };
            const src = `/splash/${L.id}.webp`;
            return (
              <div key={L.id} className="contents">
                {i > 0 &&
                  GHOSTS.map((_, j) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={j} data-ghost={i} src={src} alt="" className="gibble-splash__letter" style={{ ...box, opacity: 0 }} />
                  ))}
                <div data-letter className="gibble-splash__letter" style={{ ...box, opacity: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" width={L.w} height={L.h} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="gibble-splash__reflection" />
                </div>
              </div>
            );
          })}
          <div className="gibble-splash__sheen" />
        </div>
      </div>
    </div>
  );
}
