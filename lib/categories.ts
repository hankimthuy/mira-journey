export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export const categories: Category[] = [
  {
    slug: "life",
    name: "Life",
    tagline: "Đời sống, quan sát cá nhân và những gì đúc kết được",
  },
  {
    slug: "product",
    name: "Product",
    tagline: "Sản phẩm, thiết kế và trải nghiệm người dùng",
  },
  {
    slug: "mind",
    name: "Mind",
    tagline:
      "Ứng dụng các hệ quy chiếu và tâm lý học thực hành để bóc tách bản thân, các mối quan hệ, và cách mình định hình trong xã hội — self-awareness là trọng tâm",
  },
  {
    slug: "system",
    name: "System",
    tagline: "Hệ thống, quy trình và hạ tầng vận hành phía sau",
  },
  {
    slug: "radar",
    name: "Radar",
    tagline: "Những phát hiện nhỏ, đáng chú ý, không theo chủ đề cố định",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
