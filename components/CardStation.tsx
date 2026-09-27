"use client";

import { useEffect, useRef, useState } from "react";
import { TAROT_DECK, type TarotCard } from "@/lib/tarot";
import { playingDeck, type PlayingCard } from "@/lib/playingCards";
import { coinFlip, drawWithoutReplacement } from "@/lib/draw";
import TarotFace from "@/components/cards/TarotFace";
import PlayingFace from "@/components/cards/PlayingFace";
import CardBack from "@/components/cards/CardBack";

// Trạm Rút Bài: pick a style for the day, shuffle, flip. Nothing is saved —
// each draw is its own moment. Randomness only runs in the click handler, so
// server and client render the same idle state.

type Mode = "tarot-1" | "tarot-3" | "playing-1" | "playing-n";
type Phase = "idle" | "shuffle" | "reveal";

type Drawn =
  | { kind: "tarot"; card: TarotCard; reversed: boolean; position?: string }
  | { kind: "playing"; card: PlayingCard };

const MODES: { mode: Mode; label: string; hint: string }[] = [
  { mode: "tarot-1", label: "1 lá tarot", hint: "Một thông điệp cho hôm nay" },
  { mode: "tarot-3", label: "Trải 3 lá", hint: "Quá khứ – Hiện tại – Tương lai" },
  { mode: "playing-1", label: "1 lá bài tây", hint: "Một lá, không cần lý do" },
  { mode: "playing-n", label: "Nhiều lá bài tây", hint: "Bốc vài lá, không trùng nhau" },
];

const SPREAD = ["Quá khứ", "Hiện tại", "Tương lai"];
const SHUFFLE_MS = 900;
const FLIP_STAGGER_MS = 220;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60 ${
        active
          ? "border-forest-deep bg-forest-deep text-cream"
          : "border-forest/30 text-forest hover:border-forest hover:text-forest-deep"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--color-forest)]"
      />
      {children}
    </label>
  );
}

function describe(d: Drawn): string {
  if (d.kind === "playing") return d.card.name;
  const pos = d.position ? `${d.position}: ` : "";
  return `${pos}${d.card.name} (${d.card.nameVi})${d.reversed ? ", ngược" : ""}`;
}

export default function CardStation() {
  const [mode, setMode] = useState<Mode>("tarot-1");
  const [count, setCount] = useState(3);
  const [jokers, setJokers] = useState(false);
  const [allowReversed, setAllowReversed] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hand, setHand] = useState<Drawn[]>([]);
  const [drawId, setDrawId] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const isTarot = mode.startsWith("tarot");

  function reset() {
    if (timer.current) window.clearTimeout(timer.current);
    setPhase("idle");
    setHand([]);
  }

  function pickMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    reset();
  }

  function deal(): Drawn[] {
    if (isTarot) {
      const n = mode === "tarot-3" ? 3 : 1;
      return drawWithoutReplacement(TAROT_DECK, n).map((card, i) => ({
        kind: "tarot",
        card,
        reversed: allowReversed && coinFlip(),
        position: n === 3 ? SPREAD[i] : undefined,
      }));
    }
    const n = mode === "playing-n" ? count : 1;
    return drawWithoutReplacement(playingDeck(jokers), n).map((card) => ({ kind: "playing", card }));
  }

  function draw() {
    if (phase === "shuffle") return;
    if (timer.current) window.clearTimeout(timer.current);
    const next = deal();
    if (prefersReducedMotion()) {
      setHand(next);
      setDrawId((id) => id + 1);
      setPhase("reveal");
      return;
    }
    setHand([]);
    setPhase("shuffle");
    timer.current = window.setTimeout(() => {
      setHand(next);
      setDrawId((id) => id + 1);
      setPhase("reveal");
    }, SHUFFLE_MS);
  }

  const deckSize = isTarot ? TAROT_DECK.length : playingDeck(jokers).length;
  const cardSize = isTarot ? "w-36 aspect-[7/12] sm:w-44" : "w-28 aspect-[5/7] sm:w-36";

  return (
    <section aria-label="Bàn rút bài">
      <div className="mb-8 flex flex-col gap-4 border-y border-forest/15 py-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn kiểu rút">
          {MODES.map((m) => (
            <Pill key={m.mode} active={mode === m.mode} onClick={() => pickMode(m.mode)}>
              {m.label}
            </Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-serif text-[15px] italic text-forest-deep">
            {MODES.find((m) => m.mode === mode)?.hint}
          </p>
          {isTarot && (
            <Toggle checked={allowReversed} onChange={setAllowReversed}>
              Cho phép lá ngược
            </Toggle>
          )}
          {!isTarot && (
            <Toggle checked={jokers} onChange={setJokers}>
              Có Joker
            </Toggle>
          )}
          {mode === "playing-n" && (
            <div className="inline-flex items-center gap-2 text-[13px] text-ink/80">
              <span id="card-count-label">Số lá</span>
              <button
                type="button"
                aria-label="Bớt một lá"
                disabled={count <= 2}
                onClick={() => setCount((c) => Math.max(2, c - 1))}
                className="h-7 w-7 rounded-full border border-forest/30 text-forest disabled:opacity-40"
              >
                −
              </button>
              <span aria-labelledby="card-count-label" className="w-4 text-center font-semibold text-forest-deep">
                {count}
              </span>
              <button
                type="button"
                aria-label="Thêm một lá"
                disabled={count >= 5}
                onClick={() => setCount((c) => Math.min(5, c + 1))}
                className="h-7 w-7 rounded-full border border-forest/30 text-forest disabled:opacity-40"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-[340px] flex-col items-center justify-center gap-8 sm:min-h-[400px]">
        {phase === "reveal" ? (
          <ul key={drawId} className="flex flex-wrap items-start justify-center gap-5 sm:gap-7">
            {hand.map((d, i) => (
              <li
                key={d.card.id}
                className="flex flex-col items-center"
                style={{ "--flip-delay": `${i * FLIP_STAGGER_MS}ms` } as React.CSSProperties}
              >
                {d.kind === "tarot" && d.position && (
                  <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                    {d.position}
                  </span>
                )}
                <div className={`card-3d ${cardSize}`}>
                  <div className="card-inner animate-card-flip">
                    <div className="card-side card-side--back">
                      <CardBack />
                    </div>
                    <div className="card-side card-side--front">
                      {d.kind === "tarot" ? (
                        <TarotFace card={d.card} reversed={d.reversed} />
                      ) : (
                        <PlayingFace card={d.card} />
                      )}
                    </div>
                  </div>
                </div>
                {d.kind === "tarot" && (
                  <div className="card-caption mt-3 max-w-44 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-forest/70">
                      {d.reversed ? "Ngược" : "Xuôi"}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-ink/85">
                      {d.reversed ? d.card.reversed : d.card.upright}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className={`relative ${cardSize}`} aria-hidden="true">
            {[2, 1, 0].map((layer) => (
              <div
                key={layer}
                className="absolute inset-0"
                style={{
                  transform: `translate(${layer * 4}px, ${layer * -4}px) rotate(${(layer - 1) * 3}deg)`,
                }}
              >
                <div
                  className={`h-full w-full ${phase === "shuffle" ? "animate-card-shuffle" : ""}`}
                  style={{ "--shuffle-dir": layer % 2 === 0 ? "1" : "-1" } as React.CSSProperties}
                >
                  <CardBack />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={draw}
            disabled={phase === "shuffle"}
            className="rounded-full bg-terracotta px-7 py-2.5 font-serif text-lg font-medium italic text-cream shadow-sm transition-colors hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60 disabled:opacity-70"
          >
            {phase === "shuffle" ? "Đang xào bài…" : phase === "reveal" ? "Bốc lại" : "Bốc bài"}
          </button>
          <p className="text-[12px] text-forest/60">
            {isTarot ? "Modern Witch Tarot" : "Bài tây"} · {deckSize} lá
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {phase === "reveal" ? `Bạn rút được: ${hand.map(describe).join("; ")}.` : ""}
      </p>
    </section>
  );
}
