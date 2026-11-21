import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  content: string;
  canonicalUrl?: string;
  coverImage?: string;
}

/** Post data that is safe to pass to client components (no body). */
export type BlogPostSummary = Omit<BlogPost, "content">;

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function readPost(slug: string, fullPath: string): BlogPost {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    content,
    canonicalUrl: data.canonicalUrl,
    coverImage: data.coverImage,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) =>
      readPost(fileName.replace(/\.(mdx|md)$/, ""), path.join(postsDirectory, fileName))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map((post) => {
    const { content, ...summary } = post;
    void content;
    return summary;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(fullPath)) return null;
  return readPost(slug, fullPath);
}

/** Extracts h2/h3 headings (ids match rehype-slug) for the table of contents. */
export function getHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    // The post body maps h1 to h2, so include h1 as a level-2 entry.
    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    const id = slugger.slug(text);
    const depth = match[1].length;
    headings.push({ id, text, level: depth === 3 ? 3 : 2 });
  }

  return headings;
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}
