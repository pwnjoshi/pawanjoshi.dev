"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

const narrowViewport = "(max-width: 760px)";
const motionPreference = "(prefers-reduced-motion: reduce)";

function paintShockwave(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  progress: number,
  isNarrow: boolean,
) {
  const stripCount = isNarrow ? 6 : 12;
  const displacement = isNarrow ? 14 : 36;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const imageWidth = image.naturalWidth * scale;
  const imageHeight = image.naturalHeight * scale;
  const imageX = (width - imageWidth) / 2;
  const imageY = (height - imageHeight) / 2;
  const stripHeight = height / stripCount;
  const front = (progress * 1.7 - 0.35) * height;
  const slant = height * 0.16;

  ctx.fillStyle = "#101610";
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < stripCount; index++) {
    const top = index * stripHeight;
    const distance = (front - top - stripHeight / 2) / height;
    const envelope = Math.max(0, 1 - Math.abs(distance) / 0.28) ** 2;
    const direction = index % 2 === 0 ? 1 : -1;
    const shift = direction * displacement * envelope * Math.cos(distance * 19);

    // Clip in destination space so responsive image density cannot shift the crop.
    ctx.save();
    ctx.beginPath();
    ctx.rect(Math.max(0, shift), top, width - Math.abs(shift), stripHeight + 0.5);
    ctx.clip();
    ctx.drawImage(image, imageX + shift, imageY, imageWidth, imageHeight);
    ctx.restore();

    if (Math.abs(shift) > 0.5) {
      ctx.fillStyle = `rgba(199, 238, 128, ${envelope * 0.68})`;
      ctx.fillRect(Math.max(0, shift), top, width - Math.abs(shift), 1);
    }
  }

  const light = ctx.createLinearGradient(0, front - 22, 0, front + 22);
  light.addColorStop(0, "rgba(199, 238, 128, 0)");
  light.addColorStop(0.5, "rgba(199, 238, 128, 0.24)");
  light.addColorStop(1, "rgba(199, 238, 128, 0)");
  ctx.save();
  ctx.transform(1, -slant / width, 0, 1, 0, slant / 2);
  ctx.fillStyle = light;
  ctx.fillRect(0, front - 22, width, 44);
  ctx.fillStyle = "rgba(226, 255, 181, 0.94)";
  ctx.fillRect(0, front, width, 1.5);
  ctx.restore();
}

export function PortraitShockwave({
  children,
  location,
}: {
  children: ReactNode;
  location: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replayRef = useRef<(() => void) | null>(null);
  const hasPlayed = useRef(false);
  const [canReplay, setCanReplay] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const image = frame?.querySelector("img");
    const ctx = canvas?.getContext("2d");
    if (!frame || !canvas || !image || !ctx || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia(motionPreference);
    const narrow = window.matchMedia(narrowViewport);
    let animationFrame = 0;
    let decoded = false;
    let visible = false;
    let disposed = false;

    function stop() {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (canvas && ctx) {
        canvas.removeAttribute("data-playing");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    function play() {
      if (!frame || !canvas || !image || !ctx || !visible || !decoded ||
          reducedMotion.matches || document.hidden || !image.naturalWidth) return;

      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      stop();
      hasPlayed.current = true;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(bounds.width * density);
      canvas.height = Math.round(bounds.height * density);
      ctx.setTransform(canvas.width / bounds.width, 0, 0, canvas.height / bounds.height, 0, 0);
      const isNarrow = narrow.matches;
      const duration = isNarrow ? 550 : 850;
      const start = performance.now();

      animationFrame = requestAnimationFrame(function tick(now) {
        const progress = Math.max(0, (now - start) / duration);
        if (progress >= 1 || document.hidden || reducedMotion.matches) {
          stop();
          return;
        }

        paintShockwave(ctx, image, bounds.width, bounds.height, progress, isNarrow);
        canvas.toggleAttribute("data-playing", true);
        animationFrame = requestAnimationFrame(tick);
      });
    }

    function updatePlayback() {
      if (!visible || !decoded || reducedMotion.matches || document.hidden) {
        if (animationFrame) stop();
        return;
      }

      if (!hasPlayed.current) play();
    }

    async function decodePortrait() {
      if (!image?.complete || !image.naturalWidth) return;
      const source = image.currentSrc;
      try {
        await image.decode();
      } catch {
        return;
      }
      if (disposed || image.currentSrc !== source) return;
      decoded = true;
      setCanReplay(!reducedMotion.matches);
      updatePlayback();
    }

    function handleMotionChange() {
      setCanReplay(decoded && !reducedMotion.matches);
      updatePlayback();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      updatePlayback();
    }, { threshold: 0.15 });
    observer.observe(frame);

    replayRef.current = play;
    image.addEventListener("load", decodePortrait);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", updatePlayback);
    window.addEventListener("resize", stop);
    void decodePortrait();

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      replayRef.current = null;
      image.removeEventListener("load", decodePortrait);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", updatePlayback);
      window.removeEventListener("resize", stop);
    };
  }, []);

  return (
    <figure className="hero-portrait">
      <div ref={frameRef} className="portrait-frame">
        {children}
        <canvas ref={canvasRef} className="portrait-shockwave" aria-hidden="true" />
      </div>
      <figcaption className="portfolio-meta portrait-caption">
        <span>{location} <span className="portrait-timezone">· UTC+05:30</span></span>
        <button
          type="button"
          className="portrait-replay"
          disabled={!canReplay}
          onClick={() => replayRef.current?.()}
        >
          Replay effect
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3.5v4h4M2.2 7.2a5.8 5.8 0 1 1 1.6 4.9" />
          </svg>
        </button>
      </figcaption>
    </figure>
  );
}
