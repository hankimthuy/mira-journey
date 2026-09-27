"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";

const NAV_ITEMS = [
  { href: "/blog", label: "Trạm dừng" },
  { href: "/products", label: "Trạm chế tạo" },
  { href: "/explore", label: "Trạm khám phá" },
  { href: "/aha", label: "Trạm Aha" },
  { href: "/about", label: "Trạm xuất phát" },
];

function GearMark({ night }: { night: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 animate-gear-spin ${night ? "text-ochre-light" : "text-terracotta"}`}
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
  // Trạm Aha is a night page: the header follows it into the dark.
  const night = pathname === "/aha";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on route change — adjusted during render (comparing
  // against the last-seen pathname) rather than in an effect, so there's no
  // extra render where the stale menu is still visible.
  const [menuPathname, setMenuPathname] = useState(pathname);
  // Plain <a>, not <Link>: /random is a Route Handler that redirects, and
  // <Link> would prefetch it and replay the cached redirect (same post every
  // click). The href is the no-JS fallback; with JS the snap warp takes over.
  const currentSlug = pathname.startsWith("/blog/") ? pathname.slice("/blog/".length) : "";
  const warp = useSnapWarp(currentSlug);
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
          ? night
            ? "border-b border-ochre-light/10 bg-[#0f1522]/85 backdrop-blur"
            : "border-b border-forest/10 bg-cream/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Cỗ Máy Thời Gian" className="group flex shrink-0 items-center gap-2.5">
          <GearMark night={night} />
          {pathname !== "/" && (
            <span className={`font-serif italic text-[14px] font-semibold transition-colors ${night ? "text-cream group-hover:text-ochre-light" : "text-forest-deep group-hover:text-terracotta"}`}>
              Cỗ Máy Thời Gian
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 pb-0.5 text-[13px] font-semibold tracking-wide transition-colors ${night ? "text-cream/75 hover:text-ochre-light" : "text-forest hover:text-forest-deep"
                  } ${active ? (night ? "border-ochre-light text-ochre-light" : "border-terracotta") : "border-transparent"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={warp.href}
            onClick={warp.start}
            aria-label="Dịch chuyển ngẫu nhiên — tới một bài bất kỳ"
            data-tip="Dịch chuyển ngẫu nhiên — tới một bài bất kỳ"
            className="snap-trigger tip tip-below tip-end flex h-8 w-8 items-center justify-center rounded-full"
          >
            <SnapIcon snapping={warp.snapping} />
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden" ref={menuRef}>
          <a
            href={warp.href}
            onClick={warp.start}
            aria-label="Dịch chuyển ngẫu nhiên — tới một bài bất kỳ"
            className="snap-trigger mr-1 flex h-8 w-8 items-center justify-center rounded-full"
          >
            <SnapIcon snapping={warp.snapping} />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-8 w-8 items-center justify-center ${night ? "text-cream" : "text-forest"}`}
          >
            <MenuIcon open={menuOpen} />
          </button>
          {menuOpen && (
            <div
              id="mobile-nav"
              className={`absolute inset-x-0 top-full border-b px-5 py-3 backdrop-blur ${night ? "border-ochre-light/10 bg-[#0f1522]/97" : "border-forest/10 bg-cream/97"}`}
            >
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 text-[15px] font-serif italic font-semibold ${active ? (night ? "text-ochre-light" : "text-terracotta") : night ? "text-cream/80" : "text-forest"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {warp.overlay}
    </header>
  );
}
