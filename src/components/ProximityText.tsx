"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Large text whose letters thicken as the cursor gets close (variable font weight),
 * and that slides in letter by letter on load. Letter centers are measured once per
 * scroll or resize, never inside the pointer loop, to avoid layout thrashing.
 */
export function ProximityText({
  text,
  className,
  radius = 230,
  min = 430,
  max = 820,
  delay = 0,
}: {
  text: string;
  className?: string;
  radius?: number;
  min?: number;
  max?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    let centers: { x: number; y: number }[] = [];
    let weights = letters.map(() => min);
    let frame = 0;
    let x = -9999;
    let y = -9999;
    let stale = true;

    const measure = () => {
      centers = letters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
      stale = false;
    };

    const apply = () => {
      frame = 0;
      if (stale) measure();
      const next = centers.map((c) => {
        const t = Math.max(0, 1 - Math.hypot(x - c.x, y - c.y) / radius);
        return Math.round((min + (max - min) * t * t) / 10) * 10;
      });
      next.forEach((weight, i) => {
        if (weight !== weights[i]) letters[i].style.fontWeight = String(weight);
      });
      weights = next;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const invalidate = () => {
      stale = true;
    };
    const reset = () => {
      x = y = -9999;
      if (!frame) frame = requestAnimationFrame(apply);
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
  }, [radius, min, max]);

  const words = text.split(" ");
  let index = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className={cn("inline-block", className)}>
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block whitespace-nowrap"
            style={wordIndex < words.length - 1 ? { marginRight: "0.24em" } : undefined}
          >
            {word.split("").map((char) => {
              const i = index++;
              return (
                <span
                  key={i}
                  data-letter
                  className="letter-in"
                  style={{ fontWeight: min, animationDelay: `${delay + i * 50}ms` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
