import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Github, Target, Wrench, Trophy, X } from "lucide-react";
import { Backdrop, Cursor, ScrollProgress } from "@/components/site/Atmosphere";
import { MacWindow, TechIcon, TrafficLights } from "@/components/site/MacWindow";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { Footer } from "@/components/site/Contact";
import { projects, projectById } from "@/data/portfolio";
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

function ProjectCaseStudy() {
  const { project } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Backdrop />
      <Cursor />
      <ScrollProgress />

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
              <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tighter sm:text-6xl">{project.name}</h1>
              <p className="max-w-[54ch] font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
                &gt; {project.tagline}
              </p>
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
            <MacWindow title={`${project.id}.meta`} bodyClassName="divide-y divide-border/60">
              {project.details.map((detail) => (
                <div key={detail.label} className="flex items-center justify-between px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="font-mono text-xs text-foreground">{detail.value}</span>
                </div>
              ))}
            </MacWindow>
          </Reveal>
        </div>

        {/* Cover */}
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
        <section className="mt-24">
          <SectionHeading eyebrow="Project_details" title="The brief" />
          <div className="grid gap-6 md:grid-cols-2">
            {project.overview.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 0.06}>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </Reveal>
        </section>

        {/* Challenges */}
        <section className="mt-24">
          <SectionHeading
            eyebrow="Challenges_faced"
            title="What almost broke"
            description="Every project has three problems that decide whether it ships. These were mine."
          />
          <div className="space-y-4">
            {project.challenges.map((challenge, i) => (
              <Reveal key={challenge.title} delay={i * 0.05}>
                <MacWindow
                  title={`issue_0${i + 1}`}
                  right={
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent">resolved</span>
                  }
                  bodyClassName="grid gap-6 p-6 md:grid-cols-2"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="size-3.5 text-destructive" aria-hidden />
                      <h3 className="font-bold text-foreground">{challenge.title}</h3>
                    </div>
                    <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">{challenge.body}</p>
                  </div>
                  <div className="space-y-2 rounded-lg border border-accent/25 bg-accent/5 p-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="size-3.5 text-accent" aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Resolution</span>
                    </div>
                    <p className="font-mono text-[13px] leading-relaxed text-foreground/90">{challenge.fix}</p>
                  </div>
                </MacWindow>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mt-24">
          <SectionHeading
            eyebrow="Methodology_and_approach"
            title="How it was built"
            description="The sequence that turned the brief into production software."
          />
          <div className="relative border-l border-border pl-8">
            {project.methodology.map((step, i) => (
              <Reveal key={step.phase} delay={i * 0.05} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[38px] top-1 grid size-4 place-items-center rounded-full border border-accent/50 bg-background">
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{step.phase}</span>
                <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-[70ch] font-mono text-[13px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mt-24">
          <SectionHeading eyebrow="Tech_stack" title="What it runs on" />
          <div className="grid gap-4 md:grid-cols-3">
            {project.stackGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.06}>
                <MacWindow title={group.label.toLowerCase()} bodyClassName="space-y-2 p-5">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:border-accent/30 hover:bg-accent/5"
                    >
                      <TechIcon name={item} size={16} />
                      <span className="font-mono text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </MacWindow>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mt-24">
          <SectionHeading eyebrow="Key_achievements" title="What shipped" />
          <div className="grid gap-4 md:grid-cols-2">
            {project.achievements.map((achievement, i) => (
              <Reveal key={achievement} delay={i * 0.05}>
                <div className="flex gap-3 rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-accent/40">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">{achievement}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="mt-24">
          <SectionHeading eyebrow="Results_and_outcome" title="The numbers" />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {project.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card/70 p-6 text-center"
              >
                <div className="font-mono text-3xl font-bold text-accent text-glow">{outcome.metric}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground">
                  {outcome.label}
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{outcome.note}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-24">
          <SectionHeading eyebrow="Gallery" title="Inside the product" description="Click any frame to expand." />
          <div className="grid gap-6 md:grid-cols-3">
            {project.gallery.map((shot, i) => (
              <Reveal key={shot.caption} delay={i * 0.06}>
                <button type="button" onClick={() => setLightbox(i)} className="group block w-full text-left">
                  <MacWindow title={`shot_0${i + 1}.png`} className="transition-transform duration-500 group-hover:-translate-y-1">
                    <img
                      src={shot.image}
                      alt={shot.caption}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="aspect-[8/5] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    />
                    <p className="border-t border-border/60 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      {shot.caption}
                    </p>
                  </MacWindow>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Next project */}
        <Reveal delay={0.1} className="mt-24">
          <Link
            to="/projects/$projectId"
            params={{ projectId: next.id }}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card/50 p-8 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Next case study</span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{next.name}</h3>
              <p className="font-mono text-xs text-muted-foreground">{next.tagline}</p>
            </div>
            <ArrowUpRight
              className="size-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        </Reveal>
      </main>

      {lightbox !== null ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-6 backdrop-blur-xl"
          onClick={() => setLightbox(null)}
        >
          <div className={cn("w-full max-w-4xl")} onClick={(event) => event.stopPropagation()}>
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
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
