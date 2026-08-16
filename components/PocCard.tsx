"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { POC_STATUS, splitTagline, type Poc } from "@/lib/pocs";
import { LINKEDIN_URL } from "@/lib/seo";

/**
 * A PoC card. The whole card is one link to the live product (stretched-link
 * trick), which is why this is an <article> with an inner <a> rather than an
 * <a> wrapping everything — the "Đọc tiếp" button has to sit above that link,
 * and a <button> inside an <a> is neither valid nor clickable.
 */
export default function PocCard({ poc }: { poc: Poc }) {
  const [open, setOpen] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const status = POC_STATUS[poc.status];
  const retired = poc.status === "deprecated";

  // Short entries fit inside the 3-line clamp, and offering "Đọc tiếp" on a
  // card where it would visibly do nothing is worse than not offering it.
  // Only measured while collapsed — expanded text never overflows, and the
  // stale `true` is what keeps the button around to collapse again.
  useEffect(() => {
    if (open) return;
    const el = bodyRef.current;
    if (!el) return;

    const measure = () => {
      const blocks = el.querySelectorAll<HTMLElement>("[data-clampable]");
      setTruncated(
        Array.from(blocks).some((b) => b.scrollHeight > b.clientHeight + 1)
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  /** Feeds the ::before spotlight gradient. Paint-only, so no rAF throttle. */
  function trackCursor(e: React.MouseEvent<HTMLElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
  }

  return (
    <article
      onMouseMove={trackCursor}
      className={`poc-card ticket-accent-${status.accent} group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-forest/15 bg-cream transition-all duration-300 hover:-translate-y-1 hover:rotate-[-0.4deg] hover:border-terracotta/50 hover:shadow-md ${
        retired ? "poc-card--retired" : ""
      }`}
    >
      {/* One wrapper for everything, and the only positioned box between the
          card and the title link. The stretched `after:inset-0` anchors to it,
          so the whole card stays clickable; splitting this into two positioned
          divs silently shrinks the hit area to the header alone. z-1 lifts the
          content above the cursor spotlight painted at z-0. */}
      <div className="relative z-[1] flex h-full flex-1 flex-col">
        {/* Spine of the card: a small tile instead of a big art panel, so the
            shelf reads as a row of catalogue entries rather than a poster wall. */}
        <div className="flex items-start gap-3 border-b border-forest/12 px-3.5 py-3">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-[4px] border border-forest/12 bg-gradient-to-br from-paper to-ochre-light/45 text-2xl"
            aria-hidden="true"
          >
            {poc.emoji || "◍"}
          </span>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-serif text-[17px] font-semibold italic leading-snug text-forest-deep">
              {poc.link ? (
                <a
                  href={poc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 hover:text-terracotta"
                >
                  {poc.name}
                </a>
              ) : (
                poc.name
              )}
            </h3>
            {(poc.formerName || poc.yearLabel) && (
              <p className="mt-0.5 truncate text-[11px] text-ink/55">
                {poc.formerName && <em>Tiền thân: {poc.formerName}</em>}
                {poc.formerName && poc.yearLabel && " · "}
                {poc.yearLabel}
              </p>
            )}
          </div>

          <span className="poc-stamp mt-0.5 shrink-0">{status.stamp}</span>
        </div>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 px-3.5 py-3.5">
        {poc.coverUrl && (
          <div className="relative aspect-video overflow-hidden rounded-[3px] border border-forest/12">
            <Image
              src={poc.coverUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        )}

        {poc.tagline && (
          <p className="text-[14px] font-semibold leading-snug text-forest-deep">
            {splitTagline(poc.tagline).map((part, i) =>
              part.mark ? (
                <span key={i} className="bg-ochre-light/45 px-0.5">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </p>
        )}

        {poc.painPoint && (
          <div>
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-ochre">
              Vấn đề
            </p>
            <p
              data-clampable
              className={`whitespace-pre-line text-[12.5px] leading-relaxed text-ink/75 ${
                open ? "" : "line-clamp-3"
              }`}
            >
              {poc.painPoint}
            </p>
          </div>
        )}

        {poc.story && (
          <div>
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-ochre">
              Câu chuyện
            </p>
            <p
              data-clampable
              className={`whitespace-pre-line text-[12.5px] leading-relaxed text-ink/75 ${
                open ? "" : "line-clamp-3"
              }`}
            >
              {poc.story}
            </p>
          </div>
        )}

        {truncated && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 self-start text-[11px] font-semibold text-terracotta underline decoration-ochre-light underline-offset-2 hover:decoration-terracotta"
          >
            {open ? "Thu gọn" : "Đọc tiếp"}
          </button>
        )}

        {poc.stack.length > 0 && (
          <ul className="flex flex-wrap gap-1">
            {poc.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-forest/15 px-1.5 py-0.5 text-[10px] text-ink/60"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Status is not repeated here — the stamp on the art panel carries it.
            With no product link the card has no stretched link either, so this
            can safely be a real link of its own. */}
        <div className="mt-auto border-t border-forest/12 pt-2.5">
          {poc.link ? (
            <span className="text-[11px] font-semibold text-terracotta">
              Xem sản phẩm →
            </span>
          ) : (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-[11px] font-semibold text-terracotta hover:underline"
            >
              Liên hệ để tìm hiểu →
            </a>
          )}
        </div>
      </div>
      </div>
    </article>
  );
}
