# Cỗ Máy Thời Gian — Mira Journey

Blog cá nhân của Han Kim Thuy. Next.js (App Router) + Tailwind CSS v4, nội dung là file Markdown trong `content/posts`. Không có CMS/đăng nhập — mỗi bài viết mới là một lần sửa code.

## Chạy thử local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Obsidian vault

Gốc repo này đồng thời là một Obsidian vault (`.obsidian/` ở thư mục gốc) — dùng để vừa ghi chú cá nhân ("bộ não") vừa viết/sửa bài blog trực tiếp, không cần đồng bộ qua lại.

1. Mở Obsidian → **File → Open folder as vault** → chọn thư mục gốc repo (`mira-thuy-blogs`).
2. `content/posts/*.md` là các file bài viết thật — sửa trực tiếp trong Obsidian, Next.js đọc đúng những file này.
3. `node_modules/`, `.next/`, `.git/`, `.vercel/`, `out/`, `build/` đã được loại khỏi index/search của Obsidian (cấu hình trong `.obsidian/app.json`), không cần lo phần này làm chậm vault.
4. Ảnh vẫn theo đúng quy ước bên dưới (`public/images/posts/<slug>/`).
5. Một số file trong `.obsidian/` (`workspace.json`, `workspace-mobile.json`, `cache`) bị gitignore vì là trạng thái UI riêng của từng máy, không cần chia sẻ — các file cấu hình còn lại (`app.json`, `core-plugins.json`, `community-plugins.json`, `templates.json`) được commit để mọi máy mở vault đều có cùng thiết lập.

## Viết bài mới

1. Tạo file `.md` mới trong `content/posts/`, tên file chính là slug (URL) của bài viết. Ví dụ: `content/posts/hom-nay-minh-hoc-duoc-gi.md` → `/blog/hom-nay-minh-hoc-duoc-gi`. Trong Obsidian có thể dùng lệnh **Insert template** (Ctrl/Cmd+P) và chọn `templates/post-template.md` để chèn sẵn khung frontmatter.
2. Thêm frontmatter ở đầu file:

```markdown
---
title: "Tiêu đề bài viết"
description: "Một câu mô tả ngắn, hiện ở trang danh sách."
date: "2026-07-15"
category: "life"
lang: "vi"
tags: ["tag1", "tag2"]
visibility: "public"
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
5. Hai field kiểm soát việc ẩn bài khỏi danh sách, độc lập với nhau (chỉ cần một trong hai là đủ ẩn):
   - `draft: true` — bài đang viết dở, nội dung chưa hoàn chỉnh. Set lại `draft: false` (hoặc bỏ dòng này) khi viết xong.
   - `visibility: "private"` — bài đã viết xong nhưng chủ đích không muốn công khai (ví dụ ghi chú riêng tư trong "bộ não"). Bài vẫn được build thành trang thật ở `/blog/<slug>` (ai có link trực tiếp vẫn xem được) nhưng không hiện ở trang chủ, `/blog`, hay `/category/*`. Bỏ trống field này mặc định là `"public"`.
6. Lưu file, `npm run dev` sẽ tự nhận bài mới. Commit và push khi ưng ý — Vercel sẽ tự build lại.

## Chèn ảnh vào bài viết

1. Mỗi bài có sẵn một folder ảnh riêng tại `public/images/posts/<slug-của-bài>/` (trùng tên file `.md`, không có đuôi). Nếu bài mới chưa có folder, tự tạo thêm (không bắt buộc, chỉ là quy ước cho gọn).
2. Bỏ ảnh vào đúng folder đó, ví dụ `public/images/posts/khoi-dau-cua-mot-hanh-trinh/01.jpg`.
3. Chèn vào nội dung bằng cú pháp Markdown ảnh, đường dẫn bắt đầu từ `/images/posts/...`:

```markdown
![Mô tả ảnh](/images/posts/khoi-dau-cua-mot-hanh-trinh/01.jpg)
```

Ảnh sẽ tự động full-width, bo góc theo style chung của bài viết.

## Thêm category mới

Sửa `lib/categories.ts`, thêm object mới vào mảng `categories` (cần `slug`, `name`, `tagline`). Trang chủ, header và trang `/category/[slug]` sẽ tự động nhận category mới.

## Cấu trúc chính

```
.obsidian/             cấu hình Obsidian vault (gốc repo = vault)
app/                    route pages (home, /blog, /blog/[slug], /category/[slug], /about)
components/             Header, Footer, PostCard, PostList
content/posts/          bài viết dạng Markdown
lib/                    đọc & parse markdown, danh sách category, format ngày
templates/              template bài viết mới cho Obsidian (post-template.md)
```

## Deploy

Push code lên GitHub rồi import repo vào [Vercel](https://vercel.com/new) — không cần cấu hình gì thêm, Vercel tự nhận diện Next.js.
