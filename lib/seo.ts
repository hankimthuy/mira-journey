const DEFAULT_SITE_URL = "https://journey.hankimthuy.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE_URL;

export const SITE_NAME = "Mira Journey";

export const SITE_TITLE = "Cỗ Máy Thời Gian — Mira Journey";

export const SITE_DESCRIPTION =
  "Blog cá nhân của Han Kim Thuy về sản phẩm, tâm lý học, hệ thống và đời sống.";
