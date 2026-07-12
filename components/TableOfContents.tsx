"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <div className="w-[180px] rounded-[14px] bg-paper border border-forest/20 shadow-[0_12px_28px_rgba(36,56,42,0.14)] px-4 py-4">
      <p className="text-[8.5px] font-bold uppercase tracking-widest text-ochre mb-3 pb-2.5 border-b border-forest/15">
        La bàn
      </p>
      <div className="flex flex-col gap-3">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => handleClick(h.id)}
              className="flex items-start gap-2 text-left cursor-pointer"
            >
              <span
                className={`mt-[3px] h-[6px] w-[6px] shrink-0 rounded-full transition-colors ${
                  active ? "bg-terracotta" : "bg-forest/30"
                }`}
              />
              <span
                className={`text-[11px] leading-snug transition-colors ${
                  active ? "font-bold text-terracotta" : "font-medium text-forest/60"
                }`}
              >
                {h.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
