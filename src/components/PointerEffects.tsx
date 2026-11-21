"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, summary, .card-hover";

/**
 * Mouse-driven effects for desktop pointers:
 * - a soft glow that follows the cursor across the whole page
 * - a spotlight that tracks the cursor inside any `.card-hover` element
 * - a trailing ring that grows over links, buttons and cards
 */
export function PointerEffects() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const ringEl = ring.current;
    let frame = 0;
    let ringFrame = 0;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let scale = 1;
    let targetScale = 1;
    let card: HTMLElement | null = null;
    let started = false;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--gx", `${x}px`);
      root.style.setProperty("--gy", `${y}px`);
      root.dataset.pointer = "active";
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${x - rect.left}px`);
        card.style.setProperty("--my", `${y - rect.top}px`);
      }
    };

    const tickRing = () => {
      if (!ringEl) return;
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      scale += (targetScale - scale) * 0.2;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      const settled =
        Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1 && Math.abs(targetScale - scale) < 0.01;
      ringFrame = settled ? 0 : requestAnimationFrame(tickRing);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!started) {
        rx = x;
        ry = y;
        started = true;
      }
      const target = event.target instanceof Element ? event.target : null;
      card = target?.closest<HTMLElement>(".card-hover") ?? null;
      const interactive = Boolean(target?.closest(INTERACTIVE));
      targetScale = interactive ? 1.4 : 1;
      if (ringEl) ringEl.dataset.hover = String(interactive);
      if (!frame) frame = requestAnimationFrame(apply);
      if (!ringFrame) ringFrame = requestAnimationFrame(tickRing);
    };
    const onLeave = () => {
      delete root.dataset.pointer;
      started = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      if (ringFrame) cancelAnimationFrame(ringFrame);
      delete root.dataset.pointer;
    };
  }, []);

  return (
    <>
      <div className="pointer-glow" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
