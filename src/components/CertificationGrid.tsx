import type { certifications } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

type Certification = (typeof certifications)[number];

/** Grouped list, like iOS Settings. */
export function CertificationGrid({ items }: { items: Certification[] }) {
  return (
    <ul className="card divide-y divide-line overflow-hidden rounded-2xl md:grid md:grid-cols-2 md:divide-y-0">
      {items.map((cert, index) => (
        <li key={cert.id} className={index > 1 ? "md:border-t md:border-line" : ""}>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3 transition hover:bg-surface-2"
          >
            <span className="min-w-0">
              <span className="block text-[15px] leading-snug text-fg">{cert.title}</span>
              <span className="mt-0.5 block text-xs text-subtle">{cert.issuer} · {cert.issued}</span>
            </span>
            <ArrowUpRight size={16} className="shrink-0 text-subtle group-hover:text-accent" />
          </a>
        </li>
      ))}
    </ul>
  );
}
