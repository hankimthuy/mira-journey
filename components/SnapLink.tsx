"use client";

import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp as a labelled button for the sidebar: the time machine's
 * lever, big enough to see it swing. Plain <a>, like the header trigger:
 * /random is a Route Handler that redirects, and <Link> would prefetch it and
 * replay the cached redirect.
 */
export default function SnapLink() {
  const warp = useSnapWarp("");
  return (
    <>
      <a
        href={warp.href}
        onClick={warp.start}
        className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
      >
        <span className="snap-trigger flex h-14 w-14 shrink-0 items-center justify-center rounded-full [&_svg]:h-8 [&_svg]:w-8">
          <SnapIcon snapping={warp.snapping} />
        </span>
        <span>
          <span className="block font-serif text-base font-semibold italic leading-snug text-forest-deep transition-colors group-hover:text-terracotta">
            Dịch chuyển ngẫu nhiên
          </span>
          <span className="block text-xs leading-snug text-ink/65">
            Để cỗ máy chọn một điểm đến bất kỳ cho bạn.
          </span>
        </span>
      </a>
      {warp.overlay}
    </>
  );
}
