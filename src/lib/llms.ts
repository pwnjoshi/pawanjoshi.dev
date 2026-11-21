import { getAllPosts } from "./blog";
import { certifications, education, experience, moreProjects, projects, siteConfig, techStack } from "./content";
import { faqs, personSummary } from "./seo";

const url = siteConfig.url;

/** llms.txt: a short, link-rich summary for AI assistants and answer engines (https://llmstxt.org). */
export function llmsIndex() {
  const posts = getAllPosts();
  return `# Pawan Joshi

> ${personSummary}

Website: ${url}
Email: ${siteConfig.author.email}
Location: Dehradun, Uttarakhand, India
Profiles: ${[siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.devto, siteConfig.links.awsCommunity].join(", ")}

## Pages

- [About Pawan Joshi](${url}/about): background, experience, education, certifications, skills and FAQ
- [Work](${url}/work): projects in AI agents, AWS and full-stack engineering
- [Résumé](${url}/resume): experience, projects, certifications and skills; PDF at ${url}/Pawan_Joshi_Resume.pdf
- [Writing](${url}/blog): articles by Pawan Joshi
- [Now](${url}/now): current focus
- [Contact](${url}/contact)

## Articles

${posts.map((post) => `- [${post.title}](${url}/blog/${post.slug}): ${post.description}`).join("\n")}

## Optional

- [Full profile in one file](${url}/llms-full.txt)
`;
}

/** llms-full.txt: the complete profile as plain Markdown, so an assistant can answer without crawling every page. */
export function llmsFull() {
  const posts = getAllPosts();
  const section = (title: string, body: string) => `## ${title}\n\n${body.trim()}\n`;

  return [
    `# Pawan Joshi\n\n${personSummary}\n\nWebsite: ${url} · Email: ${siteConfig.author.email} · Dehradun, Uttarakhand, India\n`,
    section(
      "Experience",
      experience
        .map((role) => `### ${role.role}, ${role.company}\n${role.period} · ${role.location}\n\n${role.description}\n\nSkills: ${role.skills.join(", ")}`)
        .join("\n\n")
    ),
    section(
      "Education",
      education.map((item) => `- ${item.institution}, ${item.location}. ${item.detail}`).join("\n")
    ),
    section(
      "Projects",
      [
        ...projects.map(
          (project) =>
            `### ${project.title}\n${project.category}\n\n${project.description}\n\nContribution: ${project.contribution}\nArchitecture: ${project.architecture}\nResults: ${project.metrics.join("; ")}\nTechnologies: ${project.skills.join(", ")}\nLink: ${project.liveUrl}`
        ),
        ...moreProjects.map(
          (project) =>
            `### ${project.title}\n${project.category}\n\n${project.description}\nTechnologies: ${project.tech.join(", ")}\nSource: ${project.repoUrl}${project.liveUrl ? `\nLive: ${project.liveUrl}` : ""}`
        ),
      ].join("\n\n")
    ),
    section(
      "Certifications",
      certifications.map((cert) => `- ${cert.title} — ${cert.issuer} (${cert.issued}). Verify: ${cert.credentialUrl}`).join("\n")
    ),
    section(
      "Skills",
      Object.entries(techStack)
        .map(([category, stack]) => `- ${category}: ${stack.items.join(", ")}`)
        .join("\n")
    ),
    section(
      "Articles",
      posts.map((post) => `- ${post.title} (${post.date}): ${url}/blog/${post.slug}\n  ${post.description}`).join("\n")
    ),
    section("Frequently asked questions", faqs.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")),
  ].join("\n");
}
