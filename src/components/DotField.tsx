"use client";

import { useEffect, useRef } from "react";

function toRgb(value: string): string {
  const hex = value.trim().replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return "128,128,128";
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/** A grid of dots that swell and drift away from the cursor. */
export function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gap = 30;
    const radius = 180;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let fg = "128,128,128";
    let accent = "41,151,255";

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      fg = toRgb(styles.getPropertyValue("--fg"));
      accent = toRgb(styles.getPropertyValue("--accent"));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * gap;
          const py = j * gap;
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.hypot(dx, dy);
          const t = dist < radius ? 1 - dist / radius : 0;
          const ease = t * t * (3 - 2 * t);
          const push = ease * 12;
          const ox = dist > 0 ? (dx / dist) * push : 0;
          const oy = dist > 0 ? (dy / dist) * push : 0;
          ctx.fillStyle =
            ease > 0.02 ? `rgba(${accent},${0.2 + ease * 0.75})` : `rgba(${fg},0.22)`;
          ctx.beginPath();
          ctx.arc(px + ox, py + oy, 1.2 + ease * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;
      draw();
      const moving = Math.abs(mouse.tx - mouse.x) > 0.5 || Math.abs(mouse.ty - mouse.y) > 0.5;
      frame = moving && visible ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!frame && visible) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - rect.left;
      mouse.ty = event.clientY - rect.top;
      if (mouse.x < -1000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      kick();
    };
    const onLeave = () => {
      mouse.x = mouse.tx = -9999;
      mouse.y = mouse.ty = -9999;
      draw();
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    intersection.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    return () => {
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
