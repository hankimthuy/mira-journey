"use client";

import DeskItem, { DESK_LINK } from "@/components/DeskItem";
import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

/**
 * The snap warp as a desk object: the lever, big enough to watch it swing
 * on hover. Plain <a>, like the header trigger: /random is a Route Handler
 * that redirects, and <Link> would prefetch it and replay the cached redirect.
 */
export default function WarpCard() {
  const warp = useSnapWarp("");
  return (
    <>
      <a href={warp.href} onClick={warp.start} className={DESK_LINK}>
        <DeskItem
          tilt={4}
          object={
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-terracotta/35 bg-cream text-terracotta shadow-[0_6px_14px_-8px_rgb(36_56_42/0.5)] [&_svg]:h-11 [&_svg]:w-11">
              <SnapIcon snapping={warp.snapping} />
            </span>
          }
          name="Dịch chuyển ngẫu nhiên"
          meta="Tới đâu cũng được"
          description="Chưa biết đọc gì? Để cỗ máy chọn giúp một bài."
        />
      </a>
      {warp.overlay}
    </>
  );
}
