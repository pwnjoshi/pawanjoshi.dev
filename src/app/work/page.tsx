import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/content";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production systems built from scratch — from distributed cloud portals to low-level C backends and autonomous agent frameworks.",
};

export default function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
          02 — Selected Work
        </p>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-4">
          Projects & Systems
        </h1>
        <p className="text-neutral-500 max-w-lg leading-relaxed">
          Production systems built from scratch — from distributed cloud portals
          to low-level C backends and autonomous agent frameworks.
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((project) => (
          <article key={project.id} className="group">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-neutral-700">
                  {project.number}
                </span>
                <span className="text-xs text-neutral-700 uppercase tracking-wider">
                  — {project.category}
                </span>
              </div>
              <h2 className="text-xl font-medium text-neutral-100 tracking-tight mb-3">
                {project.title}
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-neutral-900/50 border border-neutral-900 rounded-md">
              {project.metrics.map((metric) => (
                <div key={metric} className="text-center">
                  <p className="text-xs text-neutral-500 leading-tight">
                    {metric}
                  </p>
                </div>
              ))}
            </div>

            {/* Long description */}
            <div className="prose prose-sm mb-6">
              <div
                className="text-sm text-neutral-500 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{
                  __html: project.longDescription
                    .split("\n\n")
                    .map((para) => {
                      // Convert **bold** to <strong>
                      const formatted = para.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='text-neutral-300 font-medium'>$1</strong>"
                      );
                      if (para.startsWith("- ")) {
                        const items = para
                          .split("\n")
                          .filter((l) => l.startsWith("- "))
                          .map((l) => `<li>${l.slice(2)}</li>`)
                          .join("");
                        return `<ul class='list-disc list-inside space-y-1'>${items}</ul>`;
                      }
                      return `<p>${formatted}</p>`;
                    })
                    .join(""),
                }}
              />
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 pt-4 border-t border-neutral-900">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Live Project
                  <ArrowUpRight size={10} />
                </Link>
              )}
              {project.sourceUrl && (
                <Link
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Source Code
                  <ArrowUpRight size={10} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
