"use client";

import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp as a homepage card. Plain <a>, like the header trigger:
 * /random is a Route Handler that redirects, and <Link> would prefetch it and
 * replay the cached redirect.
 */
export default function WarpCard({ className = "" }: { className?: string }) {
  const warp = useSnapWarp("");
  return (
    <>
      <a href={warp.href} onClick={warp.start} className={className}>
        <span className="mb-5 h-24 flex items-center justify-center">
          <span className="snap-trigger flex h-14 w-14 items-center justify-center rounded-full [&_svg]:h-8 [&_svg]:w-8">
            <SnapIcon snapping={warp.snapping} />
          </span>
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-ochre">
          Búng tay
        </span>
        <span className="mt-1 block font-serif text-xl font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
          Dịch chuyển ngẫu nhiên
        </span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/70">
          Chưa biết đọc gì? Để cỗ máy quay một ngày bất kỳ và đưa bạn tới đó.
        </span>
      </a>
      {warp.overlay}
    </>
  );
}
