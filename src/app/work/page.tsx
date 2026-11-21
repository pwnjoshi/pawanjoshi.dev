import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, projectsSchema, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, GitHub } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { moreProjects, projects, siteConfig } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Work and projects",
  description:
    "Projects by Pawan Joshi in AI agents, serverless AWS platforms and full-stack engineering, with architecture, trade-offs and results.",
  path: "/work",
});

const primaryLinks: Record<string, string> = {
  "aws-sbg-portal": "Live site",
  "autonomous-cognitive-engine": "Internship certificate",
  "tech-sangi-platform": "Tech Sangi",
};

export default function WorkPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/work", name: "Projects by Pawan Joshi", description: "AI agent, cloud and full-stack projects by Pawan Joshi.", type: "CollectionPage" }), breadcrumbSchema([{ name: "Work", path: "/work" }]), projectsSchema()]} />
      <PageHeader eyebrow="Work" title="Work">
        <p>Projects I built end to end.</p>
      </PageHeader>

      <div className="container-x pb-10 pt-4 md:py-14">
        <div className="space-y-3 md:space-y-10">
          {projects.map((project, index) => (
            <article
              data-reveal
              key={project.id}
              id={project.id}
              aria-labelledby={`title-${project.id}`}
              className="widget card-hover group scroll-mt-20 overflow-hidden"
            >
              <div className="relative h-32 border-b border-line md:h-64 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%)]">
                <div className="absolute inset-2 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:inset-6">
                  <ArchitectureDiagram nodes={project.skills} seed={index} />
                </div>
                <span className="pointer-events-none absolute -bottom-5 right-4 select-none text-6xl font-medium leading-none tracking-tighter text-fg/[0.05] md:text-9xl" aria-hidden="true">
                  {project.number}
                </span>
              </div>
              <div className="p-4 md:p-8">
              <p className="text-xs text-subtle md:text-sm">{project.category}</p>
              <h2 id={`title-${project.id}`} className="mt-1 text-lg font-medium leading-snug tracking-tight text-fg md:mt-1.5 md:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted md:mt-3 md:text-base">{project.contribution}</p>

              <ul className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:grid md:grid-cols-2 md:gap-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <li key={metric} className="rounded-full bg-fg/[0.06] px-3 py-1 text-xs text-fg md:rounded-xl md:bg-bg md:px-4 md:py-3 md:text-[15px]">{metric}</li>
                ))}
              </ul>

              <ul className="mt-4 hidden flex-wrap gap-1.5 md:mt-5 md:flex" aria-label="Technologies">
                {project.skills.map((skill) => (
                  <li key={skill} className="chip">{skill}</li>
                ))}
              </ul>

              <details className="group/details mt-3 border-t border-line pt-1 md:mt-5 md:pt-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm text-fg md:text-[15px]">
                  How it works
                  <ChevronRight size={18} className="text-subtle transition group-open/details:rotate-90" />
                </summary>
                <div className="space-y-3 pb-2 pt-1 text-sm leading-relaxed text-muted md:space-y-4 md:text-[15px]">
                  <p>{project.description}</p>
                  <p><span className="text-fg">Architecture. </span>{project.architecture}</p>
                  <p><span className="text-fg">Trade-offs. </span>{project.tradeoffs}</p>
                </div>
              </details>

              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2">
                {primaryLinks[project.id] && (
                  <a className="link-arrow" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {primaryLinks[project.id]} <ArrowUpRight size={14} />
                  </a>
                )}
                {project.sourceUrl !== siteConfig.links.github && (
                  <a className="link-arrow" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <GitHub size={14} /> Source
                  </a>
                )}
              </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 md:mt-24" aria-labelledby="more-title">
          <h2 id="more-title" className="h-section">More projects</h2>
          <ul className="widget mt-4 divide-y divide-line overflow-hidden md:mt-5" data-reveal>
            {moreProjects.map((project) => (
              <li key={project.id} className="px-4 py-3.5 md:px-5 md:py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-subtle">{project.category}</p>
                    <h3 className="mt-0.5 font-medium text-fg">{project.title}</h3>
                  </div>
                  <div className="-mr-2 -mt-1.5 flex shrink-0 items-center">
                    <a className="pressable grid size-11 place-items-center rounded-full text-accent hover:bg-fg/5" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
                      <GitHub size={16} />
                    </a>
                    {project.liveUrl && (
                      <a className="pressable grid size-11 place-items-center rounded-full text-accent hover:bg-fg/5" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`}>
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted md:mt-2 md:line-clamp-none md:text-sm">{project.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !rounded-full">
            <GitHub size={16} /> More on GitHub
          </a>
          <Link href="/contact" className="btn btn-primary !rounded-full">Contact</Link>
        </div>
      </div>
    </>
  );
}
