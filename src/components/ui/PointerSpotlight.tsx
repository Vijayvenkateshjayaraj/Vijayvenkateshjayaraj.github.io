"use client";

import { useEffect } from "react";

// Feeds the pointer position into any `.spot` element as --mx/--my so its glow follows the cursor.
export function PointerSpotlight() {
  useEffect(() => {
    let frame = 0;
    let latest: PointerEvent | null = null;

    // Pointer events can fire faster than the screen refreshes, so apply at most one update per frame.
    const apply = () => {
      frame = 0;
      const event = latest;
      if (!event) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".spot") : null;
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--my", `${event.clientY - bounds.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
