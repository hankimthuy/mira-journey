"use client";

import { useEffect, useState } from "react";

// A brass cog drawn as one polygon: `TEETH` flat-topped teeth around a hub.
const TEETH = 8;
const GEAR_PATH = (() => {
  const cx = 24;
  const cy = 24;
  const outer = 13;
  const inner = 10;
  const step = (Math.PI * 2) / TEETH;
  const point = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  const parts: string[] = [];
  for (let i = 0; i < TEETH; i++) {
    const a = i * step;
    parts.push(
      point(inner, a),
      point(outer, a + step * 0.12),
      point(outer, a + step * 0.38),
      point(inner, a + step * 0.5)
    );
  }
  return `M${parts.join(" L")} Z`;
})();

const RING_R = 21;
const RING_LENGTH = 2 * Math.PI * RING_R;
const TICKS = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);

/**
 * "Rewind the machine": a cog that turns as you scroll, inside a gauge ring
 * that fills with progress. Clicking it scrolls back to the top, so the cog
 * visibly winds itself back.
 *
 * Watches the window by default; pass `containerId` to watch a scrolling
 * element instead (e.g. a popover that scrolls on its own, above the page).
 */
export default function BackToTop({ containerId }: { containerId?: string }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerId ? document.getElementById(containerId) : null;
    if (containerId && !el) return;
    const target: HTMLElement | Window = el ?? window;
    let frame = 0;

    function update() {
      frame = 0;
      const top = el ? el.scrollTop : window.scrollY;
      const view = el ? el.clientHeight : window.innerHeight;
      const height = el ? el.scrollHeight : document.documentElement.scrollHeight;
      const scrollable = height - view;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0);
      setVisible(top > view * 0.6);
    }

    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    target.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerId]);

  function rewind() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    const el = containerId ? document.getElementById(containerId) : null;
    (el ?? window).scrollTo({ top: 0, behavior });
  }

  return (
    <button
      type="button"
      onClick={rewind}
      aria-label="Quay về đầu trang"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-5 right-4 z-40 size-12 cursor-pointer rounded-full border border-forest/20 bg-cream text-forest-deep shadow-[0_8px_20px_rgba(36,56,42,0.18)] transition-[opacity,transform,border-color] duration-300 hover:border-terracotta/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60 motion-reduce:transition-none sm:bottom-8 sm:right-8 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* tooltip — hover devices only */}
      <span
        className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-forest-deep px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:hover)]:block"
        aria-hidden="true"
      >
        Quay về đầu
      </span>

      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" aria-hidden="true">
        {/* dial ticks */}
        {TICKS.map((deg) => (
          <line
            key={deg}
            x1="24"
            y1="5.2"
            x2="24"
            y2="6.6"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        {/* progress gauge */}
        <circle
          cx="24"
          cy="24"
          r={RING_R}
          fill="none"
          stroke="var(--color-ochre)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - progress)}
          transform="rotate(-90 24 24)"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
        {/* cog — its turn is tied to how far down you are */}
        <g
          style={{
            transform: `rotate(${progress * 540}deg)`,
            transformOrigin: "24px 24px",
          }}
          className="transition-transform duration-150 ease-out group-hover:[&>path]:fill-terracotta"
        >
          <path d={GEAR_PATH} fill="var(--color-forest-deep)" className="transition-colors duration-200" />
          <circle cx="24" cy="24" r="5.2" fill="var(--color-cream)" />
          <circle cx="24" cy="24" r="2" fill="var(--color-terracotta)" />
          <line x1="24" y1="15.6" x2="24" y2="18.2" stroke="var(--color-cream)" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
    </button>
  );
}
