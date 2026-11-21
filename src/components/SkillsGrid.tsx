import { techStack } from "@/lib/content";

export function SkillsGrid() {
  return (
    <dl className="card divide-y divide-line overflow-hidden rounded-2xl">
      {Object.entries(techStack).map(([category, stack]) => (
        <div key={category} className="grid gap-2 px-5 py-4 md:grid-cols-[220px_1fr] md:gap-6">
          <dt className="text-sm text-subtle">{category}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {stack.items.map((item) => (
                <li key={item} className="chip !text-fg">{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
