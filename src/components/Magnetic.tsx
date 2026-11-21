"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Nudges its child toward the cursor while the cursor is over it.
 * The offset is capped so neighbouring buttons can never overlap.
 */
export function Magnetic({
  children,
  strength = 0.2,
  max = 4,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const margin = 0;
    let frame = 0;
    let x = 0;
    let y = 0;
    let rect: DOMRect | null = null;

    const apply = () => {
      frame = 0;
      if (!rect) {
        const previous = element.style.transform;
        element.style.transform = "";
        rect = element.getBoundingClientRect();
        element.style.transform = previous;
      }
      const inside =
        x > rect.left - margin && x < rect.right + margin && y > rect.top - margin && y < rect.bottom + margin;
      if (!inside) {
        element.style.transform = "";
        return;
      }
      const clamp = (value: number) => Math.max(-max, Math.min(max, value));
      const dx = clamp((x - (rect.left + rect.width / 2)) * strength);
      const dy = clamp((y - (rect.top + rect.height / 2)) * strength);
      element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const invalidate = () => {
      rect = null;
    };
    const reset = () => {
      element.style.transform = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength, max]);

  return (
    <span ref={ref} className={cn("block transition-transform duration-300 ease-out", className)}>
      {children}
    </span>
  );
}
