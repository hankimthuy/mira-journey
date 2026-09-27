import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { POC_STAGE, POC_STAGE_ORDER, type Poc } from "@/lib/pocs";
import type { Place } from "@/lib/places";
import { EXPLORE_PATH, exploreStation } from "@/lib/categories";
import PassportStamp, { stampStyle } from "@/components/PassportStamp";
import CardBack from "@/components/cards/CardBack";
import { StageDot } from "@/components/ProductRail";
import WarpCard from "@/components/WarpCard";

export const BENTO_TILE =
  "bento-tile group relative flex overflow-hidden rounded-3xl p-5 sm:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60";

const MAX_POC_NAMES = 6;

function BentoArrow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`bento-arrow absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-lg ${className}`}
      aria-hidden="true"
    >
      →
    </span>
  );
}

function GearIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" />
      </g>
    </svg>
  );
}

/**
 * The stations off the post rail as a bento of colour blocks, each with a
 * small picture of what is inside that moves on hover: stamps thump, the
 * gear spins up, a card flips off the pair, the snap dial races.
 */
export default function StationCards({
  places,
  pocs,
  latestTrip,
}: {
  places: Place[];
  pocs: Poc[];
  latestTrip?: PostMeta;
}) {
  const stamped = places.filter((p) => !p.isHome);
  // Newest dated stamps first; undated ones only fill in if needed.
  const shownStamps = [
    ...stamped.filter((p) => p.visitedOn).reverse(),
    ...stamped.filter((p) => !p.visitedOn),
  ].slice(0, 3);
  const stageCounts = POC_STAGE_ORDER.map((stage) => ({
    stage,
    count: pocs.filter((p) => p.stage === stage).length,
  })).filter((s) => s.count > 0);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Trạm khám phá — wide, terracotta, a passport page of stamps. */}
      <li className="animate-reveal-settle flex sm:col-span-2">
        <Link
          href={EXPLORE_PATH}
          className={`${BENTO_TILE} w-full flex-col gap-5 bg-terracotta text-cream sm:flex-row sm:items-center`}
        >
          <BentoArrow className="bg-cream/15" />
          <span className="flex-1 pr-10">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-cream/75">
              Hộ chiếu{stamped.length > 0 && ` · ${stamped.length} con dấu`}
            </span>
            <span className="mt-1 block font-serif text-2xl font-semibold italic">
              {exploreStation.name}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-cream/85">
              Những nơi đã ghé, mỗi nơi một con dấu trong hộ chiếu, và hành lý mang về.
            </span>
            {latestTrip && (
              <span className="mt-3 block text-[13px] text-cream/75">
                Chuyến gần nhất: <span className="font-semibold text-cream">{latestTrip.title}</span>
              </span>
            )}
          </span>
          {shownStamps.length > 0 && (
            <span
              className="flex shrink-0 -rotate-2 items-center justify-center self-center rounded-xl bg-cream px-4 py-3 shadow-[0_8px_18px_-8px_rgb(0_0_0/0.4)]"
              aria-hidden="true"
            >
              {shownStamps.map((place, i) => (
                <span
                  key={place.slug}
                  className="bento-stamp -mx-1.5 inline-block"
                  style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <span
                    className="inline-block"
                    style={{ transform: `rotate(${stampStyle(place.slug).tilt}deg)` }}
                  >
                    <PassportStamp place={place} size={64} />
                  </span>
                </span>
              ))}
            </span>
          )}
        </Link>
      </li>

      {/* Trạm Aha — night blue, a pair of card backs under the moon. */}
      <li className="animate-reveal-settle flex" style={{ animationDelay: "0.05s" }}>
        <Link
          href="/aha"
          className={`${BENTO_TILE} w-full flex-col bg-[#141b29] text-cream`}
          style={{ "--bento-tilt": "0.8deg" } as React.CSSProperties}
        >
          <BentoArrow className="bg-ochre-light/15 text-ochre-light" />
          <span className="relative mb-4 flex h-24 items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="absolute left-0 top-0 h-7 w-7 text-ochre-light">
              <path d="M62 12a40 40 0 1 0 26 70A34 34 0 1 1 62 12Z" fill="currentColor" />
            </svg>
            <span className="animate-twinkle-soft absolute right-6 bottom-2 size-[3px] rounded-full bg-cream/80" />
            <span className="absolute left-10 bottom-4 size-[2px] rounded-full bg-cream/60" />
            <span className="bento-card-back h-[84px] w-[56px] -rotate-6">
              <CardBack />
            </span>
            <span className="bento-card-front -ml-5 h-[84px] w-[56px] rotate-6">
              <CardBack />
            </span>
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-widest text-ochre-light">
            Dưới ánh trăng
          </span>
          <span className="mt-1 block font-serif text-2xl font-semibold italic">Trạm Aha</span>
          <span className="mt-1.5 block text-[13px] leading-relaxed text-cream/70">
            Rút một lá bài, để trực giác lên tiếng.
          </span>
        </Link>
      </li>

      {/* Búng tay — ochre, the snap dial big enough to spin. */}
      <li className="animate-reveal-settle flex" style={{ animationDelay: "0.1s" }}>
        <WarpCard className={`${BENTO_TILE} w-full flex-col bg-ochre-light text-forest-deep`} />
      </li>

      {/* Trạm chế tạo — wide, forest green, projects as chips over a gear. */}
      <li className="animate-reveal-settle flex sm:col-span-2" style={{ animationDelay: "0.15s" }}>
        <Link
          href="/products"
          className={`${BENTO_TILE} w-full flex-col bg-forest-deep text-cream`}
          style={{ "--bento-tilt": "0.6deg" } as React.CSSProperties}
        >
          <BentoArrow className="bg-cream/15" />
          <GearIcon className="animate-gear-spin pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 text-cream/10" />
          <span className="block pr-10 text-[11px] font-bold uppercase tracking-widest text-ochre-light">
            Xưởng
            {stageCounts.length > 0 && (
              <span className="text-cream/60">
                {" "}· {stageCounts.map((s) => `${s.count} ${POC_STAGE[s.stage].label}`).join(" · ")}
              </span>
            )}
          </span>
          <span className="mt-1 block font-serif text-2xl font-semibold italic">Trạm chế tạo</span>
          <span className="mt-1.5 block max-w-md text-[13px] leading-relaxed text-cream/75">
            Những câu hỏi không trả lời được bằng chữ, mang vào xưởng: PoC → MVP → Live.
          </span>
          {pocs.length > 0 && (
            <span className="relative mt-4 flex flex-wrap gap-2" aria-hidden="true">
              {pocs.slice(0, MAX_POC_NAMES).map((poc) => (
                <span
                  key={poc.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 font-serif text-sm italic text-forest-deep"
                >
                  <StageDot stage={poc.stage} className="size-2.5" />
                  {poc.name}
                </span>
              ))}
              {pocs.length > MAX_POC_NAMES && (
                <span className="inline-flex items-center rounded-full border border-cream/30 px-3 py-1 text-sm text-cream/80">
                  +{pocs.length - MAX_POC_NAMES}
                </span>
              )}
            </span>
          )}
        </Link>
      </li>
    </ul>
  );
}
