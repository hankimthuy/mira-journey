"use client";

import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp on the homepage, standing apart from the station cards:
 * Dịch chuyển is a way of moving, not a station. The lever is big enough to
 * watch it swing on hover. Plain <a>, like the header trigger: /random is a
 * Route Handler that redirects, and <Link> would prefetch it and replay the
 * cached redirect.
 */
export default function WarpCard() {
  const warp = useSnapWarp();
  return (
    <>
      <a
        href={warp.href}
        onClick={warp.start}
        className="group flex items-center gap-5 rounded-lg border-t border-dashed border-forest/20 pt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
      >
        <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-2 border-terracotta/35 bg-cream text-terracotta shadow-[0_6px_14px_-8px_rgb(36_56_42/0.5)] [&_svg]:h-11 [&_svg]:w-11">
          <SnapIcon snapping={warp.snapping} />
        </span>
        <span>
          <span className="block font-serif text-2xl italic text-forest-deep transition-colors group-hover:text-terracotta">
            Dịch chuyển ngẫu nhiên
          </span>
          <span className="mt-1 block text-sm text-ink/70">
            Để cỗ máy chọn một điểm đến bất kỳ cho bạn.
          </span>
        </span>
      </a>
      {warp.overlay}
    </>
  );
}
