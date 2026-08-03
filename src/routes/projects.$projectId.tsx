import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUpRight, Github, Target, Wrench, Trophy, X, ChevronRight } from "lucide-react";
import { Backdrop, Cursor, ScrollProgress } from "@/components/site/Atmosphere";
import { MacWindow, TechIcon, TrafficLights } from "@/components/site/MacWindow";
import { Reveal, SectionHeading, Scramble } from "@/components/site/primitives";
import { Footer } from "@/components/site/Contact";
import { projects, projectById, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projectById(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const title = project ? `${project.name} — Case Study | Abdul Rahman` : "Case Study | Abdul Rahman";
    const description = project?.tagline ?? "Engineering case study by Abdul Rahman.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectCaseStudy,
});

const sections = [
  { id: "brief", label: "Brief" },
  { id: "challenges", label: "Challenges" },
  { id: "method", label: "Method" },
  { id: "stack", label: "Stack" },
  { id: "impact", label: "Impact" },
  { id: "gallery", label: "Gallery" },
];

function SectionRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="Case study sections"
      className="pointer-events-auto fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "h-px transition-all duration-500",
                isActive ? "w-8 bg-accent" : "w-3 bg-border group-hover:w-6 group-hover:bg-accent/60",
              )}
            />
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest transition-colors",
                isActive ? "text-accent" : "text-muted-foreground/50 group-hover:text-muted-foreground",
              )}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

function useActiveSection() {
  const [active, setActive] = useState(sections[0]!.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function TypedTagline({ text }: { text: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const id = window.setInterval(() => {
      setCount((prev) => {
        if (prev >= text.length) {
          window.clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <p className="max-w-[54ch] font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
      <span className="text-accent">&gt;</span> {text.slice(0, count)}
      <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-accent" />
    </p>
  );
}

function ChallengeConsole({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const challenge = project.challenges[active]!;
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
        {project.challenges.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative min-w-[220px] flex-1 rounded-xl border p-4 text-left transition-all duration-300 lg:min-w-0",
                isActive
                  ? "border-accent/50 bg-accent/5"
                  : "border-border/70 bg-card/30 hover:border-accent/30 hover:bg-card/60",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="challenge-marker"
                  className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-accent"
                />
              ) : null}
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">issue_0{i + 1}</span>
              <p className={cn("mt-1 text-sm font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                {item.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={challenge.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-full gap-5 rounded-2xl border border-border/70 bg-card/40 p-6 md:grid-cols-2"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="size-3.5 text-destructive" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-widest text-destructive">The problem</span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-foreground">{challenge.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{challenge.body}</p>
            </div>
            <div className="space-y-3 rounded-xl border border-accent/25 bg-accent/5 p-5">
              <div className="flex items-center gap-2">
                <Wrench className="size-3.5 text-accent" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Resolution</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{challenge.fix}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MethodTrack({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 24,
  });

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-[7px] top-2 h-full w-px bg-border" aria-hidden />
      <motion.div
        style={{ height }}
        className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-accent to-accent/20"
        aria-hidden
      />
      {project.methodology.map((step, i) => (
        <Reveal key={step.phase} delay={i * 0.04} className="group relative pb-12 last:pb-0">
          <span className="absolute -left-10 top-1 grid size-4 place-items-center rounded-full border border-accent/50 bg-background transition-transform duration-300 group-hover:scale-125">
            <span className="size-1.5 rounded-full bg-accent transition-all duration-300 group-hover:shadow-[0_0_10px_var(--accent)]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{step.phase}</span>
          <h3 className="mt-1 text-lg font-bold text-foreground transition-colors group-hover:text-accent">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

function StackDeck({ project }: { project: Project }) {
  const [group, setGroup] = useState(0);
  const active = project.stackGroups[group]!;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {project.stackGroups.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setGroup(i)}
            className={cn(
              "relative rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
              i === group
                ? "border-accent/50 text-accent"
                : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground",
            )}
          >
            {i === group ? (
              <motion.span layoutId="stack-pill" className="absolute inset-0 rounded-full bg-accent/10" />
            ) : null}
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {active.items.map((item, i) => (
            <motion.div
              key={`${active.label}-${item}`}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border/70 bg-card/30 px-3 py-5 transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <TechIcon
                name={item}
                size={26}
                className="opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              />
              <span className="text-center font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                {item}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectCaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [lightbox, setLightbox] = useState<number | null>(null);
  const active = useActiveSection();
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Backdrop />
      <Cursor />
      <ScrollProgress />
      <SectionRail active={active} />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <TrafficLights />
          <Link
            to="/"
            hash="projects"
            className="ml-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> All work
          </Link>
          <span className="ml-auto font-mono text-[11px] text-foreground/70">
            ~/work/{project.id} <span className="text-accent">●</span>
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14">
        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <Reveal className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                Case study · {project.year}
              </span>
              <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tighter sm:text-6xl">
                <Scramble text={project.name} />
              </h1>
              <TypedTagline text={project.tagline} />
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-3">
              <a
                href={project.demo}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground"
              >
                <ArrowUpRight className="size-3.5" aria-hidden /> Live site
              </a>
              <a
                href={project.github}
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Github className="size-3.5" aria-hidden /> Source
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <dl className="divide-y divide-border/60 rounded-2xl border border-border/70 bg-card/30 backdrop-blur">
              {project.details.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-accent/5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {detail.label}
                  </dt>
                  <dd className="font-mono text-xs text-foreground">{detail.value}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Cover — the single Mac window moment */}
        <Reveal delay={0.1} className="mt-14">
          <MacWindow title={`${project.id} — preview`} subtitle="localhost:3000" scanline>
            <img
              src={project.image}
              alt={`${project.name} interface`}
              width={1600}
              height={900}
              className="aspect-video w-full object-cover"
            />
          </MacWindow>
        </Reveal>

        {/* Overview */}
        <section id="brief" className="mt-28 scroll-mt-24">
          <SectionHeading eyebrow="Project_details" title="The brief" />
          <div className="grid gap-8 md:grid-cols-2">
            {project.overview.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 0.06}>
                <p className="border-l border-accent/30 pl-5 text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                {feature}
              </span>
            ))}
          </Reveal>
        </section>

        {/* Challenges */}
        <section id="challenges" className="mt-28 scroll-mt-24">
          <SectionHeading
            eyebrow="Challenges_faced"
            title="What almost broke"
            description="Three problems decided whether this shipped. Select one to read the fix."
          />
          <ChallengeConsole project={project} />
        </section>

        {/* Methodology */}
        <section id="method" className="mt-28 scroll-mt-24">
          <SectionHeading
            eyebrow="Methodology_and_approach"
            title="How it was built"
            description="The sequence that turned the brief into production software."
          />
          <MethodTrack project={project} />
        </section>

        {/* Tech stack */}
        <section id="stack" className="mt-28 scroll-mt-24">
          <SectionHeading eyebrow="Tech_stack" title="What it runs on" />
          <StackDeck project={project} />
        </section>

        {/* Impact: achievements + outcomes */}
        <section id="impact" className="mt-28 scroll-mt-24">
          <SectionHeading eyebrow="Results_and_outcome" title="The impact" />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {project.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden bg-card/70 p-6 text-center"
              >
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="font-mono text-3xl font-bold text-accent text-glow">
                  <Scramble text={outcome.metric} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground">
                  {outcome.label}
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{outcome.note}</p>
              </motion.div>
            ))}
          </div>

          <ol className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
            {project.achievements.map((achievement, i) => (
              <motion.li
                key={achievement}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start gap-4 bg-card/60 p-5 transition-colors hover:bg-accent/5"
              >
                <span className="font-mono text-[10px] tabular-nums text-accent/60">0{i + 1}</span>
                <Trophy className="mt-0.5 size-4 shrink-0 text-accent opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                  {achievement}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mt-28 scroll-mt-24">
          <SectionHeading eyebrow="Gallery" title="Inside the product" description="Click any frame to expand." />
          <div className="grid gap-6 md:grid-cols-3">
            {project.gallery.map((shot, i) => (
              <Reveal key={shot.caption} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border/70 bg-card/30 text-left transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={shot.image}
                      alt={shot.caption}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="aspect-[8/5] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute right-3 top-3 rounded-full border border-accent/40 bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      expand
                    </span>
                  </div>
                  <p className="flex items-start gap-2 border-t border-border/60 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    <ChevronRight className="mt-0.5 size-3 shrink-0 text-accent" aria-hidden />
                    {shot.caption}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Next project */}
        <Reveal delay={0.1} className="mt-28">
          <Link
            to="/projects/$projectId"
            params={{ projectId: next.id }}
            className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-border bg-card/50 p-8 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <div className="relative">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Next case study</span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{next.name}</h3>
              <p className="font-mono text-xs text-muted-foreground">{next.tagline}</p>
            </div>
            <ArrowUpRight
              className="relative size-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        </Reveal>
      </main>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-6 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <MacWindow
                title={`shot_0${lightbox + 1}.png`}
                right={
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close preview"
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                }
              >
                <img
                  src={project.gallery[lightbox]!.image}
                  alt={project.gallery[lightbox]!.caption}
                  className="w-full object-cover"
                />
                <p className="border-t border-border/60 px-4 py-3 font-mono text-xs text-muted-foreground">
                  {project.gallery[lightbox]!.caption}
                </p>
              </MacWindow>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
