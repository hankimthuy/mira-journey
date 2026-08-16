const DEFAULT_SITE_URL = "https://journey.hankimthuy.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE_URL;

/** Main portfolio — cross-linked for author/entity signal (same person, same brand). */
export const PORTFOLIO_URL = "https://hankimthuy.com";

export const LINKEDIN_URL = "https://www.linkedin.com/in/hankimthuy/";

export const AUTHOR_NAME = "Han Kim Thuy";
export const AUTHOR_FULL_NAME = "Hàn Kim Thủy";

export const SITE_NAME = "Cỗ Máy Thời Gian";

export const SITE_TITLE = `${SITE_NAME} — ${AUTHOR_NAME}`;

export const SITE_DESCRIPTION =
  "Cỗ Máy Thời Gian — blog cá nhân của Han Kim Thuy (Hàn Kim Thủy) về sản phẩm, tâm lý học, hệ thống và đời sống.";

export const SITE_KEYWORDS = [
  "Cỗ Máy Thời Gian",
  "Han Kim Thuy",
  "Hàn Kim Thủy",
  "blog cá nhân",
  "product blog",
  "tâm lý học",
  "system thinking",
  "UX Software Engineer",
];

/** JSON-LD `Person` shared between this blog and the portfolio, keeps the entity consistent for search engines. */
export const AUTHOR_PERSON = {
  "@type": "Person" as const,
  name: AUTHOR_NAME,
  alternateName: [AUTHOR_FULL_NAME, "thuyhankim", "hankimthuy"],
  url: PORTFOLIO_URL,
  sameAs: [PORTFOLIO_URL, "https://github.com/hankimthuy", "https://www.linkedin.com/in/thuyhankim/"],
};
