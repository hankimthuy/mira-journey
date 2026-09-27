import Link from "next/link";
import { POC_STAGE, POC_STAGE_ORDER, type Poc } from "@/lib/pocs";
import type { Place } from "@/lib/places";
import { EXPLORE_PATH, exploreStation } from "@/lib/categories";
import PassportStamp, { stampStyle } from "@/components/PassportStamp";
import CardBack from "@/components/cards/CardBack";
import DeskItem, { DESK_LINK } from "@/components/DeskItem";
import WarpCard from "@/components/WarpCard";

/** A toothed wheel: eight teeth round a ring, a hole in the middle. */
function Gear({ className = "", reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`animate-gear-spin ${className}`}
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      <g fill="currentColor">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="20" y="2" width="8" height="10" rx="1.5" transform={`rotate(${i * 45} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="14" fill="currentColor" />
      <circle cx="24" cy="24" r="5" fill="var(--color-cream)" />
    </svg>
  );
}

/**
 * The stations off the post rail as small objects on a desk: a passport page
 * of stamps, a pair of cards under the moon, the workshop's gears, the snap
 * dial. No frames — each object lifts off the page on hover and does its
 * own little thing.
 */
export default function StationCards({ places, pocs }: { places: Place[]; pocs: Poc[] }) {
  const stamped = places.filter((p) => !p.isHome);
  // Newest dated stamps first; undated ones only fill in if needed.
  const shownStamps = [
    ...stamped.filter((p) => p.visitedOn).reverse(),
    ...stamped.filter((p) => !p.visitedOn),
  ].slice(0, 2);
  const stageMeta = POC_STAGE_ORDER.map((stage) => ({
    stage,
    count: pocs.filter((p) => p.stage === stage).length,
  }))
    .filter((s) => s.count > 0)
    .map((s) => `${s.count} ${POC_STAGE[s.stage].label}`)
    .join(" · ");

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      <li className="animate-reveal-settle">
        <Link href={EXPLORE_PATH} className={DESK_LINK}>
          <DeskItem
            tilt={-4}
            object={
              <span className="flex items-center rounded-md border border-forest/15 bg-cream px-2.5 py-2 shadow-[0_6px_14px_-8px_rgb(36_56_42/0.5)]">
                {shownStamps.length > 0 ? (
                  shownStamps.map((place, i) => (
                    <span
                      key={place.slug}
                      className="desk-stamp -mx-1 inline-block"
                      style={{ "--delay": `${i * 110}ms` } as React.CSSProperties}
                    >
                      <span
                        className="inline-block"
                        style={{ transform: `rotate(${stampStyle(place.slug).tilt}deg)` }}
                      >
                        <PassportStamp place={place} size={56} />
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="block h-14 w-24" />
                )}
              </span>
            }
            name={exploreStation.name}
            meta={stamped.length > 0 ? `${stamped.length} con dấu` : "Hộ chiếu"}
            description="Những nơi đã ghé, mỗi nơi một con dấu trong hộ chiếu."
          />
        </Link>
      </li>

      <li className="animate-reveal-settle" style={{ animationDelay: "0.05s" }}>
        <Link href="/aha" className={DESK_LINK}>
          <DeskItem
            tilt={3}
            object={
              <span className="relative flex items-end">
                <svg viewBox="0 0 100 100" className="absolute -right-5 -top-3 h-5 w-5 text-ochre">
                  <path d="M62 12a40 40 0 1 0 26 70A34 34 0 1 1 62 12Z" fill="currentColor" />
                </svg>
                <span className="desk-card-back block h-[78px] w-[52px]">
                  <CardBack />
                </span>
                <span className="desk-card-front -ml-6 block h-[78px] w-[52px]">
                  <CardBack />
                </span>
              </span>
            }
            name="Trạm Aha"
            meta="Tarot · Bài tây"
            description="Rút một lá dưới ánh trăng, để trực giác lên tiếng."
          />
        </Link>
      </li>

      <li className="animate-reveal-settle" style={{ animationDelay: "0.1s" }}>
        <Link href="/products" className={DESK_LINK}>
          <DeskItem
            tilt={-2}
            object={
              <span className="relative flex h-[76px] w-[96px] items-end">
                <Gear className="h-[68px] w-[68px] text-forest" />
                <Gear reverse className="absolute right-0 top-0 h-[40px] w-[40px] text-ochre" />
              </span>
            }
            name="Trạm chế tạo"
            meta={stageMeta || "Xưởng"}
            description="Những câu hỏi không trả lời được bằng chữ, mang vào xưởng."
          />
        </Link>
      </li>

      <li className="animate-reveal-settle" style={{ animationDelay: "0.15s" }}>
        <WarpCard />
      </li>
    </ul>
  );
}
