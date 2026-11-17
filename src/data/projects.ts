import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: "01",
    slug: "aws-student-builder-platform",
    title: "AWS Student Builder Platform & Portal",
    category: "CLOUD PLATFORM",
    timeline: "Nov 2025 - Present",
    summary: "Serverless campus platform built on AWS (S3, CloudFront, DynamoDB) serving 450+ registered builders across 200+ institutions in 35+ countries.",
    metrics: [{ label: "Builders", value: "450+" }, { label: "Institutions", value: "200+" }],
    architecture: { "Frontend": "React", "Backend": "Node.js", "Cloud": "AWS S3, CloudFront, DynamoDB" },
    tags: ["React", "Node.js", "AWS S3", "Amazon CloudFront", "DynamoDB", "JWT", "OAuth 2.0", "Serverless"],
    links: { github: "https://github.com/pwnjoshi/aws-student-builder" }
  },
  {
    id: "02",
    slug: "autonomous-cognitive-engine",
    title: "Autonomous Cognitive Engine",
    category: "AI AGENT SYSTEMS",
    timeline: "Jan 2026 - Present",
    summary: "Multi-step autonomous agent framework in LangGraph designed to decompose and execute complex engineering tasks autonomously with ~80% accuracy.",
    metrics: [{ label: "Accuracy", value: "~80%" }, { label: "Tech", value: "LangGraph" }],
    architecture: { "AI": "LangGraph", "Models": "OpenAI API", "Infrastructure": "VFS" },
    tags: ["Python", "LangGraph", "LangSmith", "ReAct Loops", "VFS", "OpenAI API", "Agentic Systems"],
    links: { github: "https://github.com/pwnjoshi/autonomous-cognitive-engine" }
  },
  {
    id: "03",
    slug: "artams-real-time-attendance-engine",
    title: "ARTAMS: Real-Time Attendance Engine",
    category: "SYSTEMS & BACKEND",
    timeline: "Aug 2025 - Oct 2025",
    summary: "High-throughput attendance and verification system written in C using in-memory hash tables for O(1) lookups and Haversine formula GPS anti-spoofing algorithms.",
    metrics: [{ label: "Efficiency", value: "O(1) Lookups" }, { label: "Language", value: "C" }],
    architecture: { "Language": "C", "Server": "Nginx/FastCGI", "Hosting": "AWS EC2" },
    tags: ["C", "AWS EC2", "Ubuntu 24.04", "Nginx", "FastCGI", "Data Structures", "Haversine Formula"],
    links: { github: "https://github.com/pwnjoshi/artams" }
  },
  {
    id: "04",
    slug: "tech-sangi-saas-platform",
    title: "Tech Sangi SaaS Platform",
    category: "FULL-STACK SAAS",
    timeline: "Nov 2024 - Present",
    summary: "Production-grade SaaS platform powering Tech Sangi Pvt. Ltd., supporting client delivery pipelines, community resources, and internal tooling.",
    metrics: [{ label: "Platform", value: "SaaS" }, { label: "Deployment", value: "Microservices" }],
    architecture: { "Frontend": "React", "Backend": "Node.js", "DB": "PostgreSQL" },
    tags: ["React", "Node.js", "AWS", "Stripe", "PostgreSQL", "DevOps", "Microservices"],
    links: { live: "https://techsangi.com" }
  },
];
