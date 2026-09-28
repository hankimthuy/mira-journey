"use client";

import { useEffect, useRef, useState } from "react";
import { TAROT_DECK } from "@/lib/tarot";
import { playingDeck } from "@/lib/playingCards";
import { coinFlip, drawWithoutReplacement } from "@/lib/draw";
import TarotFace from "@/components/cards/TarotFace";
import PlayingFace from "@/components/cards/PlayingFace";
import CardBack from "@/components/cards/CardBack";
import { SPREADS, summarize, type Drawn, type SpreadId } from "@/lib/readingSummary";

// Trạm Aha: pick a style for the day, shuffle, flip. Nothing is saved —
// each draw is its own moment. Randomness only runs in the click handler, so
// server and client render the same idle state.

type Mode = "tarot-1" | "tarot-3" | "playing-1" | "playing-n";
type Phase = "idle" | "shuffle" | "reveal";

const MODES: { mode: Mode; label: string; hint: string }[] = [
  { mode: "tarot-1", label: "1 lá tarot", hint: "Một lời thì thầm cho hôm nay" },
  { mode: "tarot-3", label: "Trải 3 lá", hint: "Ba lá, mỗi lá trả lời một góc của câu hỏi" },
  { mode: "playing-1", label: "1 lá bài tây", hint: "Một lá, để trực giác tự chọn" },
  { mode: "playing-n", label: "Nhiều lá bài tây", hint: "Vài lá, không lá nào trùng lá nào" },
];

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
      className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre-light/70 ${
        active
          ? "border-ochre-light bg-ochre-light text-[#141b29] shadow-[0_0_16px_rgb(232_184_109/0.45)]"
          : "border-ochre-light/35 text-cream/80 hover:border-ochre-light hover:text-ochre-light"
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
  // A switch, not a checkbox: glowing track, a moon knob that slides over.
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-2.5 rounded-full text-[13px] text-cream/75 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre-light/70"
    >
      <span
        aria-hidden="true"
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-all duration-300 ${
          checked
            ? "border-ochre-light/80 bg-ochre-light/25 shadow-[0_0_14px_rgb(232_184_109/0.45)]"
            : "border-cream/25 bg-cream/5"
        }`}
      >
        <span
          className={`absolute left-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-300 ${
            checked ? "translate-x-5 bg-ochre-light text-[#141b29]" : "translate-x-0 bg-cream/40 text-transparent"
          }`}
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor">
            <path d="M7.5 1.5a4.5 4.5 0 1 0 3 7.8A3.8 3.8 0 1 1 7.5 1.5Z" />
          </svg>
        </span>
      </span>
      {children}
    </button>
  );
}

function describe(d: Drawn): string {
  if (d.kind === "playing") return `${d.card.name}, ${d.card.keywords}`;
  const pos = d.position ? `${d.position.name}: ` : "";
  const keywords = d.reversed ? d.card.reversed : d.card.upright;
  return `${pos}${d.card.name} (${d.card.nameVi})${d.reversed ? ", ngược" : ""}, ${keywords}`;
}

// Three layers, so nobody is left alone with a bare verdict: keywords up
// front, a gentle reading behind "Đọc thêm", then a question to sit with.
function Caption({ d, wide }: { d: Drawn; wide: boolean }) {
  const tarot = d.kind === "tarot";
  const reversed = tarot && d.reversed;
  const keywords = tarot ? (reversed ? d.card.reversed : d.card.upright) : d.card.keywords;
  const message = tarot && reversed ? d.card.blocked : d.card.message;
  return (
    <div className={`card-caption mt-3 text-center ${wide ? "w-72 max-w-full" : "w-40 sm:w-44"}`}>
      {reversed && (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ochre-light/70">
          Ngược · năng lượng hướng vào trong
        </p>
      )}
      <p className="font-serif text-[14px] italic leading-snug text-cream/90">{keywords}</p>
      <details className="group mt-2 text-left">
        <summary className="mx-auto w-fit cursor-pointer list-none rounded-full border border-ochre-light/30 px-3 py-0.5 text-[12px] font-semibold text-ochre-light/85 transition-colors hover:border-ochre-light hover:text-ochre-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre-light/70 [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Đọc thêm</span>
          <span className="hidden group-open:inline">Thu gọn</span>
        </summary>
        <p className="mt-2 text-[13px] leading-relaxed text-cream/80">{message}</p>
        <p className="mt-2 font-serif text-[13px] italic leading-snug text-ochre-light/90">
          Tự hỏi mình: {d.card.reflect}
        </p>
      </details>
    </div>
  );
}

export default function CardStation() {
  const [mode, setMode] = useState<Mode>("tarot-1");
  const [count, setCount] = useState(3);
  const [jokers, setJokers] = useState(false);
  const [spread, setSpread] = useState<SpreadId>("diary");
  // Off by default: reversed cards confuse people new to tarot.
  const [allowReversed, setAllowReversed] = useState(false);
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

  function pickSpread(next: SpreadId) {
    if (next === spread) return;
    setSpread(next);
    reset();
  }

  function deal(): Drawn[] {
    if (isTarot) {
      const n = mode === "tarot-3" ? 3 : 1;
      const positions = SPREADS.find((s) => s.id === spread)?.positions ?? [];
      return drawWithoutReplacement(TAROT_DECK, n).map((card, i) => ({
        kind: "tarot",
        card,
        reversed: allowReversed && coinFlip(),
        position: n === 3 ? positions[i] : undefined,
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
  const summary = phase === "reveal" ? summarize(hand, spread) : null;

  return (
    <section aria-label="Bàn rút bài">
      <div className="mb-8 flex flex-col gap-4 border-y border-ochre-light/15 py-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn kiểu rút">
          {MODES.map((m) => (
            <Pill key={m.mode} active={mode === m.mode} onClick={() => pickMode(m.mode)}>
              {m.label}
            </Pill>
          ))}
        </div>
        {mode === "tarot-3" && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Chọn kiểu trải">
            <span className="mr-1 text-[12px] uppercase tracking-[0.2em] text-cream/50">Kiểu trải</span>
            {SPREADS.map((s) => (
              <Pill key={s.id} active={spread === s.id} onClick={() => pickSpread(s.id)}>
                {s.label}
              </Pill>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-serif text-[15px] italic text-ochre-light">
            {MODES.find((m) => m.mode === mode)?.hint}
          </p>
          {isTarot && (
            <Toggle checked={allowReversed} onChange={setAllowReversed}>
              Có thể rút lá ngược (nếu bạn đã quen đọc Tarot)
            </Toggle>
          )}
          {!isTarot && (
            <Toggle checked={jokers} onChange={setJokers}>
              Có Joker
            </Toggle>
          )}
          {mode === "playing-n" && (
            <div className="inline-flex items-center gap-2 text-[13px] text-cream/75">
              <span id="card-count-label">Số lá</span>
              <button
                type="button"
                aria-label="Bớt một lá"
                disabled={count <= 2}
                onClick={() => setCount((c) => Math.max(2, c - 1))}
                className="h-7 w-7 rounded-full border border-ochre-light/40 text-ochre-light disabled:opacity-30"
              >
                −
              </button>
              <span aria-labelledby="card-count-label" className="w-4 text-center font-semibold text-ochre-light">
                {count}
              </span>
              <button
                type="button"
                aria-label="Thêm một lá"
                disabled={count >= 5}
                onClick={() => setCount((c) => Math.min(5, c + 1))}
                className="h-7 w-7 rounded-full border border-ochre-light/40 text-ochre-light disabled:opacity-30"
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
                  <div className="mb-2 w-40 text-center sm:w-44">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ochre-light">
                      {d.position.name}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-cream/55">{d.position.hint}</p>
                  </div>
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
                <Caption d={d} wide={hand.length === 1} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`aha-deck relative ${cardSize}`} aria-hidden="true">
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

        {summary && (
          // Mimo reads the spread back as a whole, in a speech bubble.
          <div
            key={`summary-${drawId}`}
            className="card-caption flex w-full max-w-xl items-end gap-3"
            style={{ "--flip-delay": `${hand.length * FLIP_STAGGER_MS}ms` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mimo.gif" alt="Mimo" className="w-14 shrink-0 drop-shadow-lg sm:w-16" />
            <div className="relative flex-1 rounded-2xl rounded-bl-sm border border-ochre-light/25 bg-[#141b29]/70 px-5 py-4">
              {summary.lines.map((line) => (
                <p key={line} className="mb-1.5 text-[14px] leading-relaxed text-cream/85">
                  {line}
                </p>
              ))}
              <p className="mt-2 font-serif text-[14px] italic text-ochre-light/90">Tự hỏi mình: {summary.reflect}</p>
            </div>
          </div>
        )}

        {phase === "reveal" && (
          <p className="max-w-md text-center text-[11px] leading-relaxed text-cream/40">
            Nếu thông điệp chưa chạm tới bạn, cứ để nó đó.
          </p>
        )}

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={draw}
            disabled={phase === "shuffle"}
            className="aha-summon rounded-full border border-ochre-light/70 bg-ochre-light/10 px-7 py-2.5 font-serif text-lg font-medium italic text-ochre-light transition-colors hover:bg-ochre-light hover:text-[#141b29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre-light/70 disabled:opacity-70"
          >
            {phase === "shuffle" ? "Đang lắng nghe…" : phase === "reveal" ? "Lắng nghe lần nữa" : "Bốc bài"}
          </button>
          <p className="text-[12px] text-cream/45">
            {isTarot ? "Tarot" : "Bài tây"} · {deckSize} lá
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {phase === "reveal" ? `Trực giác gửi bạn: ${hand.map(describe).join("; ")}.` : ""}
      </p>
    </section>
  );
}
