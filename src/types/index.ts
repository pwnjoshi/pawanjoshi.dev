export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  metrics: { builders: string; students: string; certs: string };
  social: { github: string; linkedin: string; x: string; aws: string; devto: string };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  timeline: string;
  summary: string;
  metrics: { label: string; value: string }[];
  architecture: Record<string, string>;
  tags: string[];
  links: { live?: string; github?: string };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  skills: string[];
  link?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credlyUrl: string;
  badgeId: string;
}

export interface NowData {
  activities: string;
  focus: string;
  building: string;
  learning: string;
}

