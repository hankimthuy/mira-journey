"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`pb-0.5 border-b-2 transition-colors ${
        active
          ? "border-terracotta text-forest-deep"
          : "border-transparent text-forest hover:text-forest-deep"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-forest/15 bg-paper/95 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-5xl px-5 py-5">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <Link href="/">
            <p className="font-serif italic font-bold text-[19px] text-forest-deep leading-tight">
              Cỗ Máy Thời Gian
            </p>
            <p className="text-[11px] text-forest/55 -mt-0.5">by Han Kim Thuy</p>
          </Link>
          <nav className="flex items-center gap-5 flex-wrap text-[13px] font-semibold">
            <NavLink href="/" active={pathname === "/"}>
              Trang chủ
            </NavLink>
            <NavLink href="/blog" active={pathname === "/blog"}>
              Bài viết
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
