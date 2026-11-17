import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, projects } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pawan Joshi — Software Engineer",
  description: siteConfig.description,
};

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      {/* Hero */}
      <section className="mb-24">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-6">
          Dehradun, India
        </p>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-100 mb-6 leading-[1.1]">
          Pawan Joshi
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-4">
          Software engineer specializing in autonomous AI agents and cloud
          infrastructure.
        </p>
        <p className="text-sm text-neutral-600 max-w-xl leading-relaxed mb-10">
          Co-Founder at{" "}
          <Link
            href="https://techsangi.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2 decoration-neutral-800"
          >
            Tech Sangi
          </Link>
          , founding leader of the AWS Student Builder Group at Graphic Era
          University, and former AI Engineering Intern at Infosys Springboard.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/work"
            className="text-sm text-neutral-100 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-md transition-colors"
          >
            View Work
          </Link>
          <Link
            href="/resume"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Résumé →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-24 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-medium text-neutral-100 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-neutral-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Selected Work */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-0">
          {projects.slice(0, 3).map((project, i) => (
            <div
              key={project.id}
              className={`py-6 ${i < 2 ? "border-b border-neutral-900" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-neutral-700">
                      {project.number}
                    </span>
                    <span className="text-xs text-neutral-700">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-neutral-200 mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
                    >
                      Live
                      <ArrowUpRight size={10} />
                    </Link>
                  )}
                  {project.sourceUrl && (
                    <Link
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
                    >
                      Source
                      <ArrowUpRight size={10} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      {recentPosts.length > 0 && (
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase">
              Latest Writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              All articles →
            </Link>
          </div>
          <div className="space-y-0">
            {recentPosts.map((post, i) => (
              <div
                key={post.slug}
                className={`py-5 ${i < recentPosts.length - 1 ? "border-b border-neutral-900" : ""}`}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono text-neutral-700 mb-1">
                        {post.date}
                      </p>
                      <h3 className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      {post.tags.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-neutral-700 font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-neutral-700 group-hover:text-neutral-500 transition-colors shrink-0 mt-0.5">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="border border-neutral-900 rounded-lg p-8">
        <h2 className="text-lg font-medium text-neutral-200 mb-2 tracking-tight">
          Let&apos;s build together.
        </h2>
        <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
          Have an engineering opportunity, a research inquiry, or a cloud
          architecture project? I&apos;d love to hear about it.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="mailto:me@joshipawan.com.np"
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            me@joshipawan.com.np
          </Link>
          <span className="text-neutral-800">·</span>
          <Link
            href="/contact"
            className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Contact page →
          </Link>
        </div>
      </section>
    </div>
  );
}
