"use client";

import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp as an inline button with a label. Plain <a>, like the header
 * trigger: /random is a Route Handler that redirects, and <Link> would
 * prefetch it and replay the cached redirect.
 */
export default function SnapLink({ children }: { children: React.ReactNode }) {
  const warp = useSnapWarp("");
  return (
    <>
      <a
        href={warp.href}
        onClick={warp.start}
        className="group inline-flex items-center gap-2.5 font-serif text-[15px] font-semibold italic text-forest-deep hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60"
      >
        <span className="snap-trigger flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
          <SnapIcon snapping={warp.snapping} />
        </span>
        {children}
      </a>
      {warp.overlay}
    </>
  );
}
