import type { PlayingCard } from "@/lib/playingCards";

function Corner({ card, flipped }: { card: PlayingCard; flipped?: boolean }) {
  const joker = card.suit === null;
  return (
    <div
      className={`absolute flex flex-col items-center leading-none ${
        flipped ? "bottom-2 right-2 rotate-180" : "left-2 top-2"
      }`}
    >
      <span className={`font-serif font-semibold ${joker ? "text-[10px] tracking-[0.2em] [writing-mode:vertical-rl]" : "text-lg"}`}>
        {joker ? "JOKER" : card.rank}
      </span>
      {!joker && <span className="text-base">{card.symbol}</span>}
    </div>
  );
}

export default function PlayingFace({ card }: { card: PlayingCard }) {
  const joker = card.suit === null;
  const face = card.rank === "J" || card.rank === "Q" || card.rank === "K";
  return (
    <div
      className={`card-face relative h-full w-full rounded-xl border border-ochre-light/60 bg-paper shadow-[0_0_24px_rgb(232_184_109/0.25)] ${
        card.red ? "text-terracotta" : "text-ink"
      }`}
    >
      <Corner card={card} />
      <Corner card={card} flipped />
      <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-md">
        {joker ? (
          <>
            <span className="text-5xl">★</span>
            <span className="mt-2 font-serif text-sm italic">Joker</span>
          </>
        ) : face ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-current/30">
            <span className="font-serif text-4xl font-semibold italic">{card.rank}</span>
            <span className="text-3xl">{card.symbol}</span>
          </div>
        ) : (
          <span className="text-6xl sm:text-7xl">{card.symbol}</span>
        )}
      </div>
    </div>
  );
}
