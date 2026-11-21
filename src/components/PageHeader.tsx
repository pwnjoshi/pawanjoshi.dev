import type { ReactNode } from "react";

/** iOS-style large title. On desktop it scales up into an editorial header with a soft aurora. */
export function PageHeader({
  title,
  children,
  actions,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden md:-mt-20 md:pt-20">
      <div className="aurora aurora-fade opacity-[calc(var(--aurora-opacity)*0.7)]" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="container-x relative pb-2 pt-5 sm:pb-4 md:pt-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1
              className="fade-up text-[2.125rem] font-semibold leading-[1.1] text-fg md:text-7xl md:font-medium"
              style={{ letterSpacing: "-0.035em" }}
            >
              {title}
            </h1>
            {children && (
              <div className="fade-up fade-up-2 mt-2 text-[15px] leading-relaxed text-subtle md:mt-4 md:text-xl">{children}</div>
            )}
          </div>
          {actions && <div className="fade-up fade-up-3 flex flex-wrap items-center gap-2.5">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
