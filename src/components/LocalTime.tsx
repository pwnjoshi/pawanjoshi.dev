"use client";

import { useEffect, useState } from "react";

const format = (date: Date) =>
  new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(date);

/** Live time in Dehradun (IST). Renders a placeholder on the server to avoid a hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
