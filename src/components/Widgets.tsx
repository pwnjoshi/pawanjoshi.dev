import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";
import { certifications, siteConfig } from "@/lib/content";
import { now } from "@/data/now";
import { ArrowUpRight, BookOpen, Clock, MapPin, Sparkles } from "./Icons";
import { LocalTime } from "./LocalTime";

/** An iOS home-screen style grid of widgets. Two columns on phones, four on desktop. */
export function Widgets({ post }: { post?: BlogPostSummary }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {/* Now: large */}
      <Link
        href="/now"
        data-reveal
        className="widget card-hover group col-span-2 flex min-h-44 flex-col justify-between p-5 md:row-span-2 md:min-h-full"
      >
        <span className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            <Sparkles size={16} /> Now
          </span>
          <ArrowUpRight size={18} className="text-subtle transition group-hover:text-accent" />
        </span>
        <span>
          <span className="block text-xl font-medium leading-snug tracking-tight text-fg sm:text-2xl">{now.focus}</span>
          <span className="mt-2 block text-sm leading-relaxed text-subtle">{now.learning}</span>
        </span>
      </Link>

      {/* Local time */}
      <div data-reveal className="widget flex aspect-square flex-col justify-between p-4" style={{ "--d": "60ms" } as React.CSSProperties}>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-subtle">
          <MapPin size={13} /> Dehradun
        </span>
        <span>
          <LocalTime className="block text-4xl font-medium tabular-nums tracking-tight text-fg" />
          <span className="text-xs text-subtle">India · IST</span>
        </span>
      </div>

      {/* Students mentored */}
      <div
        data-reveal
        className="widget relative flex aspect-square flex-col justify-between overflow-hidden p-4 text-white"
        style={{ "--d": "120ms", background: "linear-gradient(145deg, #0a84ff, #5e5ce6)" } as React.CSSProperties}
      >
        <span className="text-xs font-medium text-white/80">Community</span>
        <span>
          <span className="block text-4xl font-semibold tracking-tight">500+</span>
          <span className="text-xs text-white/85">students mentored in AWS and AI</span>
        </span>
      </div>

      {/* Latest article: cover kept at its own ratio */}
      {post && (
        <Link
          href={`/blog/${post.slug}`}
          data-reveal
          className="widget card-hover group relative col-span-2 flex flex-col overflow-hidden"
          style={{ "--d": "60ms" } as React.CSSProperties}
        >
          {post.coverImage && (
            <span className="relative block aspect-[1000/420] w-full overflow-hidden bg-surface-2">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </span>
          )}
          <span className="flex flex-1 flex-col justify-center px-4 py-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
              <BookOpen size={13} /> Latest article · {post.readingTime}
            </span>
            <span className="mt-1 line-clamp-2 text-[15px] font-medium leading-snug text-fg">{post.title}</span>
          </span>
        </Link>
      )}
      {/* Certifications */}
      <Link
        href="/about#certifications"
        data-reveal
        className="widget card-hover group flex aspect-square flex-col justify-between p-4"
        style={{ "--d": "120ms" } as React.CSSProperties}
      >
        <span className="text-xs font-medium text-subtle">Certified</span>
        <span>
          <span className="block text-4xl font-medium tracking-tight text-fg">{certifications.length}</span>
          <span className="text-xs text-subtle">AWS, Google Cloud, Nebius & more</span>
        </span>
      </Link>

      {/* Tech Sangi */}
      <a
        href={siteConfig.links.techSangi}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className="widget card-hover group flex aspect-square flex-col justify-between p-4"
        style={{ "--d": "180ms" } as React.CSSProperties}
      >
        <span className="flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-xl bg-fg font-mono text-xs font-bold text-bg">TS</span>
          <ArrowUpRight size={16} className="text-subtle transition group-hover:text-accent" />
        </span>
        <span>
          <span className="block text-base font-medium text-fg">Tech Sangi</span>
          <span className="inline-flex items-center gap-1 text-xs text-subtle">
            <Clock size={12} /> Engineering since 2024
          </span>
        </span>
      </a>
    </div>
  );
}
