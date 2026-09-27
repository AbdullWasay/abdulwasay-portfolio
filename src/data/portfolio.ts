export const resumeUrl = "/CV.pdf";
export const resumeDownloadName = "Abdul_Wasay_CV.pdf";

export const profile = {
 name: "Abdul",
 fullName: "Abdul Wasay",
 initials: "AW",
 role: "Software Engineer",
 tagline: "Full-stack engineer shipping production apps, APIs, and AI-native features end to end.",
 summary:
 "Full-Stack Developer with hands-on experience architecting scalable, production-grade web apps and microservices end to end, React/Next.js frontends, Node.js/Nest.js/Python FastAPI backends, REST & WebSockets, PostgreSQL/MySQL/MongoDB, and AWS. Owns full architecture on multi-vendor platforms while integrating LLM/RAG features, optimizing performance, and shipping with CI/CD.",
 location: "Islamabad, Pakistan · GMT+5",
 phone: "+923339167909",
 email: "abdul.wasay308@gmail.com",
 availability: "Open to full-time & contract work",
 years: 3,
 socials: [
 { label: "GitHub", handle: "AbdullWasay", url: "https://github.com/AbdullWasay" },
 { label: "LinkedIn", handle: "abdulwasay308", url: "https://linkedin.com/in/abdulwasay308/" },
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
 { name: "GSAP", short: "GSAP", ring: 1, slug: "greensock" },
 { name: "Lenis", short: "LEN", ring: 1 },
 { name: "MongoDB", short: "MNG", ring: 1, slug: "mongodb" },
 { name: "PostgreSQL", short: "PG", ring: 1, slug: "postgresql" },
 { name: "MySQL", short: "SQL", ring: 1, slug: "mysql" },
 { name: "Prisma", short: "PRS", ring: 2, slug: "prisma", color: "ffffff" },
 { name: "AWS", short: "AWS", ring: 2, slug: "amazonaws", color: "ff9900" },
 { name: "Docker", short: "DKR", ring: 2, slug: "docker" },
 { name: "Git", short: "GIT", ring: 2, slug: "git" },
 { name: "GitHub", short: "GH", ring: 2, slug: "github", color: "181717" },
 { name: "Firebase", short: "FIR", ring: 2, slug: "firebase" },
 { name: "Vercel", short: "VRC", ring: 2, slug: "vercel", color: "000000" },
 { name: "Python", short: "PY", ring: 2, slug: "python" },
 { name: "Stripe", short: "STR", ring: 2, slug: "stripe" },
 { name: "Neon", short: "NEO", ring: 2, slug: "neon", color: "00E599" },
];

export function techIconUrl(slug: string, color?: string) {
 return `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
}

export function techBySlug(name: string) {
 return stack.find((tech) => tech.name.toLowerCase() === name.toLowerCase());
}

export const stats = [
 { label: "Client projects", value: 6, display: "6+", accent: true },
 { label: "AWS certifications", value: 3, display: "3" },
 { label: "B.S. CS", value: 2025, display: "2025", accent: true },
];

export const timeline = [
 {
 year: "2021",
 title: "FAST NUCES, Computer Science",
 body: "Started B.S. Computer Science at FAST NUCES Islamabad, web development, cloud computing, ML, software engineering, and database systems.",
 },
 {
 year: "2024",
 title: "TechXServe internship",
 body: "Full-Stack Developer Intern, built the foundation of a B2B e-commerce platform with auth, RBAC, product management, API-driven architecture, and CI/CD automation.",
 },
 {
 year: "2025",
 title: "Ilmversity → Lantrotech",
 body: "Associate Software Engineer on a multi-tenant LMS serving multiple schools across web and mobile. Then Software Developer I at Lantrotech, Blue Ocean and 6+ client platforms.",
 },
 {
 year: "2026",
 title: "Gemelli & production scale",
 body: "Contract full-stack build of Gemelli Store, multi-vendor marketplace with AI automation, Paynet payments, courier APIs, and multilingual CMS. Continued client delivery at Lantrotech.",
 },
];

export const funFacts = [
 "Ships on Fridays. Carefully.",
 "Has opinions about TypeScript strictness.",
 "Keyboard: mechanical, always.",
 "Can debug a layout issue in 60 seconds.",
];

export const skillGroups = [
 {
 category: "Frontend",
 level: 95,
 items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "Redux Saga", "Redux Thunk", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis"],
 note: "Strong React focus, Hooks, reusable components, responsive layouts, and frontend performance.",
 },
 {
 category: "Backend",
 level: 90,
 items: ["Node.js", "Python", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets", "Nest.js"],
 note: "APIs and services in Python/Node, loading states, errors, and real-time WebSocket features.",
 },
 {
 category: "Databases",
 level: 88,
 items: ["PostgreSQL", "MySQL", "MongoDB", "RDS", "Prisma", "Firebase"],
 note: "Relational and document stores, schema design, query tuning, and ORM-backed services.",
 },
 {
 category: "AI & RAG",
 level: 86,
 items: ["RAG pipelines", "Google Gemini", "OpenAI", "AWS Textract", "Prompt engineering", "Tool calling", "Streaming APIs"],
    note: "LLM in production: KYC OCR, grounded chat, Gemini tools, and chunked AI schedule generation.",
 },
 {
 category: "Cloud & DevOps",
 level: 85,
 items: ["AWS", "Bedrock", "Textract", "S3", "Lambda", "Cognito", "Amplify", "GitHub Actions", "CI/CD", "Docker"],
 note: "AWS-backed delivery, Bedrock, Textract, S3, Lambda, Cognito, Amplify, plus GitHub Actions CI/CD.",
 },
 {
 category: "Integrations",
 level: 82,
 items: ["Stripe", "Paynet", "GraphQL", "REST APIs", "Webhooks", "Courier APIs"],
 note: "Third-party APIs, payments, and logistics wired into maintainable production systems.",
 },
];

/** Tools that signal how I actually ship, AI-native senior workflow. */
export const workflowTools = [
 {
 name: "Cursor",
 blurb: "AI-native IDE for multi-file refactors, agents, and fast iteration.",
 },
 {
 name: "Claude",
 blurb: "Deep reasoning for architecture, reviews, and complex debugging.",
 },
 {
 name: "GitHub",
 blurb: "Source of truth, PRs, Actions CI/CD, issues, and code review.",
 },
 {
 name: "GitHub Copilot",
 blurb: "Inline assist for boilerplate, tests, and API scaffolding.",
 },
 {
 name: "ChatGPT",
 blurb: "Rapid prototyping, docs drafts, and exploratory problem-solving.",
 },
 {
 name: "Google Gemini",
 blurb: "Production LLM for chatbots, RAG, and seller-facing AI features.",
 },
 {
 name: "OpenAI",
 blurb: "APIs for embeddings, tool calling, and streaming assistants.",
 },
 {
 name: "Figma",
 blurb: "Design handoff, tokens, and pixel-accurate UI collaboration.",
 },
 {
 name: "Docker",
 blurb: "Reproducible local envs and consistent deploy artifacts.",
 },
 {
 name: "Vercel",
 blurb: "Preview deploys, edge delivery, and Next.js production hosting.",
 },
 {
 name: "Postman",
 blurb: "API contracts, collections, and integration smoke tests.",
 },
 {
 name: "Lovable",
 blurb: "AI app builder for rapid UI prototypes and production-ready scaffolds.",
 },
] as const;

export type Project = {
 id: string;
 name: string;
 year: string;
 blurb: string;
 featured?: boolean;
 /** Full-stack product builds vs marketing/static sites. */
 kind: "fullstack" | "static";
 /** Company/client work, show contribution only, hide live demo & build story. */
 contributionOnly?: boolean;
 features: string[];
 tech: string[];
 tags: string[];
 image: string;
 github: string;
 publicSource?: boolean;
 demo?: string;
 tagline: string;
 overview: string[];
 briefPitch?: string;
 briefCards?: { label: string; value: string; hint?: string }[];
 briefDomains?: { title: string; summary: string; points: string[]; headline?: string }[];
 architecture?: {
 role: string;
 description: string;
 groups: { label: string; modules: { name: string; detail: string }[] }[];
 }[];
 details: { label: string; value: string }[];
 challenges: { title: string; body: string; fix: string; severity?: string; impact?: string }[];
  methodology: { phase: string; title: string; body?: string }[];
 stackGroups: { label: string; items: string[] }[];
 achievements: string[];
 outcomes: { metric: string; label: string; note: string }[];
 impactGroups?: { label: string; headline: string; points: string[] }[];
 schema?: {
 modelCount: number;
 provider: string;
 allModels?: readonly string[];
 fullMermaid?: string;
 standaloneModels?: readonly string[];
 domains: { label: string; mermaid?: string; models: string[]; relations: string[] }[];
 };
 gallery: { image: string; caption: string }[];
 /** When true, hero cover embeds `demo` in an iframe (if the site allows framing). */
 embedCover?: boolean;
};

const placeholder = "/assets/project-vortex.jpg";
const placeholder2 = "/assets/project-cypher.jpg";
const placeholder3 = "/assets/project-lens.jpg";

import { caseStudies } from "./case-studies";
import { gemelliCover } from "./gemelli-assets";
import { kingswellCover } from "./kingswell-assets";
import { clipperguysCover } from "./clipperguys-assets";
import { oradentalwellnessCover } from "./oradentalwellness-assets";
import { afroboosteurCover } from "./afroboosteur-assets";
import { souvenirhuntCover } from "./souvenirhunt-assets";
import { blueoceanCover } from "./blueocean-assets";
import { empoweredaiCover } from "./empoweredai-assets";

const baseProjects = [
 {
 id: "gemelli",
 name: "Gemelli Marketplace",
 year: "2026",
 featured: true,
 kind: "fullstack",
 blurb: "Production AI-native multi-vendor marketplace for Moldova, Gemini seller tools, AWS Textract KYC OCR, Paynet payments, smart courier routing, and seller REST API. Live at gemelli.store.",
 features: [
 "175+ API routes on Next.js 15 + Neon PostgreSQL",
 "Google OAuth sign-in + 2FA (NextAuth)",
 "Google Gemini AI, 15+ seller & platform tools",
 "AI KYC OCR + product verification (AWS Textract / S3)",
 "AI review moderation, content workflows & support ticketing",
 "Multi-vendor cart with smart courier routing",
 "Paynet 3DS + COD + Gemelli Balance wallet",
 "5-tier subscriptions with Paynet billing",
 "CPC advertising with AI smart suggestions",
 "Seller REST API v1 + HMAC webhooks (ERP/1C)",
 "Trilingual storefront (EN / RO / RU)",
 "T+14 weekly seller payouts + admin CSV export",
 ],
 tech: ["Next.js", "Neon DB", "Prisma", "Google Gemini", "AWS Textract", "Paynet", "AWS S3", "Redux"],
 tags: ["Next.js", "Full Stack", "AI"],
 image: gemelliCover,
 github: "https://github.com",
 publicSource: false,
 demo: "https://gemelli.store",
 },
 {
 id: "blueocean",
 name: "Blue Ocean",
 year: "2025",
 kind: "fullstack",
 contributionOnly: true,
    blurb: "Feature development for Blue Ocean at Lantrotech: full-stack modules, AI schedule generation, PDF SOW extraction, change-order reports, and multi-model AI failover.",
    features: [
      "Built complete new modules end-to-end: UI, APIs, data models, and shipping",
      "AI schedule generation: prompt design, chunking, and context building",
      "PDF scope-of-work extraction with schema validation and token utilization controls",
      "Change-order report generation and additional construction ops modules",
      "Multi-provider AI failover when primary models are unavailable",
      "Frontend: React/Next.js admin surfaces, dashboards, and data grids",
      "Backend: FastAPI / NestJS services, REST APIs, and WebSocket flows",
      "Database: PostgreSQL/Prisma work with query optimisation",
      "Deployment: CI/CD pipelines, Docker packaging, and production releases",
    ],
 tech: ["NestJS", "FastAPI", "React", "Next.js", "PostgreSQL", "Prisma", "Python", "Socket.io"],
 tags: ["Full Stack", "React", "Node.js", "AI"],
 image: blueoceanCover,
 github: "https://github.com",
 publicSource: false,
 },
 {
 id: "kingswell",
 name: "Kingswell Estate Agents",
 year: "2025",
 featured: true,
 kind: "fullstack",
 blurb: "Premium UK estate agency platform with searchable listings, a MongoDB CMS admin, a RAG chatbot grounded in live property data, and lead capture across London & Kent.",
 features: [
 "Premium public site with buy/rent search across London & Kent",
 "Custom MongoDB CMS at /kingswell-admin, no headless SaaS",
 "RAG chatbot: answers only from live listings and agency facts (no invented properties)",
 "Lead pipeline: valuation, viewing, enquiry and landlord forms",
 "Cloudinary image uploads + Schema.org SEO",
 "Secure cookie-based admin auth with middleware-protected routes",
 ],
 tech: ["Next.js", "MongoDB", "Google Gemini", "Cloudinary", "Tailwind CSS", "Vercel"],
 tags: ["Next.js", "Full Stack", "PropTech"],
 image: kingswellCover,
 github: "https://github.com",
 publicSource: false,
 demo: "https://www.kingswellestateagents.co.uk/",
 },
 {
 id: "afroboosteur",
 name: "AfroBoosteur",
 year: "2024",
 kind: "fullstack",
 blurb: "Full-stack dance & coaching platform, courses, multi-seller shop, Socket.io chat, Google auth, and Stripe · Twint · PayPal · QR gift-card payments. Live at afroboosteur.vercel.app.",
 features: [
 "Course publishing, enrollment, and coach dashboards",
 "Google OAuth + Firebase email/password auth",
 "Real-time course chat and notifications",
 "Stripe, Twint, PayPal, credits, QR gift & discount cards",
 "Multi-seller shop with order tracking",
 "Helmet reservations with QR event check-in",
 "Referral codes with admin analytics and rewards",
 "Trilingual PWA (FR / EN / DE)",
 ],
 tech: ["Next.js", "Firebase", "MongoDB", "Socket.io", "Stripe", "PayPal", "Cloudinary"],
 tags: ["Next.js", "Full Stack", "Node.js"],
 image: afroboosteurCover,
 github: "https://github.com",
 demo: "https://afroboosteur.vercel.app",
 },
 {
 id: "souvenirhunt",
 name: "Souvenir Hunt",
 year: "2025",
 kind: "fullstack",
 blurb: "Self-guided city clue hunts, Stripe checkout, mobile play engine, admin Studio CMS, and QR staff confirmation for physical souvenirs. Live at souvenirhunt.vercel.app.",
 features: [
 "TanStack Start SSR + 15 server functions on MongoDB",
 "Stripe Checkout, EUR 25 hunt access for 1–6 players",
 "Mobile play engine, clues, hints, answer validation, Maps links",
 "Admin Studio, hunt CRUD, step builder, publish controls",
 "QR completion handoff + staff PIN close workflow",
 "Play-link email via Mailtrap / Resend after purchase",
 "Resume by access code or purchase email",
 "7 cities seeded across 4 countries",
 ],
 tech: ["TanStack Start", "MongoDB", "Stripe", "React", "TypeScript"],
 tags: ["Full Stack", "React", "Node.js"],
 image: souvenirhuntCover,
 github: "https://github.com",
 demo: "https://souvenirhunt.vercel.app/",
 },
 {
 id: "empoweredai",
 name: "Empowered-AI",
 year: "2025",
 kind: "fullstack",
 blurb: "Flutter accessibility app for the visually impaired: fine-tuned YOLO object detection, scene description, OCR, emotion detection, currency detection, color recognition, item locator, and voice feedback via a Flask AI backend.",
 features: [
 "Flutter mobile client with voice commands and audio feedback",
 "Fine-tuned YOLO model for real-time object detection",
 "Scene description and color recognition",
 "Text recognition (OCR) for signs, labels, and documents",
 "Currency detection for paper-money denominations",
 "Facial emotion detection and item-locator assist",
 "Flask server offloads CV/ML inference from the device",
 "PyTorch / TensorFlow training pipeline on Colab",
 ],
 tech: ["Flutter", "Dart", "YOLO", "Python", "Flask", "PyTorch", "TensorFlow", "Firebase"],
 tags: ["Flutter", "AI", "Computer Vision"],
 image: empoweredaiCover,
 github: "https://github.com",
 publicSource: false,
 },
 {
 id: "oradentalwellness",
 name: "ORA Dental Wellness",
 year: "2026",
 kind: "static",
 blurb: "Quiet-luxury dental clinic site in Bahria Town Rawalpindi, aligners, implants, ten treatment disciplines, live Google reviews, journal, and WhatsApp booking. Live at oradentalwellness.com.",
 features: [
 "Single-page scroll story, atelier, founders, treatments, team, journal",
 "Interactive ten-discipline treatment wheel",
 "Live Google reviews with Places API + fallback",
 "Typed blog/journal with local SEO guides",
 "Booking form via Nodemailer server function",
 "WhatsApp-first conversion + Meta Pixel tracking",
 ],
 tech: ["TanStack Start", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Lenis", "Embla Carousel", "Zod"],
 tags: ["TanStack", "Marketing", "Static Site"],
 image: oradentalwellnessCover,
 github: "https://github.com/AbdullWasay/oradentalandaesthetics",
 publicSource: true,
 demo: "https://www.oradentalwellness.com/",
 },
 {
 id: "clipperguys",
 name: "Clipper Guys",
 year: "2025",
 kind: "static",
 blurb: "Marketing site for a clipping agency: scroll-driven homepage, typed SEO landers, Calendly booking, and clipper join flow. Live at clipperguys.vercel.app.",
 features: [
 "Long-form homepage with scroll-driven sections",
 "Typed SEO landing pages for vertical keywords",
 "Calendly strategy-call booking embed",
 "Clipper community join form via Formspree API",
 "Lenis smooth scroll + scroll reveal interactions",
 "Cookie consent, FAQ accordion, client logo marquee",
 ],
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lenis", "Radix UI"],
 tags: ["Next.js", "Marketing", "Static Site"],
 image: clipperguysCover,
 github: "https://github.com",
 publicSource: false,
 demo: "https://clipperguys.vercel.app/",
 },
];

export const projects = baseProjects.map((project) => ({
 ...project,
 ...(caseStudies[project.id as keyof typeof caseStudies] as unknown as Omit<Project, keyof typeof project>),
})) as Project[];

export function projectById(id: string) {
 return projects.find((project) => project.id === id);
}

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;

export const fullstackProjects = projects.filter((p) => p.kind === "fullstack");
export const staticProjects = projects.filter((p) => p.kind === "static");

export const projectFilters = ["All", "React", "Next.js", "Full Stack", "AI", "Node.js", "WordPress"];

export const services = [
 {
 title: "Full Stack Web Apps",
 body: "End-to-end product development, React/Next.js frontends, Node.js or Python backends, and cloud deployment.",
 },
 {
 title: "SaaS Platforms",
 body: "Multi-tenant platforms with auth, billing, role-based access, and admin dashboards built to scale.",
 },
 {
 title: "E-commerce & Marketplaces",
 body: "Payment-integrated storefronts and multi-seller marketplaces with inventory, orders, and seller dashboards.",
 },
 {
 title: "Landing Sites & Brand",
 body: "High-conversion marketing sites with polished design, CMS admin panels, and SEO foundations.",
 },
];

export const posts = [
 {
 slug: "gemelli-marketplace-neon",
 title: "Building Gemelli, An AI-Native Multi-Vendor Marketplace on Neon",
 excerpt:
 "How I architected 40+ Prisma models on Neon PostgreSQL, wired Google Gemini across 15+ seller tools, built smart courier routing for Nova Post and FAN Courier, and shipped a production marketplace at gemelli.store.",
 date: "Aug 2024",
 read: "8 min read",
 body: [
 "Gemelli Store needed a production multi-vendor marketplace, not a demo. The data model grew past 40 Prisma models on Neon PostgreSQL covering sellers, products, orders, ads, campaigns, and multilingual CMS content.",
 "Google Gemini powers seller-facing tools: product verification, KYC OCR assist, review moderation, and content drafting. Courier routing spans Nova Post and FAN Courier with Paynet for payments.",
 "The result is a live storefront at gemelli.store with seller APIs, advertising, and operational tooling that holds up under real traffic.",
 ],
 },
 {
 slug: "twint-payments-nextjs",
 title: "Twint Payments in Next.js, A Practical Guide",
 excerpt:
 "Integrating the Swiss Twint payment method via Stripe Checkout, including session creation, verification, and the gotchas nobody documents.",
 date: "Jul 2024",
 read: "4 min read",
 body: [
 "Twint shows up often for Swiss customers, but Stripe Checkout docs leave a few sharp edges. Session creation needs the right payment method types, and return URLs must handle both success and cancel cleanly.",
 "Verification should happen server-side after redirect, never trust the client alone. Cache idempotency keys when retrying checkout creation so you do not double-charge.",
 "Once wired, Twint sits beside card payments with the same fulfillment path, which keeps the Next.js app simpler than a custom Twint SDK integration.",
 ],
 },
 {
 slug: "pwa-install-prompts",
 title: "PWA Install Prompts on iOS and Android",
 excerpt:
 "The beforeinstallprompt API, why it doesn't work on iOS, and how to build a graceful manual-install flow that actually converts.",
 date: "Jun 2024",
 read: "5 min read",
 body: [
 "Android Chrome fires beforeinstallprompt when install criteria are met. Capture that event, defer the native prompt, and surface your own CTA when the user is ready.",
 "iOS Safari never exposes that event. Detect standalone mode, show clear Share → Add to Home Screen instructions, and keep the UI honest about what the OS allows.",
 "A dual-path install flow, deferred prompt on Android, guided manual install on iOS, converts better than a single generic banner.",
 ],
 },
];

export type Post = (typeof posts)[number];

export function postBySlug(slug: string) {
 return posts.find((post) => post.slug === slug);
}

export const suggestions = [
 "What projects have you shipped?",
 "What's your tech stack?",
 "Are you available for freelance work?",
 "Tell me about Gemelli Marketplace",
 "What services do you offer?",
];

export const education = {
 school: "FAST NUCES Islamabad",
 degree: "B.S. Computer Science",
 period: "2021 - 2025",
 highlights: [
 "Web Development · Cloud Computing · Machine Learning Operations",
 "Statistical Modelling · Deep Learning · AI · Software Engineering",
 "Database Systems · Mobile Software · Game Development",
 ],
};

export const certifications = [
 "AWS Academy Cloud Data Pipeline Builder",
 "AWS Academy Cloud Foundations",
 "AWS Academy Cloud Web Application Builder",
];

export const experience = [
 {
 company: "Lantrotech",
 role: "Software Developer I",
 period: "Oct 2025 - Present",
    summary:
      "Full-stack feature development for Blue Ocean and other US/international client platforms: APIs, databases, UI, and AI schedule generation.",
    achievements: [
      "Contribute across the full stack for Blue Ocean (Python, FastAPI, PostgreSQL, Next.js, TypeScript, Node.js, REST, WebSockets).",
      "Design and ship end-to-end features spanning API development, database work, and UI implementation.",
      "Designed prompts and chunking/context-building strategies for AI-based schedule generation on Blue Ocean.",
      "Support a radiological software platform (web + Java desktop) alongside 6+ additional client projects.",
    ],
 },
 {
 company: "Gemelli Marketplace",
 role: "AI Automation & Integration Engineer (Contract)",
 period: "Feb 2026, Sep 2026",
 summary:
 "Architected and built a production multi-vendor marketplace end to end, AI automation (KYC OCR, verification, moderation), payments, logistics, and seller tooling.",
 achievements: [
 "Owned full-stack architecture, database design, AWS storage/integrations, CI/CD, and deployment.",
 "Implemented AI-driven product verification and KYC OCR (AWS Textract / S3), plus review moderation and content workflows.",
 "Built real-time communication and an AI-assisted ticketing workflow for customer service.",
 "Built seller APIs, campaigns, promotions, and a multilingual CMS (EN / RO / RU).",
 "Integrated Paynet, Nova Post, and FAN Courier; optimized backend performance in production.",
 ],
 },
 {
 company: "Ilmversity",
 role: "Associate Software Engineer",
 period: "Aug 2025, Oct 2025",
 summary:
 "Contributed to a multi-tenant LMS serving multiple schools across web and mobile-connected workflows.",
 achievements: [
 "Delivered two major platform features with frontend and backend implementation.",
 "Ensured seamless integration across the web platform and mobile application ecosystem.",
 ],
 },
 {
 company: "TechXServe",
 role: "Full-Stack Developer Intern",
 period: "Aug 2024, Oct 2024",
 summary: "Built the foundation of a B2B e-commerce platform from scratch during a full-stack internship.",
 achievements: [
 "Developed core frontend/backend architecture with authentication and role-based workflows.",
 "Implemented product management and API-driven communication between services.",
 "Set up CI/CD and deployment automation for reliable builds, testing, and releases.",
 ],
 },
];

export function portfolioContext() {
 return JSON.stringify({
 profile,
 resumeHighlights: {
 title: "Software Engineer",
 summary: profile.summary,
      aiWork: [
        "AI schedule generation with prompt design, chunking, and context building (Blue Ocean).",
        "AI KYC OCR and product verification automation with AWS Textract/S3 (Gemelli).",
        "AI review moderation, content management, and AI-assisted support ticketing (Gemelli).",
        "RAG chatbot grounded in live property and CMS data (Kingswell).",
        "Google Gemini across 15+ seller and platform tools (Gemelli).",
      ],
 coreSkills: {
 frontend: ["React", "Next.js", "TypeScript", "JavaScript", "responsive UI"],
 backend: ["Node.js", "Express.js", "Nest.js", "Python", "FastAPI", "REST APIs", "WebSockets/Socket.IO"],
 databases: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Firebase"],
 cloud: ["AWS Bedrock", "Textract", "S3", "Lambda", "Cognito", "Amplify", "Docker", "CI/CD", "GitHub Actions"],
 ai: ["LLM integration", "RAG", "prompt design", "AI-assisted automation"],
 },
 },
 stack: stack.map((s) => s.name),
 skillGroups: skillGroups.map((g) => ({ category: g.category, items: g.items, note: g.note })),
 workflowTools: workflowTools.map((t) => ({ name: t.name, blurb: t.blurb })),
 projects: projects.map((p) => ({
 name: p.name,
 blurb: p.blurb,
 tech: p.tech,
 features: p.features,
 kind: p.kind,
 contributionOnly: p.contributionOnly ?? false,
 })),
 experience,
 education,
 certifications,
 services,
 highlights: [
 "Software engineer, React/Next.js, Nest.js/FastAPI, PostgreSQL/MySQL, AWS.",
      "AI/LLM: KYC OCR (Textract), Gemini seller tools, Kingswell RAG chatbot, Blue Ocean schedule chunking.",
 "Ships with GitHub as the delivery backbone, PRs, Actions CI/CD, and code review.",
 "AI-native workflow: Cursor, Claude, Copilot, Gemini, Lovable, and OpenAI day to day.",
 ],
 });
}

export const testimonials = [
 {
 name: "Estate Agency Client",
 role: "Director, Kingswell Estate Agents",
 quote: "Abdul delivered a polished, full-featured website with a custom CMS. The admin panel makes managing listings effortless. Highly recommended.",
 },
];
