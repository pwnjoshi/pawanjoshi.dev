import { siteConfig } from "@/lib/content";
import { GitHub, LinkedIn, Mail, XIcon } from "./Icons";
import { cn } from "@/lib/utils";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GitHub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedIn },
  { label: "X", href: siteConfig.links.twitter, Icon: XIcon },
  { label: "Email", href: `mailto:${siteConfig.author.email}`, Icon: Mail },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-muted transition hover:border-line-strong hover:bg-surface-2 hover:text-fg"
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
