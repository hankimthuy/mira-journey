import Link from "next/link";
import { EXPLORE_PATH } from "@/lib/categories";
import { AUTHOR_FULL_NAME } from "@/lib/seo";
import { isAbroad, type Place } from "@/lib/places";
import PassportStamp, { stampStyle } from "./PassportStamp";

const STAMPS_PER_PAGE = 6;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

/** Machine-readable zone at the foot of the identity page — decoration only. */
function mrz(stamps: number) {
  const line1 = "P<VNMMIRA<<JOURNEY<<<<<<<<<<<<<<<<<<<<<<<<<";
  const line2 = `HKT${String(stamps).padStart(4, "0")}<<VNM<<HONGNGU<<<<<<<<<<<<<<<<<`;
  return [line1.slice(0, 40), line2.slice(0, 40)];
}

/**
 * Trạm khám phá as a passport: an identity page issued in the hometown,
 * then visa pages of ink stamps, two pages to a spread on wide screens.
 * Every stamp opens that place's photo album.
 */
export default function Passport({ places }: { places: Place[] }) {
  const home = places.find((p) => p.isHome);
  const stamps = places.filter((p) => !p.isHome);
  const abroad = stamps.filter(isAbroad).length;
  const pages = chunk(stamps, STAMPS_PER_PAGE);
  const [mrz1, mrz2] = mrz(stamps.length);

  return (
    <div className="passport grid lg:grid-cols-2">
      {/* Identity page */}
      <section className="passport-page passport-page--left passport-id flex flex-col" aria-label="Trang thông tin hộ chiếu">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-ochre-light/90">
          <span>Hộ chiếu · Passport</span>
          <span>Mira Journey</span>
        </div>

        <div className="mt-6 flex items-start gap-5">
          <svg viewBox="0 0 64 64" className="size-16 shrink-0 text-ochre-light" aria-hidden="true">
            <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
            <path d="M32 8 L36 32 L32 56 L28 32 Z" fill="currentColor" opacity="0.9" />
            <path d="M8 32 L32 28 L56 32 L32 36 Z" fill="currentColor" opacity="0.45" />
            <circle cx="32" cy="32" r="2.5" fill="#24382a" />
          </svg>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13px]">
            <dt className="text-cream/55">Người mang</dt>
            <dd className="font-serif italic text-cream">{AUTHOR_FULL_NAME}</dd>
            <dt className="text-cream/55">Nơi cấp</dt>
            <dd className="text-cream">
              {home ? (
                <Link href={`${EXPLORE_PATH}/${home.slug}`} className="underline decoration-ochre-light/50 underline-offset-4 hover:text-ochre-light">
                  {home.name}
                  {home.region && `, ${home.region}`}
                </Link>
              ) : (
                "Việt Nam"
              )}
            </dd>
            <dt className="text-cream/55">Con dấu</dt>
            <dd className="text-cream tabular-nums">
              {stamps.length} nơi · {stamps.length - abroad} trong nước · {abroad} nước ngoài
            </dd>
          </dl>
        </div>

        <p className="mt-6 max-w-sm font-serif text-lg italic leading-snug text-cream/90">
          Mỗi con dấu là một lần rời khỏi nhà. Bấm vào dấu để mở album của nơi đó.
        </p>

        <div className="mt-auto pt-8 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-cream/40 sm:text-[11px]" aria-hidden="true">
          <p className="truncate">{mrz1}</p>
          <p className="truncate">{mrz2}</p>
        </div>
      </section>

      {pages.map((page, i) => (
        <section
          key={i}
          className={`passport-page ${i % 2 === 0 ? "passport-page--right" : "passport-page--left"}`}
          aria-label={`Trang thị thực ${i + 1}`}
        >
          <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/45">
            <span>Thị thực · Visas</span>
            <span className="tabular-nums">{String(i + 2).padStart(2, "0")}</span>
          </div>
          <ol className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3">
            {page.map((place) => {
              const { tilt, dx, dy } = stampStyle(place.slug);
              const photoCount = new Set([place.coverUrl, ...place.photos].filter(Boolean)).size;
              return (
                <li key={place.id} className="flex flex-col items-center">
                  <Link
                    href={`${EXPLORE_PATH}/${place.slug}`}
                    className="passport-stamp rounded-xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60"
                    style={
                      {
                        "--tilt": `${tilt}deg`,
                        "--dx": `${dx}px`,
                        "--dy": `${dy}px`,
                      } as React.CSSProperties
                    }
                  >
                    <PassportStamp place={place} size={112} />
                  </Link>
                  <span className="mt-1 text-[11px] text-ink/45">
                    {photoCount > 0 ? `${photoCount} ảnh` : "chưa rửa ảnh"}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {/* Keep the last spread whole: a blank page waiting for the next trip. */}
      {pages.length % 2 === 0 && (
        <section className="passport-page passport-page--right hidden items-center justify-center lg:flex" aria-hidden="true">
          <p className="font-serif text-lg italic text-forest/35">Trang này dành cho chuyến tiếp theo…</p>
        </section>
      )}
    </div>
  );
}
