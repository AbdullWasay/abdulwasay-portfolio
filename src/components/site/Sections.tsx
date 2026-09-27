import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
 ArrowUpRight,
 Github,
 ChevronDown,
} from "lucide-react";
import { Reveal, SectionHeading, Counter, SectionShell } from "./primitives";
import { TechIcon } from "./MacWindow";
import { ProjectLivePreview, projectUsesLiveGridPreview } from "./ProjectLivePreview";
import { Link } from "@tanstack/react-router";
import {
 timeline,
 skillGroups,
 workflowTools,
 featuredProject,
 fullstackProjects,
 staticProjects,
 experience,
 education,
 certifications,
 profile,
 type Project,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function About() {
 return (
 <SectionShell id="about" wash="cyan">
 <SectionHeading
 eyebrow="Operator log"
 title="A journey told in deployments"
 description="From FAST NUCES to production platforms, the roles and milestones that shaped how I build."
 />
 <div className="relative">
 <div
 aria-hidden
 className="absolute left-0 top-3 bottom-3 hidden w-px bg-gradient-to-b from-[#38bdf8]/50 via-[#64748b]/35 to-transparent md:block"
 />
 <div className="space-y-0 divide-y divide-border/70">
 {timeline.map((item, index) => (
 <motion.div
 key={item.year}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.35 }}
 transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
 className="grid gap-3 py-7 md:grid-cols-[7rem_1fr] md:gap-8 md:pl-8"
 >
 <p className="font-mono text-sm tabular-nums tracking-wide text-[#94a3b8] md:pt-1">
 {item.year}
 </p>
 <div>
 <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
 <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
 {item.title}
 </h3>
 <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
 {String(index + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
 </span>
 </div>
 <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
 {item.body}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </SectionShell>
 );
}

export function Skills() {
 const [active, setActive] = useState(0);
 const [paused, setPaused] = useState(false);
 const group = skillGroups[active]!;

 useEffect(() => {
 if (paused) return;
 const id = window.setInterval(() => setActive((prev) => (prev + 1) % skillGroups.length), 4200);
 return () => window.clearInterval(id);
 }, [paused]);

 const radius = 62;
 const circumference = 2 * Math.PI * radius;

 return (
 <SectionShell id="skills" wash="ember">
 <SectionHeading
 eyebrow="What I’m good at"
 title="Skills with fingerprints on them"
 description="Pick a lane, frontend, APIs, data, cloud, or AI. Hover to pause the auto-rotate."
 />

 <div
 onMouseEnter={() => setPaused(true)}
 onMouseLeave={() => setPaused(false)}
 className="grid gap-px overflow-hidden rounded-2xl border border-border bg-white/5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
 >
 {/* channel selector */}
 <div className="bg-card/60">
 {skillGroups.map((item, index) => {
 const isActive = index === active;
 return (
 <button
 key={item.category}
 type="button"
 onMouseEnter={() => setActive(index)}
 onFocus={() => setActive(index)}
 onClick={() => setActive(index)}
 className={cn(
 "relative flex w-full items-center gap-4 border-b border-border/60 px-6 py-5 text-left transition-colors last:border-b-0",
 isActive ? "bg-accent/5" : "hover:bg-secondary/40",
 )}
 >
 {isActive ? (
 <motion.span
 layoutId="capability-marker"
 className="absolute inset-y-0 left-0 w-[3px] bg-accent"
 transition={{ type: "spring", stiffness: 320, damping: 32 }}
 />
 ) : null}
 <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
 {String(index + 1).padStart(2, "0")}
 </span>
 <span className="flex-1">
 <span
 className={cn(
 "block text-sm font-bold uppercase tracking-wide transition-colors",
 isActive ? "text-accent" : "text-foreground/80",
 )}
 >
 {item.category}
 </span>
 <span className="mt-1 flex h-3 items-end gap-[3px]" aria-hidden>
 {Array.from({ length: 22 }).map((_, bar) => (
 <motion.span
 key={bar}
 className={cn("w-[3px] rounded-sm", isActive ? "bg-accent" : "bg-border")}
 animate={{
 height: isActive
 ? [3, 4 + ((bar * 7) % 9), 3 + ((bar * 3) % 11), 4]
 : 3 + ((bar * 5) % 4),
 }}
 transition={
 isActive
 ? { duration: 1.6, repeat: Infinity, delay: bar * 0.04, ease: "easeInOut" }
 : { duration: 0.3 }
 }
 />
 ))}
 </span>
 </span>
 <span className="font-mono text-xs tabular-nums text-muted-foreground">{item.level}%</span>
 </button>
 );
 })}
 </div>

 {/* readout */}
 <div className="relative overflow-hidden bg-background/60 p-8">
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 opacity-[0.07]"
 style={{
 backgroundImage:
 "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
 backgroundSize: "28px 28px",
 }}
 />
 <AnimatePresence mode="wait">
 <motion.div
 key={group.category}
 initial={{ opacity: 0, y: 14 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
 className="relative flex flex-col gap-8 sm:flex-row sm:items-center"
 >
 <div className="relative grid size-[160px] shrink-0 place-items-center">
 <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
 <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
 <motion.circle
 cx="80"
 cy="80"
 r={radius}
 fill="none"
 stroke="currentColor"
 strokeWidth="6"
 strokeLinecap="round"
 className="text-accent"
 initial={{ strokeDashoffset: circumference }}
 animate={{ strokeDashoffset: circumference * (1 - group.level / 100) }}
 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
 style={{ strokeDasharray: circumference, filter: "drop-shadow(0 0 6px currentColor)" }}
 />
 </svg>
 <div className="text-center">
 <div className="font-mono text-3xl font-bold text-accent">
 <Counter key={group.category} to={group.level} suffix="%" />
 </div>
 <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
 proficiency
 </div>
 </div>
 </div>

 <div className="min-w-0 flex-1">
 <h3 className="text-2xl font-bold text-foreground">{group.category}</h3>
 <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">{group.note}</p>
 <ul className="mt-6 grid gap-3 sm:grid-cols-2">
 {group.items.map((item, itemIndex) => (
 <motion.li
 key={item}
 initial={{ opacity: 0, x: -8 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.06 * itemIndex, duration: 0.3 }}
 className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-card/50 px-4 py-3.5 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
 >
 <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-black/5 bg-[#f4f6f8]">
 <TechIcon name={item} size={24} className="opacity-100" />
 </span>
 <span className="truncate font-medium">{item}</span>
 </motion.li>
 ))}
 </ul>
 </div>
 </motion.div>
 </AnimatePresence>

 <div className="relative mt-8 border-t border-border/60 pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
 channel {String(active + 1).padStart(2, "0")}/{String(skillGroups.length).padStart(2, "0")}
 </div>
 </div>
 </div>
 </SectionShell>
 );
}

export function Projects() {
 const fullStack = fullstackProjects.filter((project) => project.id !== featuredProject.id);

 return (
 <SectionShell id="projects" wash="rose">
 <SectionHeading
 eyebrow="Selected work"
 title="Products I've shipped"
 description="Full-stack platforms first, databases, auth, payments, admin, then a few marketing and static sites."
 />

 {/* Full-stack highlight */}
 <div className="mb-4 flex items-end justify-between gap-4">
 <div>
 <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Full-stack applications</p>
 <p className="mt-1 text-sm text-muted-foreground">
 Production systems with APIs, data models, and real user flows.
 </p>
 </div>
 <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
 {fullstackProjects.length} builds
 </span>
 </div>

 <Reveal className="mb-8" y={48}>
 <Link
 to="/projects/$projectId"
 params={{ projectId: featuredProject.id }}
 className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
 >
 <article className="grid lg:grid-cols-[1.35fr_1fr]">
 <div className="relative min-h-[240px] overflow-hidden border-b border-border lg:min-h-[360px] lg:border-b-0 lg:border-r">
 <img
 src={featuredProject.image}
 alt={`${featuredProject.name} storefront`}
 loading="eager"
 width={1600}
 height={900}
 className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/40" />
 </div>
 <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
 <div className="space-y-4">
 <div className="flex flex-wrap items-center gap-2">
 <span className="rounded-md bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent">
 Featured
 </span>
 <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
 Full stack
 </span>
 <span className="text-xs text-muted-foreground">{featuredProject.year}</span>
 </div>
 <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
 {featuredProject.name}
 </h3>
 <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
 {featuredProject.blurb}
 </p>
 <ul className="flex flex-wrap gap-2">
 {featuredProject.tech.slice(0, 6).map((tech) => (
 <li
 key={tech}
 className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2 py-1 text-[11px] text-muted-foreground"
 >
 <TechIcon name={tech} size={12} />
 {tech}
 </li>
 ))}
 </ul>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <span className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background">
 Case study
 <ArrowUpRight className="size-4" aria-hidden />
 </span>
 {featuredProject.demo ? (
 <span
 role="link"
 tabIndex={0}
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 window.open(featuredProject.demo, "_blank", "noopener,noreferrer");
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 e.stopPropagation();
 window.open(featuredProject.demo, "_blank", "noopener,noreferrer");
 }
 }}
 className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
 >
 Live site
 <ArrowUpRight className="size-3.5" aria-hidden />
 </span>
 ) : null}
 </div>
 </div>
 </article>
 </Link>
 </Reveal>

 <div className="grid gap-5 sm:grid-cols-2">
 {fullStack.map((project, index) => (
 <FullStackCard key={project.id} project={project} index={index} />
 ))}
 </div>

 {/* Static / marketing, secondary */}
 {staticProjects.length > 0 ? (
 <div className="mt-16 border-t border-border/60 pt-12">
 <div className="mb-6 flex items-end justify-between gap-4">
 <div>
 <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
 Marketing & static sites
 </p>
 <p className="mt-1 max-w-xl text-sm text-muted-foreground">
 A few brand and landing builds, polished frontends without a product backend.
 </p>
 </div>
 <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
 {staticProjects.length} sites
 </span>
 </div>

 <div className="grid gap-3 sm:grid-cols-2">
 {staticProjects.map((project, index) => (
 <StaticCard key={project.id} project={project} index={index} />
 ))}
 </div>
 </div>
 ) : null}
 </SectionShell>
 );
}

function FullStackCard({ project, index }: { project: Project; index: number }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 48 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-8% 0px" }}
 transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
 >
 <Link
 to="/projects/$projectId"
 params={{ projectId: project.id }}
 className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
 >
 <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
 {projectUsesLiveGridPreview(project) ? (
 <ProjectLivePreview demo={project.demo!} name={project.name} />
 ) : (
 <img
 src={project.image}
 alt={`${project.name} interface preview`}
 loading="lazy"
 width={1024}
 height={576}
 className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
 />
 )}
 <span className="absolute left-3 top-3 rounded-md border border-border/80 bg-background/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur-sm">
 Full stack
 </span>
 </div>
 <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
 <div className="flex items-start justify-between gap-3">
 <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{project.name}</h3>
 <span className="shrink-0 text-xs text-muted-foreground">{project.year}</span>
 </div>
 <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
 <ul className="mt-auto flex flex-wrap gap-1.5">
 {project.tech.slice(0, 5).map((tech) => (
 <li
 key={tech}
 className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2 py-0.5 text-[11px] text-muted-foreground"
 >
 <TechIcon name={tech} size={11} />
 {tech}
 </li>
 ))}
 {project.tech.length > 5 ? (
 <li className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
 +{project.tech.length - 5}
 </li>
 ) : null}
 </ul>
 <div className="flex items-center gap-4 border-t border-border pt-4">
 <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
 Case study
 <ArrowUpRight className="size-3.5" aria-hidden />
 </span>
 {project.demo ? (
 <span
 role="link"
 tabIndex={0}
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.demo, "_blank", "noopener,noreferrer");
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.demo, "_blank", "noopener,noreferrer");
 }
 }}
 className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
 >
 Live
 <ArrowUpRight className="size-3.5" aria-hidden />
 </span>
 ) : null}
 {project.publicSource !== false && project.github ? (
 <span
 role="link"
 tabIndex={0}
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.github, "_blank", "noopener,noreferrer");
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.github, "_blank", "noopener,noreferrer");
 }
 }}
 className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
 aria-label="GitHub"
 >
 <Github className="size-3.5" aria-hidden />
 </span>
 ) : null}
 </div>
 </div>
 </Link>
 </motion.div>
 );
}

function StaticCard({ project, index }: { project: Project; index: number }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-8% 0px" }}
 transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
 >
 <Link
 to="/projects/$projectId"
 params={{ projectId: project.id }}
 className="group flex gap-4 overflow-hidden rounded-xl border border-border/70 bg-card/50 p-3 transition-colors hover:border-border hover:bg-card/80 sm:p-4"
 >
 <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary sm:size-24">
 <img
 src={project.image}
 alt=""
 loading="lazy"
 width={192}
 height={192}
 className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
 />
 </div>
 <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
 <div>
 <div className="flex items-center gap-2">
 <h3 className="truncate text-base font-semibold tracking-tight text-foreground">{project.name}</h3>
 <span className="shrink-0 text-[11px] text-muted-foreground">{project.year}</span>
 </div>
 <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
 {project.blurb}
 </p>
 </div>
 <div className="flex items-center gap-3">
 <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 transition-colors group-hover:text-accent">
 Case study
 <ArrowUpRight className="size-3" aria-hidden />
 </span>
 {project.demo ? (
 <span
 role="link"
 tabIndex={0}
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.demo, "_blank", "noopener,noreferrer");
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 e.stopPropagation();
 window.open(project.demo, "_blank", "noopener,noreferrer");
 }
 }}
 className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
 >
 Live
 <ArrowUpRight className="size-3" aria-hidden />
 </span>
 ) : null}
 </div>
 </div>
 </Link>
 </motion.div>
 );
}

export function Experience() {
 const [open, setOpen] = useState(0);

 return (
 <SectionShell id="experience" wash="slate">
 <SectionHeading
 eyebrow="Roles"
 title="Where I've shipped"
 />
 <div className="space-y-4">
 {experience.map((role, index) => {
 const expanded = open === index;
 return (
 <Reveal key={`${role.company}-${role.role}`} delay={index * 0.05}>
 <div className="overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm">
 <button
 onClick={() => setOpen(expanded ? -1 : index)}
 aria-expanded={expanded}
 className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-accent/5"
 >
 <span>
 <span className="block text-lg font-bold text-foreground">{role.role}</span>
 <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-accent">
 {role.company}
 </span>
 </span>
 <span className="flex items-center gap-4">
 <span className="hidden font-mono text-xs text-muted-foreground sm:block">{role.period}</span>
 <ChevronDown
 className={cn("size-4 text-muted-foreground transition-transform", expanded && "rotate-180")}
 aria-hidden
 />
 </span>
 </button>
 <AnimatePresence initial={false}>
 {expanded ? (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="space-y-3 border-t border-border px-6 py-5">
 <p className="text-sm text-muted-foreground">{role.summary}</p>
 <ul className="space-y-2">
 {role.achievements.map((achievement) => (
 <li key={achievement} className="flex gap-3 font-mono text-sm text-foreground/85">
 <span className="text-accent">▸</span>
 {achievement}
 </li>
 ))}
 </ul>
 </div>
 </motion.div>
 ) : null}
 </AnimatePresence>
 </div>
 </Reveal>
 );
 })}
 </div>
 </SectionShell>
 );
}

export function Education() {
 return (
 <SectionShell id="education" wash="ember">
 <SectionHeading
 eyebrow="School & proof"
 title="Education & credentials"
 description="Degree and cloud certifications that back the work."
 />
 <div className="grid gap-5 lg:grid-cols-3">
 <Reveal className="lg:col-span-2" blur>
 <motion.div
 whileHover={{ y: -4 }}
 className="h-full rounded-2xl border border-border bg-card/80 p-7 backdrop-blur-sm"
 >
 <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Education</span>
 <h3 className="mt-3 text-2xl font-semibold text-foreground">{education.degree}</h3>
 <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
 {education.school} · {education.period}
 </p>
 <ul className="mt-6 grid gap-3 sm:grid-cols-2">
 {education.highlights.map((item) => (
 <li key={item} className="rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-muted-foreground">
 {item}
 </li>
 ))}
 </ul>
 </motion.div>
 </Reveal>
 <Reveal delay={0.06}>
 <motion.div whileHover={{ y: -4 }} className="h-full rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm">
 <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Certifications</span>
 <ul className="mt-4 space-y-3">
 {certifications.map((item) => (
 <li key={item} className="text-sm leading-relaxed text-foreground/90">
 {item}
 </li>
 ))}
 </ul>
 </motion.div>
 </Reveal>
 </div>
 </SectionShell>
 );
}

export function Toolkit() {
 return (
 <SectionShell id="toolkit" wash="slate">
 <SectionHeading
 eyebrow="How I ship"
 title="AI-native toolkit"
 description="The daily stack that compounds shipping speed, assistants, source control, design, and delivery."
 />
 <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
 {workflowTools.map((tool, index) => (
 <motion.div
 key={tool.name}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-8%" }}
 transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
 whileHover={{ backgroundColor: "color-mix(in srgb, #38bdf8 6%, var(--card))" }}
 className="group flex min-h-[7.5rem] items-start gap-4 bg-card p-5 transition-colors sm:p-6"
 >
 <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#eef2f7] ring-1 ring-black/5 transition-transform group-hover:scale-105">
 <TechIcon name={tool.name} size={24} />
 </span>
 <div className="min-w-0 pt-0.5">
 <div className="flex items-center gap-2">
 <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
 <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
 {String(index + 1).padStart(2, "0")}
 </span>
 </div>
 <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tool.blurb}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </SectionShell>
 );
}

export function GithubHandle() {
 const github = profile.socials.find((social) => social.label === "GitHub");
 if (!github) return null;

 return (
 <SectionShell wash="cyan" dense>
 <a
 href={github.url}
 target="_blank"
 rel="noreferrer"
 className="group flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card/70 px-6 py-6 sm:flex-row sm:items-center sm:px-8"
 >
 <div>
 <p className="text-sm text-muted-foreground">Public work on GitHub</p>
 <p className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
 @{github.handle}
 </p>
 </div>
 <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-foreground transition-colors group-hover:border-[#818cf8]/50 group-hover:text-[#c4b5fd]">
 <Github className="size-4" aria-hidden />
 View profile
 <ArrowUpRight className="size-3.5" aria-hidden />
 </span>
 </a>
 </SectionShell>
 );
}
