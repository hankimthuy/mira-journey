import Script from "next/script";

/**
 * Umami Cloud pageview tracking. Renders nothing unless both env vars are set,
 * so local dev and preview deploys don't pollute production stats.
 */
export default function Umami() {
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!src || !websiteId) return null;

  return (
    <Script
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
      defer
    />
  );
}
