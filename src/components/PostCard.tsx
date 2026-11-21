import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPostSummary;
  priority?: boolean;
}) {
  return (
    <article className="widget card-hover group relative flex flex-col overflow-hidden">
      {post.coverImage ? (
        <div className="relative aspect-[1000/420] w-full overflow-hidden bg-surface-2">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="aspect-[1000/420] w-full bg-accent-soft" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
        <h3 className="mt-2 text-base font-medium leading-snug tracking-tight text-fg sm:text-lg">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
