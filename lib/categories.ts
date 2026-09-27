export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export const categories: Category[] = [
  {
    slug: "life",
    name: "Life",
    tagline: "Chuyện đời sống, quan sát cá nhân và những bài học tự thân",
  },
  {
    slug: "product",
    name: "Product & Work",
    tagline: "Tư duy về sản phẩm, công việc và những đúc kết từ ngày làm việc thực tế",
  },
  {
    slug: "mind",
    name: "Mind",
    tagline: "Tâm lý học thực hành để soi chiếu nội tâm và thấu hiểu các mối quan hệ",
  },
  {
    slug: "system",
    name: "System",
    tagline: "Quy trình, hạ tầng và cách mọi thứ vận hành phía sau",
  },
  {
    slug: "radar",
    name: "Radar",
    tagline: "Vài thứ nhỏ nhặt nhưng hay ho",
  },
];

/**
 * The travel series lives on its own station (/explore) instead of mixing
 * into the post timeline. Posts still carry `category: "explore"` in the CMS;
 * it is just kept out of `categories`, which are the stops on the blog rail.
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
