"use client";

import { useSnapWarp } from "@/components/SnapWarp";

/** One finger as a line-art capsule: a dark outline stroke under a cream one. */
function Finger({ d, className }: { d: string; className?: string }) {
  return (
    <g className={className}>
      <path d={d} stroke="var(--color-forest-deep)" strokeWidth={10} strokeLinecap="round" />
      <path d={d} stroke="var(--color-cream)" strokeWidth={6.2} strokeLinecap="round" />
    </g>
  );
}

/**
 * A hand caught just before the snap, seen from the side: the middle finger
 * arcs over to press the thumb tip, sparks wait at the fingertips. On hover
 * the finger snaps down onto the palm and the sparks burst; while the warp
 * runs they stay lit.
 */
function SnappingHand() {
  return (
    <svg viewBox="0 0 64 64" width={64} height={64} fill="none" className="snap-hand shrink-0 overflow-visible" aria-hidden="true">
      <g className="snap-hand-sparks" stroke="var(--color-ochre)" strokeWidth={2.2} strokeLinecap="round">
        <path d="M13 9 9 4" />
        <path d="M20 6 21 0" />
        <path d="M8 15 2 13" />
        <path d="M27 9 31 5" />
        <path d="M9 22 3 24" />
      </g>
      {/* Palm and the two curled fingers. */}
      <path
        d="M24 34c0-8 6-12 14-12s14 5 14 13v6c0 8-6 13-14 13s-14-5-14-13z"
        fill="var(--color-cream)"
        stroke="var(--color-forest-deep)"
        strokeWidth={2}
      />
      <path d="M44 33c3 0 5 2 5 4M44 41c3 0 5 2 5 4" stroke="var(--color-forest-deep)" strokeWidth={1.6} strokeLinecap="round" opacity={0.55} />
      <Finger className="snap-hand-thumb" d="M28 38 L17 15" />
      <Finger className="snap-hand-middle" d="M40 25 Q36 9 19 13" />
      <rect x={30} y={51} width={20} height={9} rx={2.5} fill="var(--color-terracotta)" transform="rotate(-8 40 55)" />
    </svg>
  );
}

/**
 * The snap warp as an illustrated button for the sidebar. Plain <a>, like the
 * header trigger: /random is a Route Handler that redirects, and <Link> would
 * prefetch it and replay the cached redirect.
 */
export default function SnapLink() {
  const warp = useSnapWarp("");
  return (
    <>
      <a
        href={warp.href}
        onClick={warp.start}
        data-snapping={warp.snapping}
        className="snap-hand-link group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
      >
        <SnappingHand />
        <span>
          <span className="block font-serif text-lg font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
            Búng tay
          </span>
          <span className="block text-xs leading-snug text-ink/65">
            tới đâu cũng được — cỗ máy chọn giúp bạn một bài.
          </span>
        </span>
      </a>
      {warp.overlay}
    </>
  );
}
