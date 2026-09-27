/**
 * Site vocabulary, kept to three layers:
 * - Trạm: a space / a way of experiencing the content (Trạm dừng, Trạm chế
 *   tạo, Trạm khám phá, Trạm Aha, Trạm xuất phát) — the header items.
 * - Chủ đề: what a post is about — the `categories` below.
 * - Dịch chuyển: navigating (the random warp), never a station.
 */
export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export const categories: Category[] = [
  {
    slug: "life",
    name: "Life",
    tagline: "Những chuyện đời sống và những điều mình quan sát",
  },
  {
    slug: "product",
    name: "Product & Work",
    tagline: "Sản phẩm, công việc và những điều mình học được từ thực tế",
  },
  {
    slug: "mind",
    name: "Mind",
    tagline: "Những góc nhìn về bản thân, suy nghĩ và các mối quan hệ",
  },
  {
    slug: "system",
    name: "System",
    tagline: "Quy trình, hệ thống và cách mọi thứ vận hành",
  },
  {
    slug: "radar",
    name: "Radar",
    tagline: "Những điều nhỏ nhặt nhưng khiến mình tò mò",
  },
];

/**
 * The travel series lives on its own station (/explore) instead of mixing
 * into the post timeline. Posts still carry `category: "explore"` in the CMS;
 * it is just kept out of `categories`, which are the topics of Trạm dừng.
 */
export const exploreStation: Category = {
  slug: "explore",
  name: "Trạm khám phá",
  tagline: "Những chuyến đi, những nơi đã ghé qua, và vài điều học được dọc đường",
};

export const EXPLORE_PATH = "/explore";

export function isExplorePost(post: { category: string }): boolean {
  return post.category === exploreStation.slug;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (slug === exploreStation.slug) return exploreStation;
  return categories.find((c) => c.slug === slug);
}

/** Where a category's own page lives — the travel series has its own route. */
export function categoryHref(slug: string): string {
  return slug === exploreStation.slug ? EXPLORE_PATH : `/category/${slug}`;
}
