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
    name: "Product",
    tagline: "Tư duy về sản phẩm, thiết kế và trải nghiệm người dùng",
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

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
