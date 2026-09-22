/**
 * Static keyword/pattern list for auto-flagging (never auto-blocking —
 * comments still publish immediately per product decision). This only
 * exists to help the owner triage in /admin, not to police speech.
 */
const BLOCKLIST: string[] = [
  // Vietnamese spam-comment vocabulary
  "vay tiền nhanh",
  "vay tiền online",
  "làm giàu nhanh",
  "kiếm tiền online",
  "casino",
  "cá độ",
  "xổ số",
  "mua ngay giá rẻ",
  "click vào đây",
  // Common profanity (Vietnamese + English), kept short and unambiguous
  "địt",
  "đụ",
  "cặc",
  "lồn",
  "fuck",
  "shit",
];

const LINK_PATTERN = /https?:\/\/|www\./i;

export function checkContent(
  content: string,
  authorName: string
): { flagged: boolean; reason?: string } {
  const haystack = `${authorName} ${content}`.toLowerCase();

  const matchedKeyword = BLOCKLIST.find((word) => haystack.includes(word));
  if (matchedKeyword) {
    return { flagged: true, reason: `keyword:${matchedKeyword}` };
  }

  if (LINK_PATTERN.test(content)) {
    return { flagged: true, reason: "link" };
  }

  return { flagged: false };
}
