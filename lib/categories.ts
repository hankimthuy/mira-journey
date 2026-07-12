export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
};

export const categories: Category[] = [
  {
    slug: "nhat-ky-du-hanh",
    name: "Nhật Ký Du Hành",
    emoji: "🧳",
    tagline: "Đời sống, cảm xúc và những chặng đường đã đi qua",
  },
  {
    slug: "tram-va-loi",
    name: "Trạm Vá Lỗi",
    emoji: "🛠️",
    tagline: "Công nghệ đối đầu trải nghiệm người dùng",
  },
  {
    slug: "xuong-nao-bo",
    name: "Xưởng Não Bộ",
    emoji: "🧠",
    tagline: "Tâm lý học và cách đầu óc con người vận hành",
  },
  {
    slug: "phong-may",
    name: "Phòng Máy",
    emoji: "⚙️",
    tagline: "Hệ thống, quy trình, những thứ chạy ngầm bên dưới",
  },
  {
    slug: "nhat-vun-vu-tru",
    name: "Nhặt Vụn Vũ Trụ",
    emoji: "✨",
    tagline: "Khám phá lặt vặt, thú vị, chẳng theo chủ đề nào cả",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
