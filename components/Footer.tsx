import { AUTHOR_NAME, PORTFOLIO_URL, SITE_NAME } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="border-t border-forest/10 mt-16">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-forest/70 flex items-center justify-between flex-wrap gap-2">
        <p>© {new Date().getFullYear()} {SITE_NAME} — {AUTHOR_NAME}</p>
        <p>
          Viết bởi{" "}
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline decoration-ochre-light hover:text-forest-deep"
          >
            {AUTHOR_NAME}
          </a>
        </p>
      </div>
    </footer>
  );
}
