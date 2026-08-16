"use client";

import { useEffect, useState } from "react";

const OPEN_HOUR = 6;
const CLOSE_HOUR = 23;

/** Hour of day in Vietnam, whatever timezone the visitor is sitting in. */
function vietnamHour(): number {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      hourCycle: "h23",
    }).format(new Date())
  );
}

/**
 * The little shop sign hanging by the workshop door. Client-side on purpose:
 * the page is statically rendered, so a server-computed hour would be frozen
 * at build time — and guessing one to render would mismatch on hydration.
 */
export default function OpenSign() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => {
      const hour = vietnamHour();
      setOpen(hour >= OPEN_HOUR && hour < CLOSE_HOUR);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-[148px] shrink-0 select-none">
      <div className="mx-auto h-[3px] w-16 rounded-full bg-forest/25" />

      <div className="open-sign-swing origin-top">
        <svg
          viewBox="0 0 120 20"
          className="h-4 w-full text-forest/35"
          aria-hidden="true"
        >
          <path
            d="M46 0 L16 20 M74 0 L104 20"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        <div
          className={`rounded-[5px] border-2 px-3 py-2.5 text-center shadow-sm transition-colors ${
            open === false
              ? "border-terracotta/55 bg-paper"
              : "border-forest/70 bg-cream"
          }`}
        >
          <p
            className={`font-serif text-2xl font-semibold italic tracking-wide ${
              open === false ? "text-terracotta" : "text-ochre"
            }`}
          >
            {open === null ? "···" : open ? "Open" : "Closed"}
          </p>

          <div className="my-1.5 border-t border-dashed border-ochre/45" />

          <p className="text-[11px] font-bold leading-tight text-forest-deep">
            6:00 — 23:00
          </p>
          <p className="text-[10px] font-semibold leading-tight tracking-wide text-ochre/85">
            giờ Việt Nam
          </p>
        </div>
      </div>
    </div>
  );
}
