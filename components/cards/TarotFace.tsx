import { tarotIndex, type TarotCard, type TarotSuit } from "@/lib/tarot";

// Simple line glyphs per suit; a sun/star for the Major Arcana.
function Glyph({ suit }: { suit: TarotSuit | null }) {
  const common = {
    viewBox: "0 0 48 48",
    className: "h-14 w-14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (suit) {
    case "wands":
      return (
        <svg {...common}>
          <path d="M16 42 32 6" />
          <path d="M29 12c3-1 5 0 6 2M25 20c3-1 5 0 6 2M21 28c-3-1-5 0-6 2" />
          <circle cx="33" cy="5" r="2" fill="currentColor" />
        </svg>
      );
    case "cups":
      return (
        <svg {...common}>
          <path d="M12 8h24c0 11-5 18-12 18S12 19 12 8Z" />
          <path d="M24 26v10M16 40h16" />
          <path d="M17 13c2 2 4 2 7 0s5-2 7 0" />
        </svg>
      );
    case "swords":
      return (
        <svg {...common}>
          <path d="M24 4v30" />
          <path d="M20 8l4-4 4 4" />
          <path d="M15 34h18M24 34v8" />
          <circle cx="24" cy="43" r="1.5" fill="currentColor" />
        </svg>
      );
    case "pentacles":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" />
          <path d="M24 10l8.2 25.3L10.7 19.7h26.6L15.8 35.3Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="8" />
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2" />
          <path d="M21 22.5l3-3 3 3-3 3Z" fill="currentColor" />
        </svg>
      );
  }
}

export default function TarotFace({ card, reversed }: { card: TarotCard; reversed: boolean }) {
  const major = card.arcana === "major";
  return (
    <div className="card-face h-full w-full rounded-xl border border-ochre-light/40 bg-[#1b2230] p-1.5 shadow-[0_0_28px_rgb(232_184_109/0.28)]">
      <div
        className={`flex h-full w-full flex-col items-center justify-between rounded-lg border px-2 py-3 text-center transition-transform ${
          major ? "border-ochre-light/70 text-cream" : "border-ochre-light/30 text-cream/90"
        } ${reversed ? "rotate-180" : ""}`}
      >
        <span className="font-serif text-sm font-semibold tracking-widest text-ochre-light">
          {tarotIndex(card)}
        </span>
        <div className={major ? "text-ochre-light" : "text-cream/75"}>
          <Glyph suit={card.suit} />
        </div>
        <div>
          <p className="font-serif text-[13px] font-semibold italic leading-tight sm:text-sm">{card.name}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-cream/60">{card.nameVi}</p>
        </div>
      </div>
    </div>
  );
}
