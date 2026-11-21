import type { Metadata } from "next";
import { certifications, education, experience, moreProjects, projects, siteConfig } from "./content";
import type { BlogPostSummary } from "./blog";

const url = siteConfig.url;

export const ids = {
  person: `${url}/#person`,
  website: `${url}/#website`,
  techSangi: `${url}/#tech-sangi`,
  sbg: `${url}/#aws-sbg-geu`,
  geu: `${url}/#graphic-era-university`,
};

export const sameAs = [
  siteConfig.links.github,
  siteConfig.links.linkedin,
  siteConfig.links.twitter,
  siteConfig.links.devto,
  siteConfig.links.awsCommunity,
];

/** One canonical description of Pawan Joshi, reused by the page copy, JSON-LD and llms.txt. */
export const personSummary =
  "Pawan Joshi is a student at Graphic Era Deemed to be University in Dehradun, India, who builds AI agents and cloud systems. He is engineering at Tech Sangi, founded AWS Student Builder Group GEU, was an AI Engineering Intern at Infosys Springboard, and has mentored 500+ students in AWS and AI.";

export function personSchema() {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: "Pawan Joshi",
    alternateName: siteConfig.alternateNames,
    url,
    mainEntityOfPage: `${url}/about`,
    image: { "@type": "ImageObject", url: `${url}/hero-avatar.png`, caption: "Pawan Joshi" },
    description: personSummary,
    jobTitle: "AI and Cloud Engineer",
    email: `mailto:${siteConfig.author.email}`,
    nationality: { "@type": "Country", name: "India" },
    homeLocation: {
      "@type": "Place",
      name: "Dehradun, Uttarakhand, India",
      address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressRegion: "Uttarakhand", addressCountry: "IN" },
    },
    worksFor: { "@type": "Organization", "@id": ids.techSangi, name: "Tech Sangi", url: siteConfig.links.techSangi },
    affiliation: {
      "@type": "CollegeOrUniversity",
      "@id": ids.geu,
      name: education[0]?.institution ?? "Graphic Era Deemed to be University",
      address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressCountry: "IN" },
    },
    memberOf: [
      {
        "@type": "Organization",
        "@id": ids.sbg,
        name: "AWS Student Builder Group GEU",
        description: "Campus AWS builder community at Graphic Era University, founded by Pawan Joshi.",
      },
    ],
    knowsAbout: [
      "Autonomous AI agents",
      "LangGraph",
      "LangSmith",
      "Retrieval-augmented generation",
      "Amazon Web Services",
      "Serverless architecture",
      "Google Cloud",
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "C",
      "Developer community building",
    ],
    hasOccupation: experience.map((role) => ({
      "@type": "Occupation",
      name: role.role,
      description: `${role.role} at ${role.company} (${role.period}). ${role.description}`,
      occupationLocation: { "@type": "Place", name: role.location },
    })),
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: cert.issuer },
      url: cert.credentialUrl,
      dateCreated: cert.issued,
    })),
    sameAs,
  };
}

export function organizationSchemas() {
  return [
    {
      "@type": "Organization",
      "@id": ids.sbg,
      name: "AWS Student Builder Group GEU",
      description: "AWS Student Builder Group at Graphic Era Deemed to be University, Dehradun. Hands-on cloud and AI learning for students.",
      founder: { "@id": ids.person },
      parentOrganization: { "@id": ids.geu },
    },
    { "@type": "Organization", "@id": ids.techSangi, name: "Tech Sangi", url: siteConfig.links.techSangi },
  ];
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url,
    name: "Pawan Joshi",
    alternateName: ["pawanjoshi.dev", "Pawan Joshi Portfolio"],
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": ids.person },
    author: { "@id": ids.person },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@type": type,
    "@id": `${url}${path}#webpage`,
    url: `${url}${path}`,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.person },
    ...(type === "ProfilePage" ? { mainEntity: { "@id": ids.person } } : {}),
  };
}

export function projectsSchema() {
  const all = [
    ...projects.map((project) => ({
      name: project.title,
      description: project.description,
      url: project.liveUrl,
      code: project.sourceUrl,
      keywords: project.skills.join(", "),
    })),
    ...moreProjects.map((project) => ({
      name: project.title,
      description: project.description,
      url: project.liveUrl ?? project.repoUrl,
      code: project.repoUrl,
      keywords: project.tech.join(", "),
    })),
  ];
  return {
    "@type": "ItemList",
    name: "Projects by Pawan Joshi",
    numberOfItems: all.length,
    itemListElement: all.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        url: project.url,
        keywords: project.keywords,
        creator: { "@id": ids.person },
        ...(project.code?.includes("github.com/pwnjoshi/") ? { sameAs: project.code } : {}),
      },
    })),
  };
}

export function blogSchema(posts: BlogPostSummary[]) {
  return {
    "@type": "Blog",
    "@id": `${url}/blog#blog`,
    url: `${url}/blog`,
    name: "Pawan Joshi — Writing",
    description: "Articles by Pawan Joshi on AWS, debugging, and building developer communities.",
    inLanguage: "en",
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${url}/blog/${post.slug}#article`,
      headline: post.title,
      url: `${url}/blog/${post.slug}`,
      datePublished: post.date,
      image: post.coverImage,
      author: { "@id": ids.person },
    })),
  };
}

/** Wraps nodes in a single @graph so search engines and AI crawlers can resolve the @id links. */
export function graph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}

/** Page metadata with matching canonical, Open Graph and Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "profile";
}): Metadata {
  const fullTitle = `${title} — Pawan Joshi`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: ogType, title: fullTitle, description, url: path, siteName: "Pawan Joshi", locale: "en_IN" },
    twitter: { card: "summary_large_image", title: fullTitle, description, creator: "@pwnjoshidev" },
  };
}

/** Plain questions and answers about Pawan Joshi. Shown on the About page and marked up as FAQPage. */
export const faqs = [
  {
    q: "Who is Pawan Joshi?",
    a: personSummary,
  },
  {
    q: "What does Pawan Joshi work on?",
    a: "Pawan Joshi builds autonomous AI agents with LangGraph and LangSmith, serverless and EC2-based systems on AWS, and full-stack products with React, Next.js and Node.js.",
  },
  {
    q: "Where does Pawan Joshi study?",
    a: "Pawan Joshi is a student at Graphic Era Deemed to be University in Dehradun, Uttarakhand, India, where he founded AWS Student Builder Group GEU.",
  },
  {
    q: "What certifications does Pawan Joshi hold?",
    a: `Pawan Joshi holds ${certifications.length} certifications, including ${certifications
      .slice(0, 4)
      .map((cert) => cert.title)
      .join(", ")}.`,
  },
  {
    q: "How can I contact Pawan Joshi?",
    a: `Email ${siteConfig.author.email}, use the contact form at ${url}/contact, or connect on LinkedIn at ${siteConfig.links.linkedin}.`,
  },
];

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${url}/about#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
