import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, personSummary, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Download, GitHub, LinkedIn, Mail, MapPin } from "@/components/Icons";
import { certifications, education, experience, projects, siteConfig, stats, techStack } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description:
    "Résumé of Pawan Joshi: experience at Tech Sangi and Infosys Springboard, AI and cloud projects, certifications and skills.",
  path: "/resume",
  ogType: "profile",
});

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[180px_1fr] md:gap-10">
      <h2 className="eyebrow">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/resume", name: "Résumé of Pawan Joshi", description: personSummary, type: "ProfilePage" }), breadcrumbSchema([{ name: "Résumé", path: "/resume" }])]} />
      <div className="no-print">
        <PageHeader
          eyebrow="Résumé"
          title="Pawan Joshi"
          actions={
            <>
              <a href="/Pawan_Joshi_Resume.pdf" download className="btn btn-primary">
                <Download size={16} /> Download PDF
              </a>
              <Link href="/contact" className="btn btn-secondary">Contact</Link>
            </>
          }
        >
          <p>Student · AI agents and cloud systems</p>
        </PageHeader>
      </div>

      <div className="container-x print-plain pb-10 pt-4 md:py-14">
        <div className="mx-auto max-w-4xl">
          <header className="hidden print:block">
            <p className="text-3xl font-bold">Pawan Joshi</p>
            <p>Student · AI agents and cloud systems</p>
          </header>

          <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-2"><Mail size={15} /> <a href={`mailto:${siteConfig.author.email}`} className="hover:text-fg">{siteConfig.author.email}</a></li>
            <li className="inline-flex items-center gap-2"><MapPin size={15} /> {siteConfig.author.location}</li>
            <li className="inline-flex items-center gap-2"><GitHub size={15} /> <a href={siteConfig.links.github} className="hover:text-fg">github.com/pwnjoshi</a></li>
            <li className="inline-flex items-center gap-2"><LinkedIn size={15} /> <a href={siteConfig.links.linkedin} className="hover:text-fg">linkedin.com/in/pwnjoshi</a></li>
          </ul>

          <ResumeSection title="Summary">
            <p className="leading-relaxed text-muted">
              Student at Graphic Era University building AI agents and cloud systems. Engineering at
              Tech Sangi, founder of AWS Student Builder Group GEU, and former AI Engineering
              Intern at Infosys Springboard. Experience with LangGraph agent frameworks, serverless AWS
              architectures, and full-stack platforms.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-subtle">{stat.label}</dt>
                  <dd className="text-2xl font-medium tracking-tight text-fg">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          <ResumeSection title="Experience">
            <ExperienceTimeline roles={experience} />
          </ResumeSection>

          <ResumeSection title="Projects">
            <div className="space-y-8">
              {projects.map((project) => (
                <article key={project.id} className="avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-medium tracking-tight text-fg">
                      <Link href={`/work#${project.id}`} className="hover:text-accent">{project.title}</Link>
                    </h3>
                    <span className="text-xs text-subtle">{project.category}</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => (
                      <li key={skill} className="chip">{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Education">
            {education.map((item) => (
              <div key={item.id}>
                <h3 className="font-medium text-fg">{item.institution}</h3>
                <p className="text-sm text-subtle">{item.location}</p>
                <p className="mt-2 text-muted">{item.detail}</p>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection title="Certifications">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="avoid-break">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-fg hover:text-accent">
                    {cert.title}
                  </a>
                  <p className="text-xs text-subtle">{cert.issuer} · {cert.issued}</p>
                </li>
              ))}
            </ul>
          </ResumeSection>

          <ResumeSection title="Skills">
            <dl className="space-y-4">
              {Object.entries(techStack).map(([category, data]) => (
                <div key={category} className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-fg">{category}</dt>
                  <dd className="text-sm text-muted">{data.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>
        </div>
      </div>
    </>
  );
}
