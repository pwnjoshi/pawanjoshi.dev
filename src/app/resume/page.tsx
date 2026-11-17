import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, experience, certifications, projects, techStack } from "@/lib/content";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Pawan Joshi — Software engineer specializing in autonomous AI agents and cloud infrastructure.",
};

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-3">
            Résumé
          </p>
          <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-2">
            Pawan Joshi
          </h1>
          <p className="text-sm text-neutral-500">
            Software Engineer · AI & Cloud Infrastructure
          </p>
          <p className="text-xs text-neutral-700 mt-1">
            Dehradun, India · me@joshipawan.com.np
          </p>
        </div>
        <a
          href="/Pawan_Joshi_Resume.pdf"
          download
          className="shrink-0 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 border border-neutral-800 hover:border-neutral-700 rounded px-3 py-2 transition-colors"
        >
          Download PDF
          <ArrowUpRight size={10} />
        </a>
      </div>

      {/* Summary */}
      <section className="mb-10 pb-10 border-b border-neutral-900">
        <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
          Software engineer specializing in autonomous AI agents and cloud
          infrastructure. Co-Founder at Tech Sangi Pvt. Ltd., founding leader of
          the AWS Student Builder Group at Graphic Era University, and former AI
          Engineering Intern at Infosys Springboard. Track record building
          production systems across LangGraph agent frameworks, serverless AWS
          architectures, and full-stack SaaS platforms.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-medium text-neutral-200 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-neutral-700 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-10 pb-10 border-b border-neutral-900">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-6">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-sm font-medium text-neutral-200">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-neutral-500">{exp.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-neutral-700">{exp.period}</p>
                  <p className="text-xs text-neutral-700">{exp.location}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mt-2 mb-2">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-10 pb-10 border-b border-neutral-900">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-6">
          Selected Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium text-neutral-200">{project.title}</h3>
                <span className="text-xs text-neutral-700 shrink-0">{project.category}</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-10 pb-10 border-b border-neutral-900">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-6">
          Certifications
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-2 p-3 border border-neutral-900 rounded hover:border-neutral-800 transition-colors"
            >
              <div>
                <p className="text-xs font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {cert.issuer} · {cert.issued}
                </p>
              </div>
              <ArrowUpRight size={9} className="text-neutral-700 group-hover:text-neutral-500 transition-colors shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-6">
          Technical Skills
        </h2>
        <div className="space-y-4">
          {Object.entries(techStack).map(([category, data]) => (
            <div key={category} className="grid sm:grid-cols-[180px,1fr] gap-3">
              <p className="text-xs text-neutral-600">{category}</p>
              <p className="text-xs text-neutral-500">{data.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="pt-8 border-t border-neutral-900">
        <div className="flex flex-wrap gap-6">
          {[
            { label: "GitHub", href: siteConfig.links.github },
            { label: "LinkedIn", href: siteConfig.links.linkedin },
            { label: "Dev.to", href: siteConfig.links.devto },
            { label: "AWS Community", href: siteConfig.links.awsCommunity },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              {link.label} <ArrowUpRight size={9} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
