"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/blog", label: "Trạm dừng" },
  { href: "/poc", label: "Trạm PoC" },
  { href: "/about", label: "Trạm xuất phát" },
];

function GearMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-terracotta animate-gear-spin"
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

function DiceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <g fill="currentColor">
        <circle cx="8.2" cy="8.2" r="1.3" />
        <circle cx="15.8" cy="8.2" r="1.3" />
        <circle cx="12" cy="12" r="1.3" />
        <circle cx="8.2" cy="15.8" r="1.3" />
        <circle cx="15.8" cy="15.8" r="1.3" />
      </g>
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
      </g>
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on route change — adjusted during render (comparing
  // against the last-seen pathname) rather than in an effect, so there's no
  // extra render where the stale menu is still visible.
  const [menuPathname, setMenuPathname] = useState(pathname);
  // Plain <a>, not <Link>: /random is a Route Handler that redirects, and
  // <Link> would prefetch it and replay the cached redirect (same post every
  // click). `from` keeps the jump off the post being read.
  const currentSlug = pathname.startsWith("/blog/") ? pathname.slice("/blog/".length) : "";
  const randomHref = currentSlug ? `/random?from=${encodeURIComponent(currentSlug)}` : "/random";
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click / Escape while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-20 transition-colors duration-200 ${scrolled
          ? "border-b border-forest/10 bg-cream/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Link href="/" aria-label="Cỗ Máy Thời Gian" className="group flex shrink-0 items-center gap-2.5">
          <GearMark />
          {pathname !== "/" && (
            <span className="font-serif italic text-[14px] font-semibold text-forest-deep transition-colors group-hover:text-terracotta">
              Cỗ Máy Thời Gian
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pb-0.5 text-[13px] font-semibold tracking-wide text-forest transition-colors hover:text-forest-deep ${active ? "border-terracotta" : "border-transparent"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={randomHref}
            aria-label="Dịch chuyển ngẫu nhiên"
            title="Dịch chuyển ngẫu nhiên"
            className="flex h-7 w-7 items-center justify-center rounded-full text-forest transition-colors hover:text-terracotta"
          >
            <DiceIcon />
          </a>
        </nav>

        <div className="sm:hidden" ref={menuRef}>
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center text-forest"
          >
            <MenuIcon open={menuOpen} />
          </button>
          {menuOpen && (
            <div
              id="mobile-nav"
              className="absolute inset-x-0 top-full border-b border-forest/10 bg-cream/97 px-5 py-3 backdrop-blur"
            >
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 text-[15px] font-serif italic font-semibold ${active ? "text-terracotta" : "text-forest"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={randomHref}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 text-[15px] font-serif italic font-semibold text-forest"
              >
                <DiceIcon />
                Dịch chuyển ngẫu nhiên
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
