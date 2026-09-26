"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// "Búng tay" random jump: snap burst on the button → a portal opens from the
// click point → the date dial spins and lands on the destination's real date
// → navigate. The next page plays the portal closing (WARP_ARRIVE_SCRIPT in
// app/layout.tsx + the html[data-warp] rule in globals.css).

type Destination = { slug: string; title: string; date: string };
type Phase = "idle" | "open" | "warp" | "land";

// Shown like a loading sequence: each step lights up in turn.
const STEPS: { phase: Exclude<Phase, "idle">; label: string }[] = [
  { phase: "open", label: "Mở cổng thời gian" },
  { phase: "warp", label: "Đang di chuyển" },
  { phase: "land", label: "Đã tới nơi" },
];

const ARRIVE_KEY = "warp:arrive"; // read by WARP_ARRIVE_SCRIPT in app/layout.tsx
const OPEN_MS = 500;
const MIN_SPIN_MS = 1100;
const LAND_MS = 650;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function randomDial() {
  return [
    pad(1 + Math.floor(Math.random() * 28)),
    pad(1 + Math.floor(Math.random() * 12)),
    String(1900 + Math.floor(Math.random() * 200)),
  ];
}

function dialFor(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return randomDial();
  return [pad(d.getDate()), pad(d.getMonth() + 1), String(d.getFullYear())];
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSnapWarp(fromSlug: string) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [dial, setDial] = useState(["01", "01", "2000"]);
  const [dest, setDest] = useState<Destination | null>(null);
  const timers = useRef<number[]>([]);

  const fallbackHref = fromSlug ? `/random?from=${encodeURIComponent(fromSlug)}` : "/random";

  useEffect(() => {
    const clear = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    // Coming back via the back button restores this page from bfcache with
    // the overlay still up — reset it.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        clear();
        setPhase("idle");
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      clear();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  // Spin the dial while warping.
  useEffect(() => {
    if (phase !== "open" && phase !== "warp") return;
    const id = window.setInterval(() => setDial(randomDial()), 60);
    return () => window.clearInterval(id);
  }, [phase]);

  async function start(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (phase !== "idle") return;
    if (prefersReducedMotion()) {
      window.location.assign(fallbackHref);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setDest(null);
    setPhase("open");
    const startedAt = Date.now();
    timers.current.push(
      window.setTimeout(() => setPhase((p) => (p === "open" ? "warp" : p)), OPEN_MS)
    );

    let target: Destination | null = null;
    try {
      const res = await fetch(`${fallbackHref}${fromSlug ? "&" : "?"}format=json`, {
        cache: "no-store",
      });
      if (res.ok) target = await res.json();
    } catch {
      // fall through to the plain redirect below
    }

    const wait = Math.max(0, MIN_SPIN_MS - (Date.now() - startedAt));
    timers.current.push(
      window.setTimeout(() => {
        if (target) {
          setDial(dialFor(target.date));
          setDest(target);
        }
        setPhase("land");
        timers.current.push(
          window.setTimeout(() => {
            try {
              sessionStorage.setItem(ARRIVE_KEY, "1");
            } catch {
              // arrival animation is optional
            }
            window.location.assign(target ? `/blog/${target.slug}` : fallbackHref);
          }, LAND_MS)
        );
      }, wait)
    );
  }

  const overlay =
    phase === "idle"
      ? null
      : createPortal(
          <div
            className="warp-overlay"
            data-phase={phase}
            style={{ "--wx": `${origin.x}px`, "--wy": `${origin.y}px` } as React.CSSProperties}
            role="status"
            aria-live="polite"
          >
            <div className="warp-tunnel" aria-hidden="true">
              <span className="warp-ring warp-ring-1" />
              <span className="warp-ring warp-ring-2" />
              <span className="warp-ring warp-ring-3" />
            </div>
            <div className="warp-center">
              <p className="warp-kicker">
                ✦ {STEPS.find((st) => st.phase === phase)?.label}
                {phase === "land" ? "" : "…"}
              </p>
              <p className="warp-dial" aria-hidden="true">
                <span>{dial[0]}</span>
                <i>·</i>
                <span>{dial[1]}</span>
                <i>·</i>
                <span>{dial[2]}</span>
              </p>
              <p className="warp-dest">{dest ? `→ ${dest.title}` : " "}</p>
              <ol className="warp-steps" aria-hidden="true">
                {STEPS.map((st, i) => {
                  const current = STEPS.findIndex((x) => x.phase === phase);
                  const state = i < current || phase === "land" ? "done" : i === current ? "active" : "todo";
                  return (
                    <li key={st.phase} data-state={state}>
                      {st.label}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>,
          document.body
        );

  return { href: fallbackHref, start, snapping: phase !== "idle", overlay };
}

// Snap icon: a four-point spark with a small twin, like the flash of a
// finger snap. The rays around it only fire while `snapping`.
export function SnapIcon({ snapping }: { snapping: boolean }) {
  return (
    <span className="snap-icon" data-snapping={snapping} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M11 2.5c.5 4.6 1.9 6 6.5 6.5-4.6.5-6 1.9-6.5 6.5-.5-4.6-1.9-6-6.5-6.5 4.6-.5 6-1.9 6.5-6.5Z" />
        <path d="M18 14c.25 2.2.8 2.75 3 3-2.2.25-2.75.8-3 3-.25-2.2-.8-2.75-3-3 2.2-.25 2.75-.8 3-3Z" />
      </svg>
      <span className="snap-rays">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </span>
    </span>
  );
}
