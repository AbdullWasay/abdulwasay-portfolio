export const profile = {
  name: "Abdul",
  fullName: "Abdul Rahman",
  initials: "AR",
  role: "Full Stack Software Engineer",
  tagline: "Building stable futures.",
  summary:
    "Full Stack Software Engineer specialising in React, Next.js, Node.js and AWS. I build high-throughput products where interface craft and backend reliability meet.",
  location: "Remote — GMT+5",
  email: "hello@abdul.dev",
  availability: "Available for select contracts",
  years: 6,
  socials: [
    { label: "GitHub", handle: "@abdul", url: "https://github.com" },
    { label: "LinkedIn", handle: "abdul-engineer", url: "https://linkedin.com" },
    { label: "X", handle: "@abdul_builds", url: "https://x.com" },
  ],
};

export const stack = [
  { name: "React", short: "RCT", ring: 0, slug: "react" },
  { name: "Next.js", short: "NXT", ring: 0, slug: "nextdotjs", color: "ffffff" },
  { name: "TypeScript", short: "TS", ring: 0, slug: "typescript" },
  { name: "Node.js", short: "NODE", ring: 0, slug: "nodedotjs" },
  { name: "Express", short: "EXP", ring: 0, slug: "express", color: "ffffff" },
  { name: "Tailwind CSS", short: "TW", ring: 1, slug: "tailwindcss" },
  { name: "Redux", short: "RDX", ring: 1, slug: "redux" },
  { name: "Framer Motion", short: "MOT", ring: 1, slug: "framer", color: "ffffff" },
  { name: "MongoDB", short: "MNG", ring: 1, slug: "mongodb" },
  { name: "PostgreSQL", short: "PG", ring: 1, slug: "postgresql" },
  { name: "MySQL", short: "SQL", ring: 1, slug: "mysql" },
  { name: "Prisma", short: "PRS", ring: 2, slug: "prisma", color: "ffffff" },
  { name: "AWS", short: "AWS", ring: 2, slug: "amazonwebservices", color: "ff9900" },
  { name: "Docker", short: "DKR", ring: 2, slug: "docker" },
  { name: "Git", short: "GIT", ring: 2, slug: "git" },
  { name: "GitHub", short: "GH", ring: 2, slug: "github", color: "ffffff" },
  { name: "Firebase", short: "FIR", ring: 2, slug: "firebase" },
  { name: "Vercel", short: "VRC", ring: 2, slug: "vercel", color: "ffffff" },
];

export function techIconUrl(slug: string, color?: string) {
  return `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
}

export function techBySlug(name: string) {
  return stack.find((tech) => tech.name.toLowerCase() === name.toLowerCase());
}

export const stats = [
  { label: "Contributions", value: 12400, display: "12.4k", accent: true },
  { label: "Public repos", value: 48, display: "48" },
  { label: "Uptime rate", value: 99.9, display: "99.9%" },
  { label: "Stars earned", value: 620, display: "620", accent: true },
];

export const timeline = [
  {
    year: "2019",
    title: "First production ship",
    body: "Wrote my first React app for a local logistics firm and watched 40 dispatchers use it daily. Hooked ever since.",
  },
  {
    year: "2021",
    title: "Backend depth",
    body: "Moved into Node and Postgres, owned an events pipeline pushing 20k messages per minute without dropping a record.",
  },
  {
    year: "2023",
    title: "Cloud & scale",
    body: "Led an AWS migration that cut infrastructure spend 38% while doubling throughput on the primary API.",
  },
  {
    year: "2025",
    title: "AI product engineering",
    body: "Shipped retrieval-backed assistants into production apps — streaming UIs, tool calling, evaluation loops.",
  },
];

export const funFacts = [
  "Ships on Fridays. Carefully.",
  "Reads database changelogs for fun.",
  "Keyboard: 67 keys, silent tactile.",
  "Runs a 5k before standup.",
];

export const skillGroups = [
  {
    category: "Frontend",
    level: 95,
    items: ["React", "Next.js", "TanStack", "Tailwind CSS", "Framer Motion", "Redux"],
    note: "Design-system driven interfaces with real motion craft.",
  },
  {
    category: "Backend",
    level: 90,
    items: ["Node.js", "Express", "REST", "GraphQL", "WebSockets", "Queues"],
    note: "Typed APIs, background jobs, and event-driven services.",
  },
  {
    category: "Cloud",
    level: 85,
    items: ["AWS EC2", "S3", "Lambda", "CloudFront", "Docker", "CI/CD"],
    note: "Boring, observable infrastructure that survives traffic spikes.",
  },
  {
    category: "Databases",
    level: 88,
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Redis"],
    note: "Schema design, indexing strategy, and query surgery.",
  },
  {
    category: "Tools",
    level: 92,
    items: ["Git", "GitHub Actions", "Vite", "Playwright", "Figma"],
    note: "Fast feedback loops beat heroic debugging.",
  },
  {
    category: "Languages",
    level: 89,
    items: ["TypeScript", "JavaScript", "SQL", "Python", "Bash"],
    note: "TypeScript first, everything else when it earns its place.",
  },
];

export type Project = {
  id: string;
  name: string;
  year: string;
  blurb: string;
  features: string[];
  tech: string[];
  tags: string[];
  image: string;
  github: string;
  demo: string;
  tagline: string;
  overview: string[];
  details: { label: string; value: string }[];
  challenges: { title: string; body: string; fix: string }[];
  methodology: { phase: string; title: string; body: string }[];
  stackGroups: { label: string; items: string[] }[];
  achievements: string[];
  outcomes: { metric: string; label: string; note: string }[];
  gallery: { image: string; caption: string }[];
};

import vortex from "@/assets/project-vortex.jpg";
import cypher from "@/assets/project-cypher.jpg";
import lens from "@/assets/project-lens.jpg";

export const projects: Project[] = [
  {
    id: "vortex",
    name: "Vortex Protocol",
    year: "2025",
    blurb: "Real-time visualisation engine for distributed inference clusters, streaming 50k events per second.",
    features: ["WebSocket fan-out", "GPU-accelerated canvas", "Anomaly alerts", "Replay timeline"],
    tech: ["Next.js", "WebGL", "Node.js", "Redis"],
    tags: ["Next.js", "Full Stack", "AI"],
    image: vortex,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "cypher",
    name: "Cypher Core",
    year: "2024",
    blurb: "Operations console for autonomous server fleets with encrypted command execution and audit trails.",
    features: ["Role-based access", "Live log tailing", "Audit ledger", "Command palette"],
    tech: ["React", "Express", "PostgreSQL", "Docker"],
    tags: ["React", "Full Stack", "Node.js"],
    image: cypher,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "lens",
    name: "Neural Lens",
    year: "2024",
    blurb: "LLM-powered code review companion that reads a repository and proposes refactors with rationale.",
    features: ["Repo embeddings", "Streaming reviews", "Diff proposals", "PR bot"],
    tech: ["Next.js", "Python", "pgvector", "AWS"],
    tags: ["AI", "Next.js", "Full Stack"],
    image: lens,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "atlas",
    name: "Atlas Commerce",
    year: "2023",
    blurb: "Headless storefront platform serving 1.2M monthly sessions with sub-second navigation.",
    features: ["Edge caching", "Stripe checkout", "CMS authoring", "A/B framework"],
    tech: ["Next.js", "Node.js", "MongoDB", "Vercel"],
    tags: ["Next.js", "Full Stack", "WordPress"],
    image: cypher,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "pulse",
    name: "Pulse Analytics",
    year: "2023",
    blurb: "Self-hosted product analytics with cohort retention, funnels, and a 40ms query budget.",
    features: ["Columnar storage", "Funnel builder", "Cohorts", "Webhooks"],
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    tags: ["React", "Node.js", "Full Stack"],
    image: vortex,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "orbit",
    name: "Orbit CMS",
    year: "2022",
    blurb: "Block-based publishing system migrating legacy WordPress sites onto a modern React front end.",
    features: ["Block editor", "Media pipeline", "Redirect mapper", "SEO audit"],
    tech: ["React", "PHP", "MySQL", "AWS S3"],
    tags: ["WordPress", "React"],
    image: lens,
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export const projectFilters = ["All", "React", "Next.js", "Full Stack", "AI", "Node.js", "WordPress"];

export const experience = [
  {
    company: "Northwind Labs",
    role: "Senior Full Stack Engineer",
    period: "2023 — Present",
    summary: "Own the platform surface for an AI-assisted operations product used by 30k engineers.",
    achievements: [
      "Cut p95 API latency from 820ms to 190ms through query planning and caching.",
      "Designed the streaming assistant architecture now used across three products.",
      "Mentored four engineers through their first production launches.",
    ],
  },
  {
    company: "Cobalt Systems",
    role: "Full Stack Engineer",
    period: "2021 — 2023",
    summary: "Built customer-facing dashboards and the event ingestion services behind them.",
    achievements: [
      "Shipped an events pipeline sustaining 20k messages per minute with zero drop rate.",
      "Led the AWS migration that reduced monthly infrastructure cost by 38%.",
      "Introduced end-to-end tests that took release regressions to near zero.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Engineer",
    period: "2019 — 2021",
    summary: "Delivered 20+ production sites and apps for startups and agencies.",
    achievements: [
      "Rebuilt a logistics dispatch tool used daily by 40 operators.",
      "Migrated eight WordPress properties onto a headless React front end.",
      "Maintained a 100% on-time delivery record across engagements.",
    ],
  },
];

export const services = [
  { title: "Full Stack Development", body: "End-to-end product delivery, from schema to shipped interface." },
  { title: "React Development", body: "Component architecture, state design, and interfaces that stay fast." },
  { title: "Next.js Development", body: "SSR, edge rendering, and routing strategy for content-heavy products." },
  { title: "Backend APIs", body: "Typed REST and GraphQL services with auth, jobs, and observability." },
  { title: "UI Engineering", body: "Design systems, motion, and accessibility taken seriously." },
  { title: "Database Design", body: "Modelling, indexing, and migrations that scale past the demo." },
  { title: "Performance Optimisation", body: "Core Web Vitals, bundle surgery, and query tuning." },
  { title: "AI Integrations", body: "Streaming assistants, retrieval pipelines, and tool-calling agents." },
];

export const testimonials = [
  {
    quote:
      "Abdul rebuilt our dashboard in six weeks and it still feels faster than anything else we run. He asks the questions nobody else does.",
    name: "Marie Osei",
    role: "VP Engineering, Northwind Labs",
  },
  {
    quote:
      "He owns problems end to end. Our ingestion pipeline has not paged anyone since the day he shipped it.",
    name: "Daniel Reyes",
    role: "CTO, Cobalt Systems",
  },
  {
    quote:
      "Rare combination: writes production-grade backend code and cares about the pixel. Our conversion went up 22%.",
    name: "Sana Iqbal",
    role: "Founder, Atlas Commerce",
  },
];

export const posts = [
  {
    title: "Streaming UIs without the jank",
    excerpt: "How to design a token stream that feels instant, from server backpressure to render batching.",
    date: "Mar 2026",
    read: "8 min",
  },
  {
    title: "The index you forgot to add",
    excerpt: "A field guide to Postgres query plans, and the five patterns behind most slow endpoints.",
    date: "Jan 2026",
    read: "11 min",
  },
  {
    title: "Motion as information",
    excerpt: "Animation is not decoration. A framework for deciding what should move and how much.",
    date: "Nov 2025",
    read: "6 min",
  },
];

export const github = {
  repos: 48,
  stars: 620,
  followers: 1240,
  streak: 214,
  languages: [
    { name: "TypeScript", pct: 46 },
    { name: "JavaScript", pct: 21 },
    { name: "SQL", pct: 14 },
    { name: "Python", pct: 11 },
    { name: "Other", pct: 8 },
  ],
  recent: [
    { name: "vortex-protocol", desc: "Realtime cluster visualiser", stars: 214, lang: "TypeScript" },
    { name: "cypher-core", desc: "Fleet operations console", stars: 168, lang: "TypeScript" },
    { name: "neural-lens", desc: "LLM code review companion", stars: 132, lang: "Python" },
    { name: "pulse-analytics", desc: "Self-hosted product analytics", stars: 106, lang: "TypeScript" },
  ],
};

export const suggestions = [
  "Tell me about Abdul",
  "What projects has he built?",
  "Why should I hire him?",
  "Show his AWS experience",
  "What is his strongest skill?",
  "How do I contact him?",
];

export function portfolioContext() {
  return JSON.stringify(
    {
      profile,
      stack: stack.map((s) => s.name),
      stats,
      timeline,
      skills: skillGroups,
      projects: projects.map(({ image: _image, ...rest }) => rest),
      experience,
      services,
      testimonials,
      posts,
      github,
    },
    null,
    0,
  );
}