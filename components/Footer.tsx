export default function Footer() {
  return (
    <footer className="border-t border-forest/10 mt-16">
      <div className="mx-auto max-w-4xl px-5 py-8 text-sm text-forest/70 flex items-center justify-between flex-wrap gap-2">
        <p>© {new Date().getFullYear()} Cỗ Máy Thời Gian — Mira Journey</p>
        <p>
          Viết bởi{" "}
          <a
            href="https://github.com/hankimthuy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline decoration-ochre-light hover:text-forest-deep"
          >
            Han Kim Thuy
          </a>
        </p>
      </div>
    </footer>
  );
}
