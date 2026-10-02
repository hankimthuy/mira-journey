"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/posts";

const TOC_SHEET_ID = "toc-sheet";
// A heading counts as "current" once it has scrolled up past this line —
// just under the sticky header.
const ACTIVE_LINE = 120;

type Entry = Heading & { number: string | null };

/** Number the top-level headings 01, 02…; deeper ones sit under them unnumbered. */
function numberHeadings(headings: Heading[]): Entry[] {
  const top = Math.min(...headings.map((h) => h.level));
  let n = 0;
  return headings.map((h) => ({
    ...h,
    number: h.level === top ? String(++n).padStart(2, "0") : null,
  }));
}

function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    let frame = 0;

    function update() {
      frame = 0;
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = h.id;
      }
      // At the very bottom the last sections may never reach the line.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveId(atEnd ? headings[headings.length - 1].id : current);
    }

    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings]);

  return [activeId, setActiveId] as const;
}

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function TocList({
  entries,
  activeId,
  onSelect,
}: {
  entries: Entry[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ol className="flex flex-col gap-3">
      {entries.map((h) => {
        const active = activeId === h.id;
        return (
          <li key={h.id} className={h.number ? "" : "pl-7"}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(h.id);
              }}
              aria-current={active ? "location" : undefined}
              className={`group flex items-baseline gap-3 leading-snug transition-colors duration-200 ${
                active ? "text-terracotta" : "text-forest-deep/75 hover:text-forest-deep"
              }`}
            >
              {h.number && (
                <span
                  className={`w-4 shrink-0 font-mono text-[11px] tabular-nums transition-colors ${
                    active ? "text-terracotta" : "text-forest/45 group-hover:text-forest/70"
                  }`}
                >
                  {h.number}
                </span>
              )}
              <span
                className={`${h.number ? "text-[14.5px] font-medium" : "text-[13px]"} ${
                  active ? "font-semibold" : ""
                }`}
              >
                {h.text}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

const LABEL = "font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-forest/70";

/** Sticky sidebar version, for wide screens. */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useActiveHeading(headings);
  if (headings.length === 0) return null;
  const entries = numberHeadings(headings);

  return (
    <nav aria-label="Mục lục bài viết">
      <p className={`${LABEL} mb-4`}>Mục lục</p>
      <TocList
        entries={entries}
        activeId={activeId}
        onSelect={(id) => {
          jumpTo(id);
          setActiveId(id);
        }}
      />
    </nav>
  );
}

/**
 * Phone version: a small pill in the bottom-left corner naming the current
 * section; tapping it opens the full list as a bottom sheet.
 */
export function MobileTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useActiveHeading(headings);
  const [shown, setShown] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Only offer the pill once the reader is into the article.
  useEffect(() => {
    if (headings.length === 0) return;
    function update() {
      const first = document.getElementById(headings[0].id);
      setShown(first ? first.getBoundingClientRect().top < window.innerHeight : false);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings]);

  if (headings.length === 0) return null;
  const entries = numberHeadings(headings);
  const current = entries.find((h) => h.id === activeId) ?? entries[0];
  const currentNumber =
    current.number ??
    entries.slice(0, entries.indexOf(current)).reverse().find((h) => h.number)?.number;

  return (
    <div className="md:hidden">
      <button
        type="button"
        popoverTarget={TOC_SHEET_ID}
        aria-label={`Mở mục lục — đang ở: ${current.text}`}
        tabIndex={shown ? 0 : -1}
        aria-hidden={!shown}
        className={`fixed bottom-5 left-4 z-40 flex h-12 max-w-[calc(100vw-6.5rem)] cursor-pointer items-center gap-2.5 rounded-full border border-forest/20 bg-cream pl-4 pr-5 text-forest-deep shadow-[0_8px_20px_rgba(36,56,42,0.18)] transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          shown ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-forest/60">
          <line x1="9" y1="6" x2="20" y2="6" />
          <line x1="9" y1="12" x2="20" y2="12" />
          <line x1="9" y1="18" x2="20" y2="18" />
          <circle cx="4.5" cy="6" r="1" fill="currentColor" />
          <circle cx="4.5" cy="12" r="1" fill="currentColor" />
          <circle cx="4.5" cy="18" r="1" fill="currentColor" />
        </svg>
        {currentNumber && (
          <span className="shrink-0 font-mono text-[11px] tabular-nums text-terracotta">{currentNumber}</span>
        )}
        <span className="truncate text-[13px] font-medium">{current.text}</span>
      </button>

      <div
        ref={sheetRef}
        id={TOC_SHEET_ID}
        popover="auto"
        className="toc-sheet fixed inset-x-0 bottom-0 top-auto m-0 max-h-[75vh] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-2xl border-0 border-t border-forest/15 bg-cream px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-ink shadow-[0_-12px_32px_rgba(36,56,42,0.18)] backdrop:bg-forest-deep/35"
      >
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-forest/20" aria-hidden="true" />
        <div className="mb-5 flex items-center justify-between">
          <p className={LABEL}>Mục lục</p>
          <button
            type="button"
            popoverTarget={TOC_SHEET_ID}
            popoverTargetAction="hide"
            aria-label="Đóng mục lục"
            className="-mr-2 rounded-full px-2 py-1 text-base leading-none text-forest/50 hover:text-terracotta"
          >
            ✕
          </button>
        </div>
        <nav aria-label="Mục lục bài viết">
          <TocList
            entries={entries}
            activeId={activeId}
            onSelect={(id) => {
              sheetRef.current?.hidePopover();
              jumpTo(id);
              setActiveId(id);
            }}
          />
        </nav>
      </div>
    </div>
  );
}
