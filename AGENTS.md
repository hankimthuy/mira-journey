<!-- BEGIN:nextjs-agent-rules -->
# Next.js version notes

This project uses Next.js 16 (App Router), standard conventions — no experimental
flags enabled. `next.config.ts` does not set `cacheComponents`, so the newer
Cache Components / instant-navigation model (`unstable_instant`, `use cache`)
does not apply here; regular `loading.tsx` + `revalidate` (ISR) is the pattern
in use. If Cache Components is adopted later, read
`node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md` first.
<!-- END:nextjs-agent-rules -->
