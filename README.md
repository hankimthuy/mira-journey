# Cỗ Máy Thời Gian — Mira Journey

Blog cá nhân của Han Kim Thuy. Next.js (App Router) + Tailwind CSS v4, nội dung là file Markdown trong `content/posts`. Không có CMS/đăng nhập — mỗi bài viết mới là một lần sửa code.

## Chạy thử local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Viết bài mới

1. Tạo file `.md` mới trong `content/posts/`, tên file chính là slug (URL) của bài viết. Ví dụ: `content/posts/hom-nay-minh-hoc-duoc-gi.md` → `/blog/hom-nay-minh-hoc-duoc-gi`.
2. Thêm frontmatter ở đầu file:

```markdown
---
title: "Tiêu đề bài viết"
description: "Một câu mô tả ngắn, hiện ở trang danh sách."
date: "2026-07-15"
category: "life"
lang: "vi"
tags: ["tag1", "tag2"]
---

Nội dung bài viết viết bằng Markdown ở đây.
```

3. `category` phải là một trong các slug định nghĩa ở [`lib/categories.ts`](lib/categories.ts):

   | slug | Tên hiển thị |
   |---|---|
   | `life` | Life |
   | `product` | Product |
   | `mind` | Mind |
   | `system` | System |
   | `radar` | Radar |

4. `lang` là `vi` hoặc `en` — dùng để lọc bài theo ngôn ngữ ở trang danh sách.
5. Muốn viết nháp mà chưa public, thêm `draft: true` vào frontmatter — bài sẽ không hiện ở bất kỳ trang danh sách nào cho tới khi bỏ dòng đó (hoặc set `draft: false`).
6. Lưu file, `npm run dev` sẽ tự nhận bài mới. Commit và push khi ưng ý — Vercel sẽ tự build lại.

## Thêm category mới

Sửa `lib/categories.ts`, thêm object mới vào mảng `categories` (cần `slug`, `name`, `tagline`). Trang chủ, header và trang `/category/[slug]` sẽ tự động nhận category mới.

## Cấu trúc chính

```
app/                  route pages (home, /blog, /blog/[slug], /category/[slug], /about)
components/           Header, Footer, PostCard, PostList
content/posts/        bài viết dạng Markdown
lib/                  đọc & parse markdown, danh sách category, format ngày
```

## Deploy

Push code lên GitHub rồi import repo vào [Vercel](https://vercel.com/new) — không cần cấu hình gì thêm, Vercel tự nhận diện Next.js.
