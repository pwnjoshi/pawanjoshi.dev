"use client";

import { useEffect, useRef } from "react";

/** A paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((span) => (span.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.85 - rect.top) / (vh * 0.4 + rect.height), 0), 1);
      const total = spans.length;
      spans.forEach((span, i) => {
        const local = Math.min(Math.max(progress * (total + 4) - i, 0), 1);
        span.style.opacity = String(0.2 + 0.8 * local);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word className="scroll-word">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
