import { AUTHOR_NAME, PORTFOLIO_URL, SITE_NAME } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-forest/10 mt-12">
      <div className="mx-auto max-w-5xl px-5 py-5 text-[13px] text-forest/60 flex items-center justify-between flex-wrap gap-x-4 gap-y-1">
        <p>© {new Date().getFullYear()} {SITE_NAME}</p>
        <p>
          Người vận hành cỗ máy ·{" "}
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link font-semibold text-forest-deep underline decoration-ochre-light/60 underline-offset-4 hover:text-terracotta"
          >
            {AUTHOR_NAME}
          </a>
        </p>
      </div>
    </footer>
  );
}
