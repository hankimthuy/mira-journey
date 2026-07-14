"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ochre mb-4">
        La bàn
      </p>
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-forest/15" />
        <div
          className="absolute left-0 top-0 w-px bg-terracotta transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        <div className="flex flex-col gap-4">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleClick(h.id)}
                className={`text-left origin-left transition-all duration-200 cursor-pointer ${
                  active
                    ? "text-[15px] font-semibold text-terracotta scale-[1.02]"
                    : "text-[14px] font-normal text-forest/40 hover:text-forest/70"
                }`}
              >
                {h.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
