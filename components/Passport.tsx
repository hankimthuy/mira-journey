import Link from "next/link";
import { EXPLORE_PATH } from "@/lib/categories";
import { AUTHOR_FULL_NAME } from "@/lib/seo";
import type { Place } from "@/lib/places";
import PassportStamp, { stampStyle } from "./PassportStamp";

const STAMPS_PER_PAGE = 6;

// Styled with utilities and inline styles only, no hand-written CSS rules.
const PAGE =
  "relative mb-3 min-h-[22rem] rounded-[14px] border px-5 pt-6 pb-7 lg:mb-5 lg:px-8 lg:pt-7 lg:pb-8";
// On wide screens two pages share a spread, with a shadowed fold between them.
const PAGE_LEFT =
  "lg:rounded-[16px_4px_4px_16px] lg:shadow-[inset_-22px_0_26px_-20px_rgb(36_56_42/0.28)]";
const PAGE_RIGHT =
  "lg:rounded-[4px_16px_16px_4px] lg:border-l-0 lg:shadow-[inset_22px_0_26px_-20px_rgb(36_56_42/0.28)]";
const VISA_PAGE = `${PAGE} border-forest/12 bg-paper`;

// Faint guilloche, like security printing on a real passport page.
const PAPER: React.CSSProperties = {
  backgroundImage:
    "repeating-radial-gradient(circle at 30% 40%, transparent 0 14px, rgb(53 81 59 / 0.045) 14px 15px), repeating-linear-gradient(115deg, transparent 0 22px, rgb(201 138 59 / 0.05) 22px 23px)",
};
const COVER: React.CSSProperties = {
  backgroundImage:
    "repeating-radial-gradient(circle at 80% 20%, transparent 0 16px, rgb(232 184 109 / 0.07) 16px 17px)",
};

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
  const pages = chunk(stamps, STAMPS_PER_PAGE);
  const [mrz1, mrz2] = mrz(stamps.length);

  return (
    <div className="grid drop-shadow-[0_18px_30px_rgb(36_56_42/0.14)] lg:grid-cols-2">
      {/* Identity page */}
      <section
        className={`${PAGE} ${PAGE_LEFT} flex flex-col border-ochre-light/25 bg-forest-deep`}
        style={COVER}
        aria-label="Trang thông tin hộ chiếu"
      >
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
          </dl>
        </div>

        <div className="mt-7 max-w-sm">
          <p className="font-serif text-2xl font-semibold italic leading-tight text-ochre-light sm:text-[28px]">
            Đi để trở về
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-cream/85">
            Mỗi con dấu là một trải nghiệm khiến mình lớn thêm một chút. Bấm vào dấu để mở
            album của nơi đó.
          </p>
        </div>

        <div className="mt-auto pt-8 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-cream/40 sm:text-[11px]" aria-hidden="true">
          <p className="truncate">{mrz1}</p>
          <p className="truncate">{mrz2}</p>
        </div>
      </section>

      {pages.map((page, i) => (
        <section
          key={i}
          className={`${VISA_PAGE} ${i % 2 === 0 ? PAGE_RIGHT : PAGE_LEFT}`}
          style={PAPER}
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
                    className="inline-block translate-x-(--dx) translate-y-(--dy) rotate-(--tilt) rounded-xl p-1 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-x-0 hover:-translate-y-0.5 hover:rotate-0 hover:scale-106 focus-visible:translate-x-0 focus-visible:translate-y-0 focus-visible:rotate-0 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60"
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
                  {/* Empty line kept for places without photos so rows stay aligned. */}
                  <span className="mt-1 min-h-4 text-[11px] text-ink/45">
                    {photoCount > 0 && `${photoCount} ảnh`}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {/* Keep the last spread whole: a blank page waiting for the next trip. */}
      {pages.length % 2 === 0 && (
        <section
          className={`${VISA_PAGE} ${PAGE_RIGHT} hidden items-center justify-center lg:flex`}
          style={PAPER}
          aria-hidden="true"
        >
          <p className="font-serif text-lg italic text-forest/35">Trang này dành cho chuyến tiếp theo…</p>
        </section>
      )}
    </div>
  );
}
