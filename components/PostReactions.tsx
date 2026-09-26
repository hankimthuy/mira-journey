"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { getOrCreateClientId } from "@/lib/client/anonId";

type Reactions = {
  count: number;
  liked: boolean;
  justLiked: boolean;
  like: () => void;
  title: string;
};

const ReactionsContext = createContext<Reactions | null>(null);

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function readLiked(postSlug: string) {
  try {
    return localStorage.getItem(`liked:${postSlug}`) === "1";
  } catch {
    return false;
  }
}

// One like state per post, shared by every <PostActions> inside it (top and
// bottom of the article stay in sync).
export function ReactionsProvider({
  postSlug,
  title,
  initialCount,
  children,
}: {
  postSlug: string;
  title: string;
  initialCount: number;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(initialCount);
  // A same-tab localStorage write doesn't fire "storage", so this flag is
  // what flips the UI instantly after this tab's own click.
  const [justLiked, setJustLiked] = useState(false);
  const storedLiked = useSyncExternalStore(
    subscribeToStorage,
    () => readLiked(postSlug),
    () => false
  );
  const liked = storedLiked || justLiked;

  async function like() {
    if (liked) return;
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
      setJustLiked(false);
      setCount((c) => Math.max(0, c - 1));
    }
  }

  return (
    <ReactionsContext.Provider value={{ count, liked, justLiked, like, title }}>
      {children}
    </ReactionsContext.Provider>
  );
}

export function PostActions({ className = "" }: { className?: string }) {
  const ctx = useContext(ReactionsContext);
  const [copied, setCopied] = useState(false);
  if (!ctx) return null;
  const { count, liked, justLiked, like, title } = ctx;

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  const likeLabel = liked ? "Đã thả tim" : "Thả tim";
  const shareLabel = copied ? "Đã sao chép link" : "Chia sẻ bài viết";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={like}
        aria-pressed={liked}
        aria-label={`${likeLabel} (${count})`}
        data-tip={likeLabel}
        data-liked={liked}
        className="icon-action tip"
      >
        <span className="relative inline-flex">
          <svg
            viewBox="0 0 24 24"
            className="like-heart h-[18px] w-[18px]"
            fill={liked ? "currentColor" : "none"}
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
          {justLiked && (
            <span className="heart-burst" aria-hidden="true">
              <span className="heart-particle" />
              <span className="heart-particle" />
              <span className="heart-particle" />
              <span className="heart-particle" />
            </span>
          )}
        </span>
        <span className="like-count" aria-hidden="true">
          {count}
        </span>
      </button>
      <button
        type="button"
        onClick={share}
        aria-label={shareLabel}
        data-tip={shareLabel}
        className="icon-action tip"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[17px] w-[17px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 15V3M12 3 7.5 7.5M12 3l4.5 4.5" />
          <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
        </svg>
      </button>
    </div>
  );
}
