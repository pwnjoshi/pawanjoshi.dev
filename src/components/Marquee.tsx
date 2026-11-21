import { techStack } from "@/lib/content";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
      <ul className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className={`rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted ${index >= items.length ? "marquee-dup" : ""}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two slowly scrolling rows of technologies. Pauses on hover. */
export function Marquee() {
  const all = Array.from(new Set(Object.values(techStack).flatMap((stack) => stack.items)));
  const half = Math.ceil(all.length / 2);
  return (
    <div className="space-y-3" aria-label="Technologies I work with" role="group">
      <Row items={all.slice(0, half)} />
      <Row items={all.slice(half)} reverse />
    </div>
  );
}
