"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/blog", label: "Trạm dừng" },
  { href: "/about", label: "Trạm xuất phát" },
];

function FlapTile({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className="group/flap block" aria-current={active ? "page" : undefined}>
      <span
        key={active ? "lit" : "dim"}
        className={`flap-tile ${active ? "flap-tile-active animate-flap-drop" : ""}`}
      >
        {label}
      </span>
    </Link>
  );
}

function GearMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-terracotta animate-gear-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" />
      </g>
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`border-b border-forest/15 bg-paper/95 backdrop-blur sticky top-0 z-20 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_18px_-10px_rgba(36,56,42,0.4)]" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="group flex items-center gap-2">
            <GearMark />
            <p className="font-serif italic font-bold text-[16px] text-forest-deep leading-none">
              Cỗ Máy Thời Gian
            </p>
          </Link>
          <nav className="flex items-center gap-1.5 flex-wrap">
            {NAV_ITEMS.map((item, i) => (
              <Fragment key={item.href}>
                {i > 0 && (
                  <span className="flap-divider" aria-hidden="true">
                    <span className="flap-notch flap-notch-top" />
                    <span className="flap-notch flap-notch-bottom" />
                  </span>
                )}
                <FlapTile href={item.href} label={item.label} active={pathname === item.href} />
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
