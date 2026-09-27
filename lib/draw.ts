// Randomness for the card station. crypto.getRandomValues instead of
// Math.random, with rejection sampling so no card is ever slightly favoured.

export function randomInt(n: number): number {
  if (n <= 0) throw new Error("randomInt: n must be positive");
  const limit = Math.floor(0x100000000 / n) * n;
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % n;
  }
}

// Partial Fisher–Yates: k distinct cards, in draw order.
export function drawWithoutReplacement<T>(deck: readonly T[], k: number): T[] {
  const pool = deck.slice();
  const count = Math.min(k, pool.length);
  for (let i = 0; i < count; i++) {
    const j = i + randomInt(pool.length - i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function coinFlip(): boolean {
  return randomInt(2) === 1;
}
