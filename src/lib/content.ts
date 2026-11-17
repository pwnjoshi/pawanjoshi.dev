// Site-wide content and configuration
export const siteConfig = {
  name: "Pawan Joshi",
  title: "Pawan Joshi — Software Engineer",
  description:
    "Software engineer specializing in autonomous AI agents and cloud infrastructure. Co-Founder at Tech Sangi, founding leader of AWS Student Builder Group at Graphic Era University.",
  url: "https://pawanjoshi.dev",
  ogImage: "https://pawanjoshi.dev/og.png",
  keywords: [
    "Pawan Joshi",
    "Software Engineer",
    "AI Agents",
    "Cloud Infrastructure",
    "AWS",
    "LangGraph",
    "Next.js",
    "Dehradun",
    "India",
  ],
  author: {
    name: "Pawan Joshi",
    email: "me@joshipawan.com.np",
    location: "Dehradun, India",
    bio: "Software engineer specializing in autonomous AI agents and cloud infrastructure.",
    tagline:
      "Co-Founder at Tech Sangi, founding leader of the AWS Student Builder Group at Graphic Era University, and former AI Engineering Intern at Infosys Springboard.",
    avatar: "/avatar.jpg",
  },
  links: {
    github: "https://github.com/pwnjoshi",
    linkedin: "https://linkedin.com/in/pwnjoshi",
    twitter: "https://x.com/pwnjoshidev",
    devto: "https://dev.to/pwnjoshi",
    awsCommunity: "https://builder.aws.com/community/@pawanjoshidev",
    techSangi: "https://techsangi.com.np/",
    email: "me@joshipawan.com.np",
  },
  stats: [
    { value: "450+", label: "Builders Reached" },
    { value: "300+", label: "Students Mentored" },
    { value: "4x", label: "Cloud & AI Certified" },
    { value: "8+", label: "Production Products" },
  ],
};

export const experience = [
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
    company: "AWS Student Builder Group",
    period: "Nov 2025 — Present",
    location: "Graphic Era University",
    description:
      "Founded the campus AWS builder group and designed hands-on cloud curriculums covering Amazon EC2, S3, IAM, CloudFront, Route 53, and CLF-C02 certification prep for 400+ members. Mentored peers on serverless architecture and production best practices.",
    skills: ["AWS EC2", "Amazon S3", "IAM", "CloudFront", "Serverless"],
    credentialUrl: "https://builder.aws.com/community/student-builder-groups",
    credentialLabel: "Visit Site",
  },
  {
    id: "tech-sangi",
    role: "Co-Founder & Technical Lead",
    company: "Tech Sangi Pvt. Ltd.",
    period: "Nov 2024 — Present",
    location: "Dehradun, India",
    description:
      "Lead engineering of cloud-native web systems, intelligent automation, and client platforms. Architected and deployed 8+ production products, managing end-to-end full-stack architectures, payment gateways, and cloud deployment pipelines.",
    skills: ["React", "Node.js", "AWS", "Stripe", "DevOps"],
    credentialUrl: "https://techsangi.com.np/",
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
      "Guided 300+ students through hands-on Google Cloud Platform architecture labs, GCP compute deployments, and skill badge pathways with active troubleshooting support.",
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
      "Serverless campus platform built on AWS (S3, CloudFront, DynamoDB) serving 450+ registered builders across 200+ institutions in 35+ countries. Features multi-tenant Google OAuth & JWT auth, automated CLF-C02 certification verification, and sub-100ms API latency via DynamoDB GSIs.",
    longDescription: `The AWS Student Builder Platform was designed to solve a real problem: how do you scale a campus cloud-learning community beyond one institution? The answer was to build a production-grade, serverless portal from scratch.

**The Problem**: Running AWS workshops for 400+ students at Graphic Era University required a registration, verification, and resource delivery system that could handle concurrent users, store data reliably, and serve assets globally — all at near-zero cost.

**Architecture**: The platform is built on a fully serverless stack. Static assets and the React frontend are served from CloudFront + S3, achieving sub-100ms response times globally. DynamoDB handles user data with GSI-based queries for instant lookups. JWT-based auth with Google OAuth provides secure multi-tenant access without a traditional backend server.

**Engineering Challenges**: 
- Automated CLF-C02 certification verification required building a custom verification pipeline that cross-references Credly badge data
- Scaling to 200+ institutions in 35+ countries with zero additional infrastructure cost
- Designing DynamoDB schema with proper GSIs to avoid table scans`,
    metrics: [
      "450+ registered builders",
      "200+ institutions",
      "35+ countries",
      "Sub-100ms API latency",
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
    longDescription: `This project was built during my AI Engineering internship at Infosys Springboard, with the goal of building a production-grade agentic system that could autonomously handle complex, multi-step engineering tasks.

**The Problem**: Existing agent frameworks failed on real-world engineering tasks — either losing context mid-task, hallucinating tool calls, or crashing when processing large codebases.

**Architecture**: Built on LangGraph's stateful graph execution model, the system implements a ReAct (Reasoning + Acting) loop where the agent reasons about the current state, selects tools, executes actions, and updates its plan based on results. The key innovation is an **in-memory virtual file system (VFS)** that acts as a scratchpad — the agent reads/writes intermediate results to VFS instead of bloating the LLM context window.

**Engineering Challenges**:
- Context overflow: jobs with 10,000+ log lines would crash the LLM context window → solved with VFS chunking
- Multi-step reliability: early versions failed ~60% of the time due to tool-call errors → LangSmith tracing revealed the failure patterns, allowing targeted fixes that pushed reliability past 70%
- State management: LangGraph's checkpoint system required careful schema design to handle partial task completion and resume`,
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
    longDescription: `ARTAMS (Automated Real-Time Attendance Management System) was built to solve a specific problem: GPS spoofing attacks were allowing students to mark attendance from outside campus. 

**The Problem**: Existing attendance systems had no verification layer. A student could fake their GPS location and mark attendance remotely. The system needed to handle hundreds of concurrent verification requests with sub-second response times.

**Architecture**: Written in C for maximum performance, ARTAMS uses in-memory hash tables for O(1) student lookups — a database query would have been too slow for real-time verification. The GPS anti-spoofing layer uses the Haversine formula to calculate the great-circle distance between the student's reported location and the classroom's GPS coordinates.

**Deployment**: Running on AWS EC2 (Ubuntu 24.04) behind Nginx, exposed via FastCGI REST APIs. Nginx handles TLS termination and load distribution, while the C process handles the core verification logic.

**Engineering Decisions**:
- C over Python/Go: the verification hot path needed microsecond-level performance
- Hash tables over B-trees: student ID lookups are point queries, not range scans
- Haversine over Euclidean distance: Earth's curvature matters at campus-sized distances`,
    metrics: [
      "O(1) lookup performance",
      "GPS anti-spoofing via Haversine",
      "Concurrent request handling",
      "EC2 + Nginx deployment",
    ],
    skills: ["C", "AWS EC2", "Nginx", "FastCGI", "Data Structures"],
    liveUrl: "https://joshipawan.com.np/Pawan_Joshi_Resume.pdf",
    sourceUrl: "https://github.com/pwnjoshi",
    featured: true,
  },
  {
    id: "tech-sangi-platform",
    number: "04",
    category: "Full-Stack SaaS",
    title: "Tech Sangi SaaS Platform",
    description:
      "Production-grade SaaS platform powering Tech Sangi Pvt. Ltd. Supports client delivery pipelines, community resources, and internal tooling. Architected with scalable cloud primitives, secure authentication, Stripe billing, and continuous deployment workflows.",
    longDescription: `Tech Sangi's platform is the operational backbone of the company — it powers client project delivery, community resources, billing, and internal engineering tooling.

**The Problem**: Managing 8+ simultaneous client projects across a small team required a unified platform for project tracking, client communication, resource delivery, and billing — without paying for expensive SaaS tools.

**Architecture**: Built on React + Node.js with PostgreSQL for structured data. AWS powers the cloud infrastructure: EC2 for compute, S3 for asset storage, and CloudFront for CDN. Stripe handles all billing flows including subscriptions, one-time payments, and invoice generation.

**Engineering Highlights**:
- Multi-tenant architecture: each client organization has isolated data with row-level security
- Stripe webhooks: payment events are processed asynchronously to handle retries and failures
- Continuous deployment: GitHub Actions → AWS CodeDeploy → zero-downtime blue-green deployments`,
    metrics: [
      "8+ production products",
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
