"use client";

import { useEffect, useRef, useState } from "react";
import { getOrCreateClientId } from "@/lib/client/anonId";
import { formatDate } from "@/lib/format";
import type { PublicComment } from "@/lib/comments";

export default function CommentSection({
  postSlug,
  initialComments,
}: {
  postSlug: string;
  initialComments: PublicComment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    const formEl = e.currentTarget as HTMLFormElement;
    const honeypot = (formEl.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          postSlug,
          clientId: getOrCreateClientId(),
          authorName,
          content,
          website: honeypot,
          renderedAt: renderedAt.current,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Có lỗi xảy ra, thử lại sau.");
        return;
      }

      setComments((prev) => [...prev, data]);
      setContent("");
    } catch {
      setError("Không gửi được bình luận, kiểm tra kết nối rồi thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-4">
        Bình luận {comments.length > 0 && `(${comments.length})`}
      </h2>

      {comments.length > 0 && (
        <ul className="mb-6 flex flex-col gap-4">
          {comments.map((c) => (
            <li key={c.id} id={`comment-${c.id}`} className="border-b border-forest/15 pb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-forest-deep text-sm">{c.authorName}</span>
                <span className="text-[11px] text-ink/45">{formatDate(c.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-ink/85 leading-relaxed">
                {c.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 max-w-[480px]">
        {/* Honeypot — real visitors never see or fill this. Not display:none,
            some bots skip fields that are. */}
        <div
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Trang web</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Tên của bạn (không bắt buộc)"
          maxLength={80}
          className="rounded-[3px] border border-forest/15 bg-cream py-2 px-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-terracotta/60"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Để lại vài dòng..."
          required
          maxLength={2000}
          rows={3}
          className="rounded-[3px] border border-forest/15 bg-cream py-2 px-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-terracotta/60"
        />
        {error && <p className="text-[13px] text-terracotta">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="self-start text-[13px] font-bold text-terracotta hover:underline disabled:opacity-50 disabled:hover:no-underline"
        >
          {submitting ? "Đang gửi..." : "Gửi bình luận →"}
        </button>
      </form>
    </div>
  );
}
