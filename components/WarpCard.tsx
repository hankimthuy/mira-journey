"use client";

import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp as a homepage tile. Plain <a>, like the header trigger:
 * /random is a Route Handler that redirects, and <Link> would prefetch it and
 * replay the cached redirect.
 */
export default function WarpCard({ className = "" }: { className?: string }) {
  const warp = useSnapWarp("");
  return (
    <>
      <a
        href={warp.href}
        onClick={warp.start}
        className={className}
        style={{ "--bento-tilt": "-0.8deg" } as React.CSSProperties}
      >
        <span
          className="bento-arrow absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-forest-deep/10 text-lg"
          aria-hidden="true"
        >
          →
        </span>
        <span className="mb-4 flex h-24 items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-terracotta shadow-[0_8px_18px_-8px_rgb(0_0_0/0.35)] [&_svg]:h-11 [&_svg]:w-11">
            <SnapIcon snapping={warp.snapping} />
          </span>
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-widest text-forest-deep/70">
          Búng tay
        </span>
        <span className="mt-1 block font-serif text-2xl font-semibold italic">
          Dịch chuyển ngẫu nhiên
        </span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-forest-deep/75">
          Chưa biết đọc gì? Để cỗ máy chọn giúp một bài.
        </span>
      </a>
      {warp.overlay}
    </>
  );
}
