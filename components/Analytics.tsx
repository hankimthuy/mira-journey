"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Reports pageviews to the admin app's collector.
 *
 * Inline rather than an external script tag: there is no extra request for a
 * blocker to recognise, and nothing to load before tracking works.
 *
 * Renders nothing unless NEXT_PUBLIC_ANALYTICS_URL is set, so local dev and
 * preview deploys stay out of the real numbers.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_URL;

/**
 * text/plain keeps this a CORS "simple request". application/json would force
 * a preflight, and sendBeacon cannot preflight — the duration report would be
 * dropped silently. The server parses the body as JSON either way.
 */
const TYPE = "text/plain;charset=UTF-8";

export default function Analytics() {
  const pathname = usePathname();
  const eventId = useRef<string | null>(null);

  useEffect(() => {
    if (!ENDPOINT) return;

    let active = true;
    const openedAt = Date.now();
    eventId.current = null;

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": TYPE },
      body: JSON.stringify({ path: pathname, referrer: document.referrer }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) eventId.current = data?.id ?? null;
      })
      .catch(() => {
        // A failed beacon must never surface to the reader.
      });

    // Nulling the id first makes this idempotent: visibilitychange and pagehide
    // both fire on mobile, and the effect cleanup fires again on navigation.
    const report = () => {
      const id = eventId.current;
      if (!id) return;
      eventId.current = null;
      navigator.sendBeacon?.(
        ENDPOINT,
        new Blob(
          [
            JSON.stringify({
              id,
              duration: Math.round((Date.now() - openedAt) / 1000),
            }),
          ],
          { type: TYPE }
        )
      );
    };

    const onHide = () => {
      if (document.visibilityState === "hidden") report();
    };

    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", report);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", report);
      report();
    };
  }, [pathname]);

  return null;
}
