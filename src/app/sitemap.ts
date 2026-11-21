import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const base = siteConfig.url;
  const latestPost = posts[0]?.date ? new Date(posts[0].date) : new Date();
  const now = new Date();
  const portrait = `${base}/hero-avatar.png`;

  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1, images: [portrait] },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9, images: [portrait] },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.8,
    ...(post.coverImage ? { images: [post.coverImage] } : {}),
  }));

  return [...pages, ...articles];
}
