import type { ReactNode } from "react";

export function SectionHeading({
  title,
  description,
  action,
  id,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
      <div className="max-w-2xl">
        
        <h2 id={id} className="h-section">{title}</h2>
        {description && <p className="mt-2 text-[15px] leading-relaxed text-subtle">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
