import type { experience } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

type Role = (typeof experience)[number];

export function ExperienceTimeline({ roles, compact = false }: { roles: Role[]; compact?: boolean }) {
  if (compact) {
    return (
      <ol className="card divide-y divide-line overflow-hidden rounded-2xl">
        {roles.map((role) => (
          <li key={role.id} className="flex flex-col gap-0.5 px-5 py-4 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-[15px] font-medium text-fg">{role.role}</h3>
              <p className="text-sm text-subtle">{role.company}</p>
            </div>
            <p className="text-xs text-subtle sm:text-sm">{role.period}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="timeline">
      {roles.map((role) => (
        <li key={role.id} className="timeline-item avoid-break">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-lg font-medium tracking-tight text-fg">{role.role}</h3>
              <p className="text-muted">
                {role.company} <span className="text-subtle">· {role.location}</span>
              </p>
            </div>
            <p className="shrink-0 font-mono text-xs text-subtle">{role.period}</p>
          </div>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{role.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
              {role.skills.map((skill) => (
                <li key={skill} className="chip">{skill}</li>
              ))}
            </ul>
            {role.credentialUrl && (
              <a
                href={role.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow no-print"
              >
                {role.credentialLabel} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
