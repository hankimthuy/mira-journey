import Link from "next/link";
import type { Place } from "@/lib/places";
import { EXPLORE_PATH, exploreStation } from "@/lib/categories";
import PassportStamp, { stampStyle } from "@/components/PassportStamp";
import CardBack from "@/components/cards/CardBack";
import DeskItem, { DESK_LINK } from "@/components/DeskItem";

/** A clay pot with its soil, centred on `cx`. */
function Pot({ cx }: { cx: number }) {
  return (
    <g>
      <path d={`M${cx - 12} 58 L${cx + 12} 58 L${cx + 9} 78 L${cx - 9} 78 Z`} fill="#9c4a31" />
      <rect x={cx - 14} y={52} width={28} height={7} rx={2} fill="var(--color-terracotta)" />
      <ellipse cx={cx} cy={52.5} rx={11} ry={2} fill="var(--color-ink)" opacity={0.55} />
    </g>
  );
}

/**
 * Trạm chế tạo as three pots: a seed (PoC), a sprout (MVP), a plant in
 * flower (Live) — a project growing through its stages. Each plant grows a
 * little on hover, one after another.
 */
function GrowingPots({ width = 132 }: { width?: number }) {
  const leaf = "var(--color-forest)";
  return (
    <svg viewBox="0 0 120 80" width={width} height={(width * 2) / 3} className="overflow-visible">
      <Pot cx={20} />
      <Pot cx={60} />
      <Pot cx={100} />
      <g className="desk-plant" style={{ "--delay": "0ms" } as React.CSSProperties}>
        <ellipse cx={20} cy={48.5} rx={4.5} ry={3} fill="var(--color-ochre)" transform="rotate(-20 20 48.5)" />
      </g>
      <g className="desk-plant" style={{ "--delay": "120ms" } as React.CSSProperties}>
        <path d="M60 52V34" stroke={leaf} strokeWidth={2.4} strokeLinecap="round" />
        <path d="M60 43C53 42 50 36 51 32C57 33 60 37 60 43Z" fill={leaf} />
        <path d="M60 39C67 38 70 32 69 28C63 29 60 33 60 39Z" fill={leaf} />
      </g>
      <g className="desk-plant" style={{ "--delay": "240ms" } as React.CSSProperties}>
        <path d="M100 52V18" stroke={leaf} strokeWidth={2.4} strokeLinecap="round" />
        <path d="M100 44C93 43 90 37 91 33C97 34 100 38 100 44Z" fill={leaf} />
        <path d="M100 34C107 33 110 27 109 23C103 24 100 28 100 34Z" fill={leaf} />
        {Array.from({ length: 5 }, (_, i) => (
          <circle
            key={i}
            cx={100 + 5 * Math.sin((i * 2 * Math.PI) / 5)}
            cy={14 - 5 * Math.cos((i * 2 * Math.PI) / 5)}
            r={4.6}
            fill="var(--color-ochre-light)"
          />
        ))}
        <circle cx={100} cy={14} r={3.4} fill="var(--color-terracotta)" />
      </g>
    </svg>
  );
}

/**
 * The stations off the post rail as small objects on a desk: a passport page
 * of stamps, the workshop's pots in the middle, a pair of cards under the
 * moon. No frames — each object lifts off the page on hover and does its
 * own little thing.
 */
export default function StationCards({ places }: { places: Place[] }) {
  const stamped = places.filter((p) => !p.isHome);
  // Newest dated stamps first; undated ones only fill in if needed.
  const shownStamps = [
    ...stamped.filter((p) => p.visitedOn).reverse(),
    ...stamped.filter((p) => !p.visitedOn),
  ].slice(0, 2);

  return (
    <ul className="grid grid-cols-1 items-end gap-x-6 gap-y-12 sm:grid-cols-[1fr_1.35fr_1fr]">
      <li className="animate-reveal-settle">
        <Link href={EXPLORE_PATH} className={DESK_LINK}>
          <DeskItem
            tilt={-4}
            object={
              <span className="flex items-center">
                {shownStamps.length > 0 ? (
                  shownStamps.map((place, i) => (
                    <span
                      key={place.slug}
                      className="desk-stamp -mx-2 inline-block"
                      style={{ "--delay": `${i * 110}ms` } as React.CSSProperties}
                    >
                      <span
                        className="inline-block"
                        style={{ transform: `rotate(${stampStyle(place.slug).tilt}deg)` }}
                      >
                        <PassportStamp place={place} size={68} />
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

      {/* The workshop is the station that matters most: it sits in the middle,
          bigger than its neighbours, and comes first on phones. */}
      <li className="order-first animate-reveal-settle sm:order-none">
        <Link href="/products" className={DESK_LINK}>
          <DeskItem
            tilt={0}
            featured
            object={<GrowingPots width={190} />}
            name="Trạm chế tạo"
            meta={<span className="normal-case tracking-wide">PoC → MVP → Live</span>}
            description="Những câu hỏi không trả lời được bằng chữ, mang vào xưởng."
          />
        </Link>
      </li>
      <li className="animate-reveal-settle" style={{ animationDelay: "0.1s" }}>
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

    </ul>
  );
}
