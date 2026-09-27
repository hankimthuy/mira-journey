import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPLORE_PATH, exploreStation } from "@/lib/categories";
import {
  formatVisited,
  getAllPlaces,
  getPlaceBySlug,
  isAbroad,
  placeGallery,
  slugHash,
} from "@/lib/places";
import PassportStamp from "@/components/PassportStamp";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getAllPlaces()).map((place) => ({ slug: place.slug }));
}

export async function generateMetadata(
  props: PageProps<"/explore/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const place = await getPlaceBySlug(slug);
  if (!place) return {};
  const description =
    place.note || `${place.name} — một con dấu trong hộ chiếu của ${exploreStation.name}.`;
  const cover = placeGallery(place)[0];
  return {
    title: `${place.name} · ${exploreStation.name}`,
    description,
    alternates: { canonical: `${EXPLORE_PATH}/${place.slug}` },
    openGraph: cover ? { images: [cover] } : undefined,
  };
}

// A polaroid taped to the page. Utilities only, no hand-written CSS rules.
const POLAROID =
  "relative mt-3 mb-6 inline-block break-inside-avoid align-top rotate-(--tilt) bg-[#fffdf8] p-2.5 pb-10 shadow-[0_10px_22px_-12px_rgb(36_56_42/0.45),0_1px_2px_rgb(36_56_42/0.12)] transition-transform duration-300 hover:rotate-0 hover:scale-102 motion-reduce:transition-none";

/** The strip of washi tape holding a polaroid up. */
function Tape() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2.5 left-1/2 z-10 h-[22px] w-[84px] -translate-x-1/2 bg-ochre-light/55 shadow-[0_1px_2px_rgb(36_56_42/0.12)]"
      style={{ rotate: "calc(var(--tilt) * -1.5)" }}
    />
  );
}

/** Slight tilt per photo, stable across renders. */
function tilt(url: string): string {
  return `${(slugHash(url) % 7) - 3}deg`;
}

export default async function PlacePage(props: PageProps<"/explore/[slug]">) {
  const { slug } = await props.params;
  const [place, places] = await Promise.all([getPlaceBySlug(slug), getAllPlaces()]);
  if (!place) notFound();

  const gallery = placeGallery(place);
  // Walk the passport in its own order, home page first.
  const ordered = [...places.filter((p) => p.isHome), ...places.filter((p) => !p.isHome)];
  const index = ordered.findIndex((p) => p.slug === place.slug);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
  const where = [place.region, isAbroad(place) ? place.country : ""].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link href={EXPLORE_PATH} className="text-sm text-forest/70 hover:text-terracotta">
        ← Về cuốn hộ chiếu
      </Link>

      <header className="animate-reveal-focus mt-6 mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="shrink-0 self-center sm:self-auto" style={{ transform: "rotate(-4deg)" }}>
          <PassportStamp place={place} size={170} />
        </div>
        <div className="max-w-xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-ochre">
            {place.isHome ? "Quê hương · nơi cấp hộ chiếu" : isAbroad(place) ? "Nước ngoài" : "Trong nước"}
            {place.visitedOn && ` · ${formatVisited(place).replace("·", "/")}`}
          </p>
          <h1 className="font-serif text-3xl font-semibold italic leading-tight text-forest-deep sm:text-[40px]">
            {place.name}
          </h1>
          {where && <p className="mt-1 text-ink/60">{where}</p>}
          {place.note && (
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink/85">
              {place.note}
            </p>
          )}
        </div>
      </header>

      {gallery.length > 0 ? (
        <div className="columns-2 gap-5 pt-3 sm:columns-3">
          {gallery.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${POLAROID} w-full`}
              style={{ "--tilt": tilt(url) } as React.CSSProperties}
            >
              <Tape />
              <Image
                src={url}
                alt={`${place.name} — ảnh ${i + 1}`}
                width={640}
                height={800}
                sizes="(min-width: 640px) 320px, 50vw"
                className="h-auto w-full"
                priority={i < 3}
              />
              <span className="absolute inset-x-0 bottom-2.5 text-center font-serif text-sm italic text-ink/60">
                {place.name}
                {place.visitedOn && ` · ${formatVisited(place)}`}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 pt-3 sm:justify-start">
          {[-3, 2].map((deg, i) => (
            <div
              key={deg}
              className={`${POLAROID} w-56`}
              style={{ "--tilt": `${deg}deg` } as React.CSSProperties}
            >
              <Tape />
              <div className="flex aspect-[4/5] items-center justify-center bg-forest-deep/90 px-4 text-center font-serif italic text-cream/70">
                {i === 0 ? "Ảnh đang được rửa…" : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      <nav className="mt-14 flex items-center justify-between gap-4 border-t border-dashed border-forest/20 pt-5 text-sm">
        {prev ? (
          <Link href={`${EXPLORE_PATH}/${prev.slug}`} className="text-forest/80 hover:text-terracotta">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`${EXPLORE_PATH}/${next.slug}`} className="text-right text-forest/80 hover:text-terracotta">
            {next.name} →
          </Link>
        )}
      </nav>
    </div>
  );
}
