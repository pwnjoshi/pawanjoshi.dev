// Site-wide content and configuration
export const siteConfig = {
  name: "Pawan Joshi",
  title: "Pawan Joshi — AI and Cloud Engineer",
  description:
    "Pawan Joshi is a student at Graphic Era University in Dehradun, India, who builds AI agents and cloud systems. Engineering at Tech Sangi and founder of AWS Student Builder Group GEU.",
  alternateNames: ["pwnjoshi", "pawanjoshidev", "Pawan Joshi Dehradun"],
  url: "https://pawanjoshi.dev",
  keywords: [
    "Pawan Joshi",
    "Pawan Joshi Dehradun",
    "Pawan Joshi Graphic Era University",
    "Pawan Joshi Tech Sangi",
    "Pawan Joshi AWS",
    "pwnjoshi",
    "AWS Student Builder Group GEU",
    "AI agents",
    "LangGraph",
    "cloud engineer",
    "AWS",
    "Next.js",
    "Dehradun",
    "India",
  ],
  author: {
    name: "Pawan Joshi",
    email: "me@pawanjoshi.dev",
    location: "Dehradun, India",
    bio: "Student at Graphic Era University building AI agents and cloud systems.",
    tagline: "Student at Graphic Era University. Engineering at Tech Sangi.",
  },
  links: {
    github: "https://github.com/pwnjoshi",
    linkedin: "https://linkedin.com/in/pwnjoshi",
    twitter: "https://x.com/pwnjoshidev",
    devto: "https://dev.to/pwnjoshi",
    awsCommunity: "https://builder.aws.com/community/@pawanjoshidev",
    techSangi: "https://techsangi.com.np/",
    email: "me@pawanjoshi.dev",
  },
  stats: [
    { value: "500+", label: "Students mentored" },
  ],
};

export const focusAreas = [
  {
    title: "Autonomous AI agents",
    description:
      "Stateful LangGraph agents with tool use, checkpoints, tracing, and memory strategies that survive long, messy tasks.",
  },
  {
    title: "Cloud infrastructure",
    description:
      "Serverless and EC2-based systems on AWS, designed for low latency, clear failure modes, and predictable cost.",
  },
  {
    title: "Full-stack products",
    description:
      "React, Node.js, and PostgreSQL products with auth, billing, and deployment pipelines, shipped for real clients.",
  },
  {
    title: "Community and teaching",
    description:
      "Hands-on cloud curricula and mentorship for hundreds of student builders across campus and online.",
  },
];

export const education = [
  {
    id: "geu",
    institution: "Graphic Era Deemed to be University",
    location: "Dehradun, Uttarakhand, India",
    detail: "Student. Founder of AWS Student Builder Group GEU.",
  },
];

export const experience = [
  {
    id: "tech-sangi",
    role: "Engineering",
    company: "Tech Sangi",
    period: "Nov 2024 — Present",
    location: "Dehradun, India",
    description:
      "Lead engineering of cloud-native web systems, intelligent automation, and client platforms. Architected and deployed multiple production products, managing end-to-end full-stack architectures, payment gateways, and cloud deployment pipelines.",
    skills: ["React", "Node.js", "AWS", "Stripe", "DevOps"],
    credentialUrl: "https://techsangi.com.np/",
    credentialLabel: "Visit Site",
  },
  {
    id: "infosys",
    role: "AI Engineering Intern",
    company: "Infosys Springboard",
    period: "Dec 2025 — Feb 2026",
    location: "Remote, India",
    description:
      "Built a stateful multi-step agent framework in LangGraph that decomposed complex tasks autonomously, landing ~80% accuracy. Overcame context-overflow crashes on jobs with 10,000+ log lines by architecting an in-memory virtual file system, and integrated LangSmith observability to push multi-step production runs past a 70% success rate.",
    skills: ["LangGraph", "LangSmith", "Python", "ReAct Loops", "VFS"],
    credentialUrl:
      "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_01454259343803187223/14bb99d1-1b1d-45b5-badf-839bae33f2b5.pdf",
    credentialLabel: "Verify Credential",
  },
  {
    id: "aws-sbg",
    role: "Founding Campus Leader",
    company: "AWS Student Builder Group GEU",
    period: "Nov 2025 — Present",
    location: "Graphic Era University",
    description:
      "Founded the campus AWS builder group and designed hands-on cloud curriculums covering Amazon EC2, S3, IAM, CloudFront, Route 53, and CLF-C02 certification prep for the campus community. Mentored peers on serverless architecture and production best practices.",
    skills: ["AWS EC2", "Amazon S3", "IAM", "CloudFront", "Serverless"],
    credentialUrl: "https://builder.aws.com/community/student-builder-groups",
    credentialLabel: "Visit Site",
  },
  {
    id: "google-ambassador",
    role: "Google Student Ambassador",
    company: "Google / Graphic Era",
    period: "Oct 2025 — Present",
    location: "Campus",
    description:
      "Drive campus peer learning and developer awareness around Google Gemini and agentic AI tooling. Organize hands-on coding sessions, AI workshops, and collaborative project build sprints for student developers.",
    skills: ["Google Gemini API", "GenAI", "Developer Advocacy"],
    credentialUrl: null,
    credentialLabel: null,
  },
  {
    id: "google-arcade",
    role: "Google Cloud Arcade Facilitator",
    company: "Google Cloud Skills Boost",
    period: "Aug 2025 — Sep 2025",
    location: "Virtual",
    description:
      "Guided students through hands-on Google Cloud Platform architecture labs, GCP compute deployments, and skill badge pathways with active troubleshooting support.",
    skills: ["Google Cloud Platform", "Cloud Architecture", "Mentorship"],
    credentialUrl: null,
    credentialLabel: null,
  },
];

export const projects = [
  {
    id: "aws-sbg-portal",
    number: "01",
    category: "Cloud Platform",
    title: "AWS Student Builder Platform & Portal",
    description:
      "Serverless campus platform built on AWS (S3, CloudFront, DynamoDB) serving student builders across many institutions and countries. Features multi-tenant Google OAuth and JWT auth, automated CLF-C02 certification verification, and fast lookups through DynamoDB secondary indexes.",
    contribution: "Built the serverless registration, resource delivery, and certification verification workflows.",
    architecture: "CloudFront and S3 serve the React frontend. DynamoDB stores builder records, and Google OAuth with JWTs supports sign-in.",
    tradeoffs: "Secondary indexes support common lookups without scanning the table. A custom verification pipeline cross-references Credly badges.",
    metrics: [
      "Serverless registration and resource delivery",
      "Google OAuth with JWT sessions",
      "Automated CLF-C02 certification verification",
      "DynamoDB secondary indexes for fast lookups",
    ],
    skills: ["React", "Node.js", "AWS S3", "CloudFront", "DynamoDB"],
    liveUrl: "https://aws-sbg-piet-official-site.vercel.app/",
    sourceUrl: "https://github.com/pwnjoshi/AWS-SBG-PIET-Official-Site",
    featured: true,
  },
  {
    id: "autonomous-cognitive-engine",
    number: "02",
    category: "AI Agent Systems",
    title: "Autonomous Cognitive Engine",
    description:
      "Multi-step agent framework in LangGraph designed to decompose and execute complex engineering tasks autonomously with ~80% accuracy. Overcame context-overflow crashes on jobs with 10,000+ log lines by engineering an in-memory virtual file system, with LangSmith tracing pushing run reliability past 70%.",
    contribution: "Built a stateful LangGraph agent and an in-memory file system to handle large task inputs.",
    architecture: "LangGraph coordinates reasoning and tool calls. Intermediate results live in a virtual file system, and LangSmith traces the runs.",
    tradeoffs: "Storing large intermediate outputs outside the model context helped prevent overflow. Checkpoints let multi-step work resume after a failed step.",
    metrics: [
      "~80% task accuracy",
      ">70% production reliability",
      "10,000+ log lines handled",
      "VFS context management",
    ],
    skills: ["Python", "LangGraph", "LangSmith", "ReAct Loops", "VFS"],
    liveUrl:
      "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_01454259343803187223/14bb99d1-1b1d-45b5-badf-839bae33f2b5.pdf",
    sourceUrl: "https://github.com/pwnjoshi",
    featured: true,
  },
  {
    id: "artams",
    number: "03",
    category: "Systems & Backend",
    title: "ARTAMS: Real-Time Attendance Engine",
    description:
      "High-throughput attendance and verification system written in C using in-memory hash tables for O(1) lookups and Haversine formula GPS anti-spoofing algorithms. Deployed on an AWS EC2 instance (Ubuntu 24.04) behind Nginx via FastCGI REST APIs to handle concurrent verification requests.",
    contribution: "Built the C verification path for attendance and campus-distance checks.",
    architecture: "The engine runs on EC2 behind Nginx and FastCGI. In-memory hash tables serve student lookups, and the Haversine formula calculates distance from a classroom.",
    tradeoffs: "Hash tables suit point lookups by student ID. Geodesic distance checks let the engine enforce a campus radius.",
    metrics: [
      "O(1) lookup performance",
      "GPS anti-spoofing via Haversine",
      "Concurrent request handling",
      "EC2 + Nginx deployment",
    ],
    skills: ["C", "AWS EC2", "Nginx", "FastCGI", "Data Structures"],
    liveUrl: "https://github.com/pwnjoshi/artams-project",
    sourceUrl: "https://github.com/pwnjoshi/artams-project",
    featured: true,
  },
  {
    id: "tech-sangi-platform",
    number: "04",
    category: "Full-Stack SaaS",
    title: "Tech Sangi SaaS Platform",
    description:
      "Production-grade SaaS platform powering Tech Sangi Pvt. Ltd. Supports client delivery pipelines, community resources, and internal tooling. Architected with scalable cloud primitives, secure authentication, Stripe billing, and continuous deployment workflows.",
    contribution: "Led engineering for client delivery, internal tooling, and billing at Tech Sangi.",
    architecture: "React and Node.js handle the application, PostgreSQL stores records, and Stripe handles billing. AWS services host the platform.",
    tradeoffs: "Row-level security isolates tenant data. Billing webhooks process events asynchronously, and blue-green deployment supports releases without downtime.",
    metrics: [
      "Production client products",
      "Stripe billing integration",
      "Multi-tenant architecture",
      "Zero-downtime deployments",
    ],
    skills: ["React", "Node.js", "AWS", "Stripe", "PostgreSQL"],
    liveUrl: "https://techsangi.com.np/",
    sourceUrl: "https://github.com/pwnjoshi",
    featured: true,
  },
];

export const certifications = [
  {
    id: "aws-clf",
    category: "Cloud Architecture",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services (AWS)",
    issued: "Jul 2026",
    credentialUrl:
      "https://www.credly.com/badges/34758bd1-d052-4760-9d70-845e54f44e8c/linked_in_profile",
  },
  {
    id: "google-genai",
    category: "Generative AI",
    title: "Google Cloud Generative AI Leader",
    issuer: "Google Cloud",
    issued: "Jul 2026",
    credentialUrl:
      "https://www.credly.com/badges/b563155e-bb45-463f-bfde-2c396c536df8/linked_in_profile",
  },
  {
    id: "nebius-agentic",
    category: "Agentic Systems",
    title: "Nebius Agentic AI Builder Certification",
    issuer: "Nebius Academy",
    issued: "Jul 2026",
    credentialUrl:
      "https://www.credly.com/badges/74ddfbd8-2a2e-4992-aa4c-714f1481d609/linked_in_profile",
  },
  {
    id: "nebius-cloudops",
    category: "CloudOps & ML",
    title: "Nebius AI CloudOps Engineer Certification",
    issuer: "Nebius Academy",
    issued: "Jul 2026",
    credentialUrl:
      "https://www.credly.com/badges/9713db14-bab7-4e84-b0fc-3cd9a89a6f05/linked_in_profile",
  },
  {
    id: "aws-ml",
    category: "Machine Learning",
    title: "AWS AI & ML Scholars Challenge",
    issuer: "Udacity & AWS",
    issued: "Mar 2026",
    credentialUrl:
      "https://cdn.getblueshift.com/bee/images/ed5b8755-0989-4944-9ca5-287bb68e4a22/Challenge%20Completion%20Badge_Light.png",
  },
  {
    id: "mckinsey",
    category: "Leadership & Strategy",
    title: "McKinsey.org Forward Program",
    issuer: "McKinsey & Company",
    issued: "Dec 2025",
    credentialUrl:
      "https://www.credly.com/badges/2c65372b-5ac0-4ba0-b04d-8a64dc6c2876/linked_in_profile",
  },
  {
    id: "infosys-genai",
    category: "Foundational AI",
    title: "Principles of Generative AI Certification",
    issuer: "Infosys Springboard",
    issued: "Oct 2025",
    credentialUrl: "https://infyspringboard.onwingspan.com/",
  },
  {
    id: "notion-ai",
    category: "Productivity AI",
    title: "Notion AI Certified",
    issuer: "Notion",
    issued: "May 2026",
    credentialUrl: "https://verify.skilljar.com/c/d6texn532eym",
  },
];

export const techStack = {
  Languages: {
    description: "Core systems & application programming",
    items: ["Python", "C", "C++", "JavaScript", "Java", "SQL", "HTML5/CSS3"],
  },
  "AI & Agentic Systems": {
    description: "Orchestration, reasoning & LLM pipelines",
    items: [
      "LangGraph",
      "LangSmith",
      "LangChain",
      "ReAct Loops",
      "RAG",
      "OpenAI API",
      "Agent Memory / VFS",
    ],
  },
  "Cloud & Infrastructure": {
    description: "Architecture, security & serverless scaling",
    items: [
      "AWS EC2",
      "Amazon S3",
      "DynamoDB",
      "CloudFront",
      "IAM & Route 53",
      "GCP",
      "Docker",
      "Nginx",
    ],
  },
  "Frameworks & Backend": {
    description: "Production services, APIs & data layers",
    items: [
      "Django",
      "Node.js",
      "React",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "FastCGI",
    ],
  },
};

// More public work from github.com/pwnjoshi. Descriptions are summarized from each repository's README.
export const moreProjects = [
  {
    id: "aws-signal",
    title: "AWS Signal",
    category: "AI Agents · Cloud",
    description:
      "Autonomous cloud intelligence platform that monitors AWS release feeds, removes duplicates with hashing, scores developer impact, and offers a voice copilot. Built on Amazon Bedrock, Polly, Lambda, and SES.",
    tech: ["TypeScript", "React", "Amazon Bedrock", "AWS Lambda"],
    repoUrl: "https://github.com/pwnjoshi/AWS-Signal-Agent",
    liveUrl: null,
  },
  {
    id: "relay",
    title: "RELAY",
    category: "AI Voice Platform",
    description:
      "Autonomous telephony and voice operations platform that answers customer calls, triages inquiries, and schedules appointments using website-grounded retrieval and Amazon Bedrock.",
    tech: ["TypeScript", "Amazon Bedrock", "RAG", "Google OAuth"],
    repoUrl: "https://github.com/pwnjoshi/RELAY",
    liveUrl: null,
  },
  {
    id: "trustfix",
    title: "TrustFix",
    category: "AI Agents · Security",
    description:
      "Google ADK agent for customer security reviews. It turns requirements into controls, inspects a Google Cloud project, proposes the smallest safe fix, waits for approval, then verifies the result.",
    tech: ["Google ADK", "Google Cloud", "Cloud Run"],
    repoUrl: "https://github.com/pwnjoshi/TrustFix",
    liveUrl: "https://trustfix-app-1087269593372.us-central1.run.app/",
  },
  {
    id: "keyhole",
    title: "Keyhole",
    category: "AI Agents · Security",
    description:
      "Runtime security layer for AI agents. It intercepts tool calls across enterprise systems, redacts sensitive data on the server, and produces zero-knowledge proofs that the agent stayed within its policy scope.",
    tech: ["TypeScript", "Zero-knowledge proofs", "Supabase", "AWS App Runner"],
    repoUrl: "https://github.com/pwnjoshi/KeyHole",
    liveUrl: "https://keyhole.techsangi.com.np",
  },
  {
    id: "voiceaid",
    title: "VoiceAid",
    category: "Social Impact",
    description:
      "Voice-first AI assistant for people who cannot read or have limited digital literacy. AWS 10,000 AIdeas finalist in the Social Impact category, built with a four-person team.",
    tech: ["JavaScript", "Voice AI", "AWS"],
    repoUrl: "https://github.com/pwnjoshi/VoiceAid",
    liveUrl: null,
  },
  {
    id: "hackflow",
    title: "HackFlow AI",
    category: "Full-Stack",
    description:
      "Workspace manager for hackathon teams with AI-generated timelines, risk scoring, JWT authentication, GitHub integration, and team chat with workspace context.",
    tech: ["JavaScript", "JWT", "GitHub API"],
    repoUrl: "https://github.com/pwnjoshi/Hacks-For-Hackers",
    liveUrl: null,
  },
  {
    id: "ichatworld",
    title: "iChatWorld",
    category: "Real-Time",
    description:
      "Disposable collaboration rooms with live chat, peer-to-peer file transfer over WebRTC, and a shared whiteboard. No accounts and no tracking.",
    tech: ["TypeScript", "React", "WebRTC", "Socket.IO"],
    repoUrl: "https://github.com/pwnjoshi/iChatWorld",
    liveUrl: null,
  },
  {
    id: "meetmind",
    title: "MeetMind",
    category: "Mobile",
    description:
      "Native iOS meeting recorder with on-device transcription, local summaries, action items, and export. Recordings and notes stay on the device.",
    tech: ["Swift", "SwiftUI", "SwiftData"],
    repoUrl: "https://github.com/pwnjoshi/MeetMind",
    liveUrl: null,
  },
  {
    id: "kamaishield",
    title: "KamaiShield",
    category: "Hackathon",
    description:
      "AI-enabled parametric income protection for last-mile delivery riders in India, built for the Guidewire DEVTrails 2026 university hackathon.",
    tech: ["AI", "Insurance tech"],
    repoUrl: "https://github.com/pwnjoshi/KamaiShield",
    liveUrl: null,
  },
  {
    id: "aws-cloud-club-cms",
    title: "AWS Student Builder Group CMS",
    category: "Community Platform",
    description:
      "Public website and member portal for the AWS Student Builder Group at Graphic Era University, with a Node.js and Prisma backend.",
    tech: ["React", "Node.js", "Prisma", "Tailwind CSS"],
    repoUrl: "https://github.com/pwnjoshi/AWS-Cloud-Club-CMS",
    liveUrl: "https://aws-cloud-club-cms.vercel.app",
  },
];

// Headline numbers: one hand-written figure plus counts derived from the data above.
export const stats = [
  ...siteConfig.stats,
  { value: String(certifications.length), label: "Certifications" },
  { value: String(projects.length + moreProjects.length), label: "Projects built" },
];

