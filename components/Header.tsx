"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SnapIcon, useSnapWarp } from "@/components/SnapWarp";
import { STATIONS as NAV_ITEMS } from "@/lib/stations";


// A station stays marked on its sub-pages too (e.g. /blog/<slug>).
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

/**
 * Phone menu, drawn as the machine's route map: the stations sit on one
 * track, the one you're at glows, and the random warp waits at the end.
 */
function MobileRouteMap({
  pathname,
  night,
  warp,
  onNavigate,
}: {
  pathname: string;
  night: boolean;
  warp: ReturnType<typeof useSnapWarp>;
  onNavigate: () => void;
}) {
  const here = NAV_ITEMS.findIndex((item) => isActive(pathname, item.href));
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* dims the page under the card; tapping it closes the menu */}
      <div
        onClick={onNavigate}
        className={`route-map-veil fixed inset-x-0 bottom-0 top-[57px] -z-10 ${night ? "bg-black/40" : "bg-forest-deep/20"}`}
        aria-hidden="true"
      />
      <div
        id="mobile-nav"
        className={`route-map absolute inset-x-3 top-[calc(100%+6px)] overflow-hidden rounded-2xl border shadow-[0_18px_40px_rgb(36_56_42/0.22)] ${
          night ? "border-ochre-light/15 bg-[#121a2a] text-cream" : "border-forest/12 bg-cream text-ink"
        }`}
      >
        {/* ticket header */}
        <div
          className={`flex items-center justify-between border-b border-dashed px-5 pt-4 pb-3 font-mono text-[10px] uppercase tracking-[0.22em] ${
            night ? "border-ochre-light/20 text-cream/55" : "border-forest/20 text-forest/60"
          }`}
        >
          <span>Bản đồ tuyến</span>
          <span className={night ? "text-ochre-light/80" : "text-terracotta/80"}>
            {here >= 0 ? `Trạm ${pad(here + 1)} / ${pad(NAV_ITEMS.length)}` : `${pad(NAV_ITEMS.length)} trạm`}
          </span>
        </div>

        <ol className="relative px-5 py-2">
          {/* the track */}
          <span
            className={`absolute bottom-7 left-[29px] top-7 border-l-2 border-dashed ${night ? "border-ochre-light/25" : "border-ochre/40"}`}
            aria-hidden="true"
          />
          {NAV_ITEMS.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="route-stop" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                  className={`group relative flex items-center gap-4 rounded-xl py-2.5 pr-2 transition-colors ${
                    night ? "active:bg-white/5" : "active:bg-forest/5"
                  }`}
                >
                  {/* station dot */}
                  <span className="relative grid size-5 shrink-0 place-items-center" aria-hidden="true">
                    {active && (
                      <span className={`absolute inset-0 animate-ping rounded-full motion-reduce:animate-none ${night ? "bg-ochre-light/40" : "bg-terracotta/35"}`} />
                    )}
                    <span
                      className={`relative rounded-full border-2 transition-colors ${
                        active
                          ? night
                            ? "size-3.5 border-ochre-light bg-ochre-light"
                            : "size-3.5 border-terracotta bg-terracotta"
                          : night
                            ? "size-3 border-ochre-light/60 bg-[#121a2a]"
                            : "size-3 border-forest/50 bg-cream group-hover:border-terracotta"
                      }`}
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span
                        className={`font-mono text-[10px] tabular-nums ${
                          active ? (night ? "text-ochre-light" : "text-terracotta") : night ? "text-cream/40" : "text-forest/45"
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <span
                        className={`font-serif text-[18px] font-semibold italic leading-tight transition-colors ${
                          active
                            ? night
                              ? "text-ochre-light"
                              : "text-terracotta"
                            : night
                              ? "text-cream group-hover:text-ochre-light"
                              : "text-forest-deep group-hover:text-terracotta"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className={`mt-0.5 block pl-[26px] text-[12.5px] ${night ? "text-cream/50" : "text-ink/55"}`}>
                      {item.lead}
                    </span>
                  </span>

                  {active ? (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${
                        night ? "bg-ochre-light/15 text-ochre-light" : "bg-terracotta/10 text-terracotta"
                      }`}
                    >
                      Bạn ở đây
                    </span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${night ? "text-cream/35" : "text-forest/35"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>

        {/* the random warp, as the last stop off the map */}
        <div className="route-stop px-3 pb-3" style={{ "--i": NAV_ITEMS.length } as React.CSSProperties}>
          <a
            href={warp.href}
            onClick={(e) => {
              warp.start(e);
              onNavigate();
            }}
            className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-transform active:scale-[0.98] ${
              night ? "bg-ochre-light/10 ring-1 ring-ochre-light/25" : "bg-forest-deep text-cream"
            }`}
          >
            <span className="snap-trigger flex size-9 shrink-0 items-center justify-center rounded-full !bg-cream/10 !text-ochre-light">
              <SnapIcon snapping={warp.snapping} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[16px] font-semibold italic leading-tight text-ochre-light">
                Dịch chuyển ngẫu nhiên
              </span>
              <span className={`mt-0.5 block text-[12px] ${night ? "text-cream/55" : "text-cream/65"}`}>
                Kéo cần gạt, tới một trạm bất kỳ
              </span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">???</span>
          </a>
        </div>
      </div>
    </>
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
  const warp = useSnapWarp();
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
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 pb-0.5 text-[13px] font-semibold tracking-wide transition-colors ${active
                    ? night
                      ? "border-ochre-light text-ochre-light"
                      : "border-terracotta text-forest-deep"
                    : night
                      ? "border-transparent text-cream/75 hover:border-ochre-light/50 hover:text-ochre-light"
                      : "border-transparent text-forest hover:border-terracotta/50 hover:text-terracotta"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={warp.href}
            onClick={warp.start}
            aria-label="Dịch chuyển ngẫu nhiên — tới một trạm bất kỳ"
            data-tip="Dịch chuyển ngẫu nhiên — tới một trạm bất kỳ"
            className="snap-trigger tip tip-below tip-end flex h-8 w-8 items-center justify-center rounded-full"
          >
            <SnapIcon snapping={warp.snapping} />
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden" ref={menuRef}>
          <a
            href={warp.href}
            onClick={warp.start}
            aria-label="Dịch chuyển ngẫu nhiên — tới một trạm bất kỳ"
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
            <MobileRouteMap
              pathname={pathname}
              night={night}
              warp={warp}
              onNavigate={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
      {warp.overlay}
    </header>
  );
}
