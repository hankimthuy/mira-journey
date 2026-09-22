"use client";

import { useState, useSyncExternalStore } from "react";
import { getOrCreateClientId } from "@/lib/client/anonId";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="like-heart h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.3.9-1.6 2.9-2.6 4.9-2.3C18.9 4.5 20.4 8 19.9 11.2c-2.5 4.7-7.9 9.3-7.9 9.3Z"
      />
    </svg>
  );
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerLikedSnapshot() {
  return false;
}

export default function LikeButton({
  postSlug,
  initialCount,
}: {
  postSlug: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);
  // Same-tab optimistic override — a same-tab localStorage write doesn't fire
  // the "storage" event, so this is what makes the button update instantly
  // after this tab's own click (useSyncExternalStore alone would only catch
  // a write made from another tab).
  const [justLiked, setJustLiked] = useState(false);

  const storedLiked = useSyncExternalStore(
    subscribeToStorage,
    () => {
      try {
        return localStorage.getItem(`liked:${postSlug}`) === "1";
      } catch {
        return false;
      }
    },
    getServerLikedSnapshot
  );
  const liked = storedLiked || justLiked;

  async function handleClick() {
    if (liked || pending) return;
    setPending(true);
    setJustLiked(true);
    setCount((c) => c + 1);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ postSlug, clientId: getOrCreateClientId() }),
      });
      if (!res.ok) throw new Error("request failed");

      try {
        localStorage.setItem(`liked:${postSlug}`, "1");
      } catch {
        // Non-fatal — the like still went through server-side.
      }
    } catch {
      // A real user action failed — roll back visibly, unlike Analytics'
      // silent swallow.
      setJustLiked(false);
      setCount((c) => Math.max(0, c - 1));
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={liked || pending}
      data-liked={liked}
      aria-pressed={liked}
      className={`like-stamp inline-flex items-center gap-1.5 rounded-[3px] border px-3 py-1.5 text-[13px] font-bold uppercase tracking-wide disabled:cursor-default ${
        liked
          ? "border-terracotta bg-terracotta text-cream"
          : "border-forest/15 text-forest-deep hover:border-terracotta/50"
      }`}
    >
      <span className="relative inline-flex">
        <HeartIcon filled={liked} />
        {justLiked && (
          <span className="heart-burst" aria-hidden="true">
            <span className="heart-particle" />
            <span className="heart-particle" />
            <span className="heart-particle" />
            <span className="heart-particle" />
          </span>
        )}
      </span>
      {liked ? "Đã thả tim" : "Thả tim"}
      <span
        className={`like-count ${liked ? "text-cream/85" : "text-ink/50"}`}
      >
        {count}
      </span>
    </button>
  );
}
