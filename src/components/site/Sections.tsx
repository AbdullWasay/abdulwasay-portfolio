import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Star,
  GitBranch,
  Flame,
  Users,
  Search,
  ChevronDown,
  Quote,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Reveal, SectionHeading, Counter, Scramble } from "./primitives";
import { TrafficLights, TechIcon } from "./MacWindow";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  stats,
  timeline,
  funFacts,
  skillGroups,
  projects,
  projectFilters,
  experience,
  github,
  services,
  testimonials,
  posts,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function StatsBar() {
  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05} className="p-8 text-center">
            <div className={cn("font-mono text-3xl font-bold", stat.accent ? "text-accent" : "text-foreground")}>
              {stat.label === "Uptime rate" ? <Counter to={99.9} decimals={1} suffix="%" /> : <Counter to={stat.value} />}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Operator_log"
        title="A journey told in deployments"
        description="Six years of shipping, condensed into the moments that changed how I build."
      />
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="relative lg:col-span-2">
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border" aria-hidden />
          <ol className="space-y-10">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.08}>
                <li className="relative pl-10">
                  <span className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-accent bg-background" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{item.year}</span>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delay={0.15} className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Fun facts</h3>
          {funFacts.map((fact) => (
            <div
              key={fact}
              className="glass rounded-lg px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-accent/40"
            >
              {fact}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const group = skillGroups[active]!;

  useEffect(() => {
    if (locked) return;
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % skillGroups.length), 4200);
    return () => window.clearInterval(id);
  }, [locked]);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Capability_matrix"
        title="Six domains, live telemetry"
        description="Hover a channel to lock the readout. Each domain is backed by production systems, not tutorials."
      />

      <div
        onMouseEnter={() => setLocked(true)}
        onMouseLeave={() => setLocked(false)}
        className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
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
                <h3 className="text-2xl font-bold text-foreground">
                  <Scramble text={group.category} />
                </h3>
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">{group.note}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * itemIndex, duration: 0.3 }}
                      className="flex items-center gap-2 rounded border border-border/70 bg-card/50 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      <TechIcon name={item} size={13} />
                      <span className="truncate">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-8 flex items-center justify-between border-t border-border/60 pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>channel {String(active + 1).padStart(2, "0")}/{String(skillGroups.length).padStart(2, "0")}</span>
            <span className="flex items-center gap-2">
              <span className={cn("size-1.5 rounded-full", locked ? "bg-[#febc2e]" : "bg-accent animate-pulse")} />
              {locked ? "locked" : "auto-scan"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = projects.filter((project) => {
    const matchesFilter = filter === "All" || project.tags.includes(filter);
    const haystack = `${project.name} ${project.blurb} ${project.tech.join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  });

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Deployment_history"
        title="Selected work"
        description="Products built end to end — schema, service, interface and the motion in between."
        right={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <input
              id="project-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              className="w-56 rounded-md border border-border bg-secondary/40 py-2 pl-9 pr-3 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/60"
            />
          </div>
        }
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {projectFilters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
              filter === item
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            [ {item} ]
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="relative flex items-center gap-2 border-b border-border/70 bg-gradient-to-b from-secondary/70 to-secondary/20 px-3 py-2">
                <TrafficLights />
                <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[10px] tracking-wide text-foreground/70">
                  {project.id}.app
                </span>
              </div>
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <img
                  src={project.image}
                  alt={`${project.name} interface preview`}
                  loading="lazy"
                  width={1024}
                  height={576}
                  className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-background/85 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Key features</span>
                  {project.features.map((feature) => (
                    <span key={feature} className="font-mono text-[11px] text-muted-foreground">
                      — {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                  <span className="font-mono text-[10px] text-accent">{project.year}</span>
                </div>
                <p className="font-mono text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
                <ul className="flex flex-wrap items-center gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground"
                    >
                      <TechIcon name={tech} size={12} />
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  className="inline-flex w-full items-center justify-between rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Read case study
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
                <div className="flex items-center gap-5 pt-1">
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Github className="size-3.5" aria-hidden /> Code
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
                  >
                    <ArrowUpRight className="size-3.5" aria-hidden /> Live demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center font-mono text-sm text-muted-foreground">No projects match that query.</p>
      ) : null}
    </section>
  );
}

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Service_record"
        title="Where I've shipped"
        description="Click a role to expand the achievements behind it."
      />
      <div className="space-y-4">
        {experience.map((role, index) => {
          const expanded = open === index;
          return (
            <Reveal key={role.company} delay={index * 0.05}>
              <div className="overflow-hidden rounded-xl border border-border bg-card/50">
                <button
                  onClick={() => setOpen(expanded ? -1 : index)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
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
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
    </section>
  );
}

export function GithubPanel() {
  const weeks = Array.from({ length: 52 * 7 }, (_, index) => (index * 37) % 5);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Telemetry"
        title="GitHub activity"
        description="Contribution signal, language mix and the repositories I touched most recently."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card/50 p-6">
            <div className="mb-5 flex flex-wrap items-center gap-6">
              {[
                { icon: GitBranch, label: "Repos", value: github.repos },
                { icon: Star, label: "Stars", value: github.stars },
                { icon: Users, label: "Followers", value: github.followers },
                { icon: Flame, label: "Day streak", value: github.streak },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="size-4 text-accent" aria-hidden />
                  <span className="font-mono text-lg font-bold text-foreground">
                    <Counter to={item.value} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-hidden">
              {weeks.map((level, index) => (
                <span
                  key={index}
                  className="size-2 rounded-[2px]"
                  style={{
                    background:
                      level === 0
                        ? "var(--secondary)"
                        : `color-mix(in oklab, var(--accent) ${level * 22}%, var(--secondary))`,
                  }}
                />
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Last 12 months — sample data until the GitHub API is connected
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5">
          <div className="rounded-xl border border-border bg-card/50 p-6">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Languages</h3>
            <div className="mt-4 space-y-3">
              {github.languages.map((language) => (
                <div key={language.name} className="space-y-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-foreground/85">{language.name}</span>
                    <span className="text-muted-foreground">{language.pct}%</span>
                  </div>
                  <div className="h-1 w-full rounded bg-secondary">
                    <motion.div
                      className="h-1 rounded bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {github.recent.map((repo, index) => (
          <Reveal key={repo.name} delay={index * 0.05}>
            <a
              href="https://github.com"
              className="block h-full rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-foreground">{repo.name}</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Star className="size-3" aria-hidden />
                  {repo.stars}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{repo.desc}</p>
              <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-accent">
                {repo.lang}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Engagements"
        title="How I can help"
        description="Scoped ways to work together, from a single interface to a whole platform."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="group relative bg-background p-6 transition-colors hover:bg-card"
            style={{ transitionDelay: `${index * 10}ms` }}
          >
            <span className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-base font-bold text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
            <span className="mt-4 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index]!;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="Signal" title="What collaborators say" />
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-8 sm:p-12">
        <Quote className="size-8 text-accent/40" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <p className="max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl">{current.quote}</p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {current.name} — <span className="text-accent">{current.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-3">
          <button
            aria-label="Previous testimonial"
            onClick={() => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <span className="ml-2 font-mono text-[10px] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="Transmissions" title="Writing" description="Notes on performance, motion and data." />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 0.06}>
            <article className="group h-full rounded-xl border border-border bg-card/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{post.date}</span>
                <span className="size-1 rounded-full bg-accent" />
                <span>{post.read}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                Read <ArrowUpRight className="size-3" aria-hidden />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}