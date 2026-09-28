import { tarotArt, tarotIndex, type TarotCard } from "@/lib/tarot";

// The illustration is a static SVG built by scripts/build-tarot-art.mjs; the
// index and names stay as HTML on top of it, so Vietnamese text renders
// crisply. A reversed card turns the whole face, art and all.
export default function TarotFace({ card, reversed }: { card: TarotCard; reversed: boolean }) {
  const major = card.arcana === "major";
  return (
    <div className="card-face h-full w-full rounded-xl border border-ochre-light/40 bg-[#1b2230] p-1.5 shadow-[0_0_28px_rgb(232_184_109/0.28)]">
      <div
        className={`relative h-full w-full overflow-hidden rounded-lg border text-center ${
          major ? "border-ochre-light/70" : "border-ochre-light/30"
        } ${reversed ? "rotate-180" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG; next/image adds nothing here */}
        <img
          src={tarotArt(card)}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-x-0 top-1.5 font-serif text-sm font-semibold tracking-widest text-ochre-light [text-shadow:0_1px_4px_rgb(0_0_0/0.7)]">
          {tarotIndex(card)}
        </span>
        <div className="absolute inset-x-1 bottom-2 [text-shadow:0_1px_4px_rgb(0_0_0/0.8)]">
          <p className="font-serif text-[13px] font-semibold italic leading-tight text-cream sm:text-sm">{card.name}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-cream/75">{card.nameVi}</p>
        </div>
      </div>
    </div>
  );
}
