import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="border-b border-forest/10 bg-cream/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-4xl px-5 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="group">
            <p className="text-lg font-extrabold text-forest-deep leading-tight tracking-tight">
              Cỗ Máy Thời Gian
            </p>
            <p className="text-xs text-forest/70 -mt-0.5">
              Mira Journey · Han Kim Thuy
            </p>
          </Link>
          <nav className="flex items-center gap-1 flex-wrap text-sm">
            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-md text-forest-deep hover:bg-paper transition-colors"
            >
              All posts
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-3 py-1.5 rounded-md text-forest-deep hover:bg-paper transition-colors"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="px-3 py-1.5 rounded-md text-forest-deep hover:bg-paper transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
