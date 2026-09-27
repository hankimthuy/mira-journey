import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { POC_STAGE, POC_STAGE_ORDER, type Poc } from "@/lib/pocs";
import type { Place } from "@/lib/places";
import { EXPLORE_PATH, exploreStation } from "@/lib/categories";
import PassportStamp, { stampStyle } from "@/components/PassportStamp";
import CardBack from "@/components/cards/CardBack";
import { StageDot } from "@/components/ProductRail";
import WarpCard from "@/components/WarpCard";

const CARD =
  "group relative flex flex-col rounded-2xl border p-5 sm:p-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60";
const LIGHT = "border-forest/15 bg-paper/50 hover:border-terracotta/45";

const MAX_POC_NAMES = 5;

/**
 * The stations off the post rail, one card each with a small picture of
 * what is inside: passport stamps, the workshop's stage dots, a moonlit
 * card back, the snap dial.
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
    <ul className="grid gap-5 sm:grid-cols-2">
      <li className="animate-reveal-settle flex">
        <Link href={EXPLORE_PATH} className={`${CARD} ${LIGHT} w-full`}>
          <span className="mb-5 h-24 flex items-center justify-center" aria-hidden="true">
            {shownStamps.map((place, i) => {
              const { tilt } = stampStyle(place.slug);
              return (
                <span
                  key={place.slug}
                  className="-mx-2 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ transform: `rotate(${tilt}deg)`, transitionDelay: `${i * 40}ms` }}
                >
                  <PassportStamp place={place} size={72} />
                </span>
              );
            })}
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-ochre">
            Hộ chiếu{stamped.length > 0 && <span className="text-ink/45"> · {stamped.length} con dấu</span>}
          </span>
          <span className="mt-1 block font-serif text-xl font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
            {exploreStation.name}
          </span>
          <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/70">
            Những nơi đã ghé, mỗi nơi một con dấu trong hộ chiếu, và hành lý mang về.
          </span>
          {latestTrip && (
            <span className="mt-auto block pt-4 text-[13px] text-ink/60">
              Chuyến gần nhất: <span className="font-semibold text-forest-deep">{latestTrip.title}</span>
            </span>
          )}
        </Link>
      </li>

      <li className="animate-reveal-settle flex" style={{ animationDelay: "0.05s" }}>
        <Link href="/products" className={`${CARD} ${LIGHT} w-full`}>
          <span className="mb-5 h-24 flex flex-col justify-center gap-2" aria-hidden="true">
            <span className="flex flex-wrap gap-x-4 gap-y-1.5 font-serif text-[15px] italic text-forest-deep">
              {pocs.slice(0, MAX_POC_NAMES).map((poc) => (
                <span key={poc.id} className="inline-flex items-center gap-1.5">
                  <StageDot stage={poc.stage} className="size-2.5" />
                  {poc.name}
                </span>
              ))}
              {pocs.length > MAX_POC_NAMES && (
                <span className="text-ink/50">+{pocs.length - MAX_POC_NAMES}</span>
              )}
            </span>
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-ochre">
            Xưởng
            {stageCounts.length > 0 && (
              <span className="text-ink/45">
                {" "}· {stageCounts.map((s) => `${s.count} ${POC_STAGE[s.stage].label}`).join(" · ")}
              </span>
            )}
          </span>
          <span className="mt-1 block font-serif text-xl font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
            Trạm chế tạo
          </span>
          <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/70">
            Những câu hỏi không trả lời được bằng chữ, mang vào xưởng: PoC → MVP → Live.
          </span>
        </Link>
      </li>

      <li className="animate-reveal-settle flex" style={{ animationDelay: "0.1s" }}>
        <Link
          href="/aha"
          className={`${CARD} w-full overflow-hidden border-ochre-light/25 bg-[#141b29] hover:border-ochre-light/60`}
        >
          <span className="mb-5 h-24 relative flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="absolute right-1 top-0 h-9 w-9 text-ochre-light">
              <path d="M62 12a40 40 0 1 0 26 70A34 34 0 1 1 62 12Z" fill="currentColor" />
            </svg>
            <span className="absolute left-3 top-3 size-[3px] rounded-full bg-cream/70" />
            <span className="absolute left-1/4 bottom-2 size-[2px] rounded-full bg-cream/50" />
            <span className="absolute right-1/4 bottom-5 size-[2px] rounded-full bg-cream/60" />
            <span className="h-[84px] w-[56px] -rotate-6 transition-transform duration-300 group-hover:-rotate-12">
              <CardBack />
            </span>
            <span className="-ml-4 h-[84px] w-[56px] rotate-6 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-12">
              <CardBack />
            </span>
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-ochre-light">
            Dưới ánh trăng
          </span>
          <span className="mt-1 block font-serif text-xl font-semibold italic text-cream transition-colors group-hover:text-ochre-light">
            Trạm Aha
          </span>
          <span className="mt-1.5 block text-[13px] leading-relaxed text-cream/70">
            Khi lý trí đã nói đủ, rút một lá tarot hay bài tây và để trực giác lên tiếng.
          </span>
        </Link>
      </li>

      <li className="animate-reveal-settle flex" style={{ animationDelay: "0.15s" }}>
        <WarpCard className={`${CARD} ${LIGHT} w-full`} />
      </li>
    </ul>
  );
}
