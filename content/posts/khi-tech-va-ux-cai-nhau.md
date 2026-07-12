---
title: "Khi Tech và UX cãi nhau"
description: "Một tính năng kỹ thuật hoàn hảo vẫn có thể là một trải nghiệm tồi. Vài ghi chú sau khi va vào chuyện này."
date: "2026-07-05"
category: "tram-va-loi"
lang: "vi"
tags: ["ux", "product"]
---

Có một sự thật hơi khó chịu: đội kỹ thuật có thể ship một tính năng đúng spec, chạy đúng logic, không có bug — và người dùng vẫn ghét nó.

## Đúng kỹ thuật không có nghĩa là đúng trải nghiệm

Ví dụ kinh điển: một form validate lỗi ngay khi người dùng gõ ký tự đầu tiên. Về mặt kỹ thuật, validate sớm giúp bắt lỗi nhanh. Về mặt trải nghiệm, nó khiến người dùng cảm thấy bị "chỉ trích" trước khi họ kịp gõ xong.

Vài nguyên tắc mình đang thử áp dụng:

1. **Validate theo ngữ cảnh**, không phải theo khả năng kỹ thuật cho phép.
2. **Lỗi hệ thống không nên là lỗi của người dùng** — thông báo cần phân biệt rõ hai loại này.
3. **Tốc độ không phải lúc nào cũng là điều người dùng đánh giá cao nhất** — đôi khi họ cần một khoảng dừng để hiểu chuyện gì đang xảy ra.

## Trạm vá lỗi

Đây là lý do chuyên mục này tên là "Trạm Vá Lỗi" — không phải để đổ lỗi cho ai, mà để dừng lại sửa những chỗ mà kỹ thuật và trải nghiệm đang không nói chuyện được với nhau.
