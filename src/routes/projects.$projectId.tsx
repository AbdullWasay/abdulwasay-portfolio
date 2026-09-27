import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Globe, ChevronRight, ChevronLeft, ExternalLink, MousePointerClick, Check } from "lucide-react";
import { Backdrop, Cursor, ScrollProgress } from "@/components/site/Atmosphere";
import { MediaFrame, TechIcon } from "@/components/site/MacWindow";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { ProjectBrief } from "@/components/site/ProjectBrief";
import { DatabaseErd } from "@/components/site/DatabaseErd";
import { Footer } from "@/components/site/Contact";
import { projects, projectById, type Project } from "@/data/portfolio";
import { resolveStackIcon, stackIconInitials } from "@/lib/stack-icons";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$projectId")({
 loader: ({ params }) => {
 const project = projectById(params.projectId);
 if (!project) throw notFound();
 return { project };
 },
 head: ({ loaderData }) => {
 const project = loaderData?.project;
 const title = project ? `${project.name}, Case Study | Abdul Rahman` : "Case Study | Abdul Rahman";
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
 { id: "brief", label: "Overview" },
 { id: "challenges", label: "Problems" },
 { id: "method", label: "Method" },
 { id: "stack", label: "Stack" },
 { id: "schema", label: "Schema" },
];

function SectionRail({ active, items }: { active: string; items: typeof sections }) {
 return (
 <nav
 aria-label="Case study sections"
 className="pointer-events-auto fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
 >
 {items.map((section) => {
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

function useActiveSection(items: typeof sections) {
 const [active, setActive] = useState(items[0]!.id);
 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
 if (visible) setActive(visible.target.id);
 },
 { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
 );
 items.forEach((section) => {
 const el = document.getElementById(section.id);
 if (el) observer.observe(el);
 });
 return () => observer.disconnect();
 }, [items]);
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

function embedDemoUrl(demo: string) {
 const url = demo.startsWith("http") ? demo : `https://${demo}`;
 return url.replace(/\/$/, "") + "/";
}

function HeroCarousel({ project }: { project: Project }) {
  const hasGallery = project.gallery.length > 0;
  const canEmbed = Boolean(project.embedCover && project.demo);
  const liveOnly = canEmbed && !hasGallery;

  const screenshots = hasGallery
    ? project.gallery
    : canEmbed
      ? []
      : [{ image: project.image, caption: `${project.name}, preview` }];

  const [view, setView] = useState<"live" | number>(canEmbed ? "live" : 0);
  const [paused, setPaused] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const isLive = view === "live";
  const slide = typeof view === "number" ? screenshots[view]! : null;
  const embedUrl = canEmbed && project.demo ? embedDemoUrl(project.demo) : "";
  const embedDomain = embedUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Reset carousel + iframe when navigating to another project
  useEffect(() => {
    setView(canEmbed ? "live" : 0);
    setPaused(false);
    setInteractive(false);
    setIframeReady(false);
    setIframeKey((k) => k + 1);
  }, [project.id, canEmbed, project.demo]);

  useEffect(() => {
    if (isLive) return;
    if (paused || screenshots.length <= 1) return;
    const id = window.setInterval(() => {
      setView((prev) => {
        if (prev === "live") return prev;
        return (prev + 1) % screenshots.length;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, screenshots.length, isLive, project.id]);

  useEffect(() => {
    if (!isLive) setInteractive(false);
  }, [isLive]);

  const go = (dir: -1 | 1) => {
    if (isLive) return;
    setView((prev) => {
      if (prev === "live") return prev;
      return (prev + dir + screenshots.length) % screenshots.length;
    });
  };

  const thumbCount = liveOnly ? 0 : screenshots.length + (canEmbed && hasGallery ? 1 : 0);
  const viewLabel = isLive
    ? "Live site"
    : `${(view as number) + 1} / ${screenshots.length}`;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <MediaFrame
        title={isLive ? embedDomain : `${project.id}, preview`}
        subtitle={viewLabel}
        right={
          isLive && project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              Open <ExternalLink className="size-3" aria-hidden />
            </a>
          ) : undefined
        }
        scanline={!isLive}
      >
        <div className="relative h-[min(70vh,680px)] min-h-[360px] overflow-hidden bg-card/50 sm:min-h-[420px]">
          {isLive ? (
            <>
              {!iframeReady ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary/30">
                  <span className="size-6 animate-spin rounded-full border-2 border-accent/30 border-t-accent" aria-hidden />
                  <p className="font-mono text-[11px] text-muted-foreground">Loading {embedDomain}…</p>
                </div>
              ) : null}
              <iframe
                key={`${project.id}-${iframeKey}-${embedUrl}`}
                src={embedUrl}
                title={`${project.name} live preview`}
                loading="eager"
                onLoad={() => setIframeReady(true)}
                className={cn(
                  "size-full border-0 bg-white transition-opacity duration-500",
                  iframeReady ? "opacity-100" : "opacity-0",
                  !interactive && "pointer-events-none",
                )}
              />
              {!interactive && iframeReady ? (
                <button
                  type="button"
                  onClick={() => setInteractive(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/55 backdrop-blur-[2px] transition-colors hover:bg-background/45"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                    <MousePointerClick className="size-3.5" aria-hidden />
                    Click to interact
                  </span>
                  <span className="max-w-xs px-4 text-center text-xs text-muted-foreground">
                    Browse the live site here, or open it in a new tab.
                  </span>
                </button>
              ) : null}
            </>
          ) : (
 <>
 <AnimatePresence mode="wait">
 <motion.img
 key={slide!.image}
 src={slide!.image}
 alt={slide!.caption}
 width={1600}
 height={900}
 initial={{ opacity: 0, scale: 1.04 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.98 }}
 transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
 className="size-full object-cover object-top"
 />
 </AnimatePresence>

 {screenshots.length > 1 ? (
 <>
 <button
 type="button"
 onClick={() => go(-1)}
 aria-label="Previous screenshot"
 className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/70 bg-background/80 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
 >
 <ChevronLeft className="size-4" aria-hidden />
 </button>
 <button
 type="button"
 onClick={() => go(1)}
 aria-label="Next screenshot"
 className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/70 bg-background/80 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
 >
 <ChevronRight className="size-4" aria-hidden />
 </button>
 </>
 ) : null}
 </>
 )}
 </div>

 <div className="flex items-start justify-between gap-4 border-t border-border/60 px-4 py-3">
 <p className="min-w-0 flex-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
 {isLive ? embedDomain : slide!.caption}
 </p>
 {thumbCount > 1 ? (
 <div className="flex shrink-0 gap-1.5">
 {canEmbed && hasGallery ? (
 <button
 type="button"
 aria-label="Show live site"
 onClick={() => setView("live")}
 className={cn(
 "h-1.5 rounded-full transition-all duration-300",
 isLive ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-accent/50",
 )}
 />
 ) : null}
 {screenshots.map((_, i) => (
 <button
 key={i}
 type="button"
 aria-label={`Go to screenshot ${i + 1}`}
 onClick={() => setView(i)}
 className={cn(
 "h-1.5 rounded-full transition-all duration-300",
 !isLive && view === i ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-accent/50",
 )}
 />
 ))}
 </div>
 ) : null}
 </div>
 </MediaFrame>

 {thumbCount > 0 ? (
 <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
 {canEmbed && hasGallery ? (
 <button
 type="button"
 onClick={() => setView("live")}
 className={cn(
 "relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border transition-all duration-300",
 isLive ? "border-accent ring-2 ring-accent/30" : "border-border/60 opacity-60 hover:opacity-100",
 )}
 >
 <span className="flex aspect-video w-24 flex-col items-center justify-center gap-1 bg-secondary/50 sm:w-28">
 <Globe className="size-4 text-accent" aria-hidden />
 <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Live</span>
 </span>
 </button>
 ) : null}
 {screenshots.map((shot, i) => (
 <button
 key={shot.image}
 type="button"
 onClick={() => setView(i)}
 className={cn(
 "relative shrink-0 overflow-hidden rounded-lg border transition-all duration-300",
 !isLive && view === i ? "border-accent ring-2 ring-accent/30" : "border-border/60 opacity-60 hover:opacity-100",
 )}
 >
 <img
 src={shot.image}
 alt=""
 width={120}
 height={68}
 className="aspect-video w-24 object-cover object-top sm:w-28"
 />
 </button>
 ))}
 </div>
 ) : null}
 </div>
 );
}

function CaseStudyGlow() {
 return (
 <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
 <div
 className="absolute -right-1/4 top-[15%] h-[36rem] w-[36rem] rounded-full opacity-35 blur-[110px]"
 style={{ background: "linear-gradient(160deg, #38bdf8, #64748b)" }}
 />
 <div
 className="absolute -left-1/5 bottom-[10%] h-[30rem] w-[30rem] rounded-full opacity-28 blur-[100px]"
 style={{ background: "linear-gradient(40deg, #f59e0b, #fb7185)" }}
 />
 </div>
 );
}

function ProjectTitle({ text }: { text: string }) {
 return (
 <h1 className="text-4xl font-light leading-[0.95] tracking-tight sm:text-6xl">
 <span className="text-gradient-brand">{text}</span>
 </h1>
 );
}

const PHASE_COLORS = [
 { node: "border-sky-500/60 bg-sky-500/15 text-sky-300", tag: "border-sky-500/35 bg-sky-500/10 text-sky-300", card: "border-sky-500/25 bg-sky-500/[0.04]" },
 { node: "border-emerald-500/60 bg-emerald-500/15 text-emerald-300", tag: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300", card: "border-emerald-500/25 bg-emerald-500/[0.04]" },
 { node: "border-violet-500/60 bg-violet-500/15 text-violet-300", tag: "border-violet-500/35 bg-violet-500/10 text-violet-300", card: "border-violet-500/25 bg-violet-500/[0.04]" },
 { node: "border-fuchsia-500/60 bg-fuchsia-500/15 text-fuchsia-300", tag: "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300", card: "border-fuchsia-500/25 bg-fuchsia-500/[0.04]" },
 { node: "border-amber-500/60 bg-amber-500/15 text-amber-300", tag: "border-amber-500/35 bg-amber-500/10 text-amber-300", card: "border-amber-500/25 bg-amber-500/[0.04]" },
 { node: "border-cyan-500/60 bg-cyan-500/15 text-cyan-300", tag: "border-cyan-500/35 bg-cyan-500/10 text-cyan-300", card: "border-cyan-500/25 bg-cyan-500/[0.04]" },
 { node: "border-orange-500/60 bg-orange-500/15 text-orange-300", tag: "border-orange-500/35 bg-orange-500/10 text-orange-300", card: "border-orange-500/25 bg-orange-500/[0.04]" },
 { node: "border-rose-500/60 bg-rose-500/15 text-rose-300", tag: "border-rose-500/35 bg-rose-500/10 text-rose-300", card: "border-rose-500/25 bg-rose-500/[0.04]" },
 { node: "border-accent bg-accent text-accent-foreground shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--accent)_55%,transparent)]", tag: "border-accent/35 bg-accent/10 text-accent", card: "border-accent/35 bg-accent/5" },
] as const;

function parsePhase(phase: string, index: number) {
 const parts = phase.split("·").map((part) => part.trim());
 return {
 num: parts[0] ?? String(index + 1).padStart(2, "0"),
 label: parts[1] ?? phase,
 };
}

function MethodCheckpoints({ project }: { project: Project }) {
  const steps = project.methodology;
  const isCycle = steps.length > 0 && steps.every((step) => !step.body);

  if (isCycle) {
    return <MethodCycle steps={steps} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ol className="relative space-y-0">
        <div
          aria-hidden
          className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-sky-500/70 via-violet-500/40 to-accent"
        />

        {steps.map((step, i) => {
          const { num, label } = parsePhase(step.phase, i);
          const isLast = i === steps.length - 1;
          const colors = PHASE_COLORS[i % PHASE_COLORS.length]!;

          return (
            <li key={step.phase} className="relative flex gap-5 pb-10 last:pb-0">
              <Reveal delay={i * 0.04} className="flex w-full gap-5">
                <div className="relative z-10 shrink-0 pt-1">
                  <div className={cn("flex size-10 items-center justify-center rounded-full border-2 font-mono text-xs font-bold", colors.node)}>
                    {isLast ? <Check className="size-4" strokeWidth={3} aria-hidden /> : num}
                  </div>
                </div>

                <div className={cn("min-w-0 flex-1 rounded-xl border px-5 py-4", colors.card)}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest", colors.tag)}>
                      {label}
                    </span>
                    {isLast ? (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent">
                        Complete
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 text-base font-bold leading-snug text-foreground sm:text-lg">{step.title}</h3>
                  {step.body ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  ) : null}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MethodCycle({ steps }: { steps: Project["methodology"] }) {
  const n = steps.length;
  const radiusX = 40;
  const radiusY = 34;
  const [active, setActive] = useState(-1);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed || n < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, 1600);
    return () => window.clearInterval(id);
  }, [revealed, n]);

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
      <motion.div
        className="relative mx-auto aspect-[5/3.4] w-full max-w-[56rem]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        onAnimationComplete={(definition) => {
          if (definition === "show") {
            setRevealed(true);
            setActive(0);
          }
        }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
        }}
      >
        {/* Oval ring */}
        <motion.div
          aria-hidden
          className="absolute inset-[10%_8%] rounded-[50%] border border-border/80"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 8%, transparent), transparent 65%)",
          }}
          variants={{
            hidden: { opacity: 0, scale: 0.86 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-[10%_8%] rounded-[50%] border border-dashed border-accent/25"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
          }}
        />

        {/* Center hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 flex h-24 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[50%] border border-accent/35 bg-card/90 text-center shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:h-28 sm:w-40"
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
          }}
        >
          <span className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">{n}</span>
          <span className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">phases</span>
        </motion.div>

        {/* Nodes — appear one by one around the oval */}
        <ol className="absolute inset-0 list-none">
          {steps.map((step, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * radiusX;
            const y = 50 + Math.sin(angle) * radiusY;
            const { num, label } = parsePhase(step.phase, i);
            const colors = PHASE_COLORS[i % PHASE_COLORS.length]!;
            const labelDx = Math.cos(angle) * 10;
            const labelDy = Math.sin(angle) * 8;
            const isActive = active === i;

            return (
              <motion.li
                key={step.phase}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                variants={{
                  hidden: { opacity: 0, scale: 0.55 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 320, damping: 22 },
                  },
                }}
              >
                <div className="flex w-max flex-col items-center gap-2.5">
                  <motion.div
                    animate={
                      isActive
                        ? { scale: 1.12, boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)" }
                        : { scale: 1, boxShadow: "0 0 0 0px transparent" }
                    }
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold shadow-sm sm:size-14 sm:text-sm",
                      colors.node,
                      isActive && "ring-2 ring-accent/40",
                    )}
                    title={step.title}
                  >
                    {num}
                  </motion.div>
                  <motion.div
                    className="w-[13.5rem] shrink-0 text-center sm:w-[15.5rem]"
                    style={{ transform: `translate(${labelDx}px, ${labelDy}px)` }}
                    animate={{ opacity: isActive || active < 0 ? 1 : 0.55 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                      {label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs font-semibold leading-snug sm:text-sm",
                        isActive ? "text-foreground" : "text-foreground/80",
                      )}
                    >
                      {step.title}
                    </p>
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </div>
  );
}

function StackIconImg({ name }: { name: string }) {
 const icon = resolveStackIcon(name);
 const [urlIndex, setUrlIndex] = useState(0);
 const [failed, setFailed] = useState(false);
 const src = icon.iconUrls[urlIndex];
 const isWideBrand = /paynet|nova|fan courier|courier/i.test(name);

 if (failed || !src) {
 return (
 <span
 aria-hidden
 className="flex size-9 items-center justify-center rounded-lg bg-white text-[9px] font-bold text-neutral-700 shadow-sm ring-1 ring-black/5"
 >
 {stackIconInitials(icon.label)}
 </span>
 );
 }

 return (
 <span className={cn("flex items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5", isWideBrand ? "h-9 w-14 px-1" : "size-9 p-1.5")}>
 <img
 src={src}
 alt={`${icon.label} logo`}
 width={isWideBrand ? 48 : 28}
 height={28}
 loading="lazy"
 onError={() => {
 if (urlIndex < icon.iconUrls.length - 1) setUrlIndex((i) => i + 1);
 else setFailed(true);
 }}
 className="max-h-7 w-auto max-w-full object-contain"
 />
 </span>
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
 <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
 <AnimatePresence mode="popLayout">
 {active.items.map((item, i) => {
 const icon = resolveStackIcon(item);
 return (
 <motion.div
 key={`${active.label}-${item}`}
 layout
 initial={{ opacity: 0, y: 14, scale: 0.96 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, scale: 0.96 }}
 transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
 className="flex h-[120px] flex-col items-center justify-center gap-3 rounded-xl border border-border/70 bg-card/30 px-3 py-4"
 >
 {icon.hasLogo && icon.iconUrls.length > 0 ? (
 <StackIconImg name={item} />
 ) : (
 <TechIcon name={item} size={36} className="opacity-80" />
 )}
 <span className="text-center font-mono text-[11px] leading-tight text-muted-foreground">
 {icon.label}
 </span>
 </motion.div>
 );
 })}
 </AnimatePresence>
 </div>
 </div>
 );
}

function ChallengesPanel({ project }: { project: Project }) {
  const items = project.challenges;
  if (!items.length) return null;

  return (
    <section id="challenges" className="mt-28 scroll-mt-24">
      <SectionHeading
        eyebrow="Problems_and_fixes"
        title="Problems faced"
        description="Hard failures in production work, and how each one was resolved."
      />
      <div className="mt-10 space-y-4">
        {items.map((challenge, i) => (
          <Reveal key={challenge.title} delay={i * 0.05}>
            <article className="overflow-hidden rounded-2xl border border-border/70 bg-card/40">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
                <div className="min-w-0 space-y-1">
                  <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {challenge.title}
                  </h3>
                  {challenge.impact ? (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Impact · {challenge.impact}
                    </p>
                  ) : null}
                </div>
                {challenge.severity ? (
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                      challenge.severity === "Critical"
                        ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
                        : challenge.severity === "High"
                          ? "border-amber-400/40 bg-amber-500/10 text-amber-100"
                          : challenge.severity === "Medium"
                            ? "border-sky-400/40 bg-sky-500/10 text-sky-100"
                            : "border-border bg-secondary/40 text-muted-foreground",
                    )}
                  >
                    {challenge.severity}
                  </span>
                ) : null}
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-border/60 px-5 py-5 sm:border-b-0 sm:border-r sm:px-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-rose-300/80">Problem</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{challenge.body}</p>
                </div>
                <div className="px-5 py-5 sm:px-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Resolution</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{challenge.fix}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCaseStudy() {
 const { project } = Route.useLoaderData() as { project: Project };
 const hasDemo = Boolean(project.demo);
  const demoIsReport = Boolean(project.demo?.endsWith(".pdf"));
  const demoLabel = demoIsReport ? "View FYP report" : "View website now";
  const demoNavLabel = demoIsReport ? "FYP report" : "Live site";
  const showMethod =
    project.methodology.length > 0 && !project.contributionOnly && project.kind !== "static";
  const showSchema = Boolean(project.schema) && !project.contributionOnly && project.kind !== "static";
  const showChallenges = project.challenges.length > 0;
 const railSections = sections.filter((s) => {
 if (s.id === "schema" && !showSchema) return false;
 if (s.id === "method" && !showMethod) return false;
 if (s.id === "challenges" && !showChallenges) return false;
 return true;
 });
  const active = useActiveSection(railSections);
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length]!;

  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [project.id]);

  return (
 <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
 <Backdrop />
 <CaseStudyGlow />
 <Cursor />
 <ScrollProgress />
 <SectionRail active={active} items={railSections} />

 <header className="sticky top-0 z-40 overflow-visible border-b border-border/50 bg-background/75 backdrop-blur-xl">
 <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
 <Link
 to="/"
 hash="projects"
 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
 >
 ← All work
 </Link>
 <button
 type="button"
 onClick={() => scrollToTarget(0)}
 className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent sm:inline"
 >
 Top
 </button>
 {hasDemo ? (
 <a
 href={project.demo}
 target="_blank"
 rel="noopener noreferrer"
 className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent sm:inline"
 >
 {demoNavLabel}
 </a>
 ) : null}
 <span className="ml-auto font-mono text-[11px] text-foreground/70">
 ~/work/{project.id} <span className="text-accent">●</span>
 </span>
 </div>
 </header>

 <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14">
 {/* Hero */}
 {project.id === "empoweredai" ? (
 <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
 <div className="space-y-6">
 <Reveal className="space-y-4">
 <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
 Case study · {project.year}
 </span>
 <ProjectTitle text={project.name} />
 <TypedTagline text={project.tagline} />
 </Reveal>
 <Reveal delay={0.12}>
 <dl className="divide-y divide-border/60 rounded-2xl border border-border/70 bg-card/30 backdrop-blur">
 {project.details.map((detail, i) => (
 <motion.div
 key={detail.label}
 initial={{ opacity: 0, x: 14 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-accent/5"
 >
 <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{detail.label}</dt>
 <dd className="font-mono text-xs text-foreground">{detail.value}</dd>
 </motion.div>
 ))}
 </dl>
 </Reveal>
 </div>

 <Reveal delay={0.1} className="lg:sticky lg:top-24">
 <figure className="overflow-hidden rounded-2xl border border-border/70 bg-card/20 p-2 sm:p-3">
 <img
 src={project.image}
 alt={`${project.name} poster, Sense Beyond Limits`}
 className="mx-auto h-auto w-full object-contain"
 />
 <figcaption className="mt-3 px-1 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
 Full project poster
 </figcaption>
 </figure>
 </Reveal>
 </div>
 ) : (
 <>
 <div className="grid gap-10 lg:grid-cols-12">
 <div className="space-y-6 lg:col-span-7">
 <Reveal className="space-y-4">
 <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
 {project.contributionOnly ? "Feature work" : "Case study"} · {project.year}
 </span>
 <ProjectTitle text={project.name} />
 <TypedTagline text={project.tagline} />
 </Reveal>
 {hasDemo ? (
 <Reveal delay={0.1} className="flex flex-wrap gap-3">
 <a
 href={project.demo}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-outline-gradient btn-outline-gradient-hover inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-foreground"
 >
 <ArrowUpRight className="size-3.5" aria-hidden /> {demoLabel}
 </a>
 </Reveal>
 ) : null}
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
 <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{detail.label}</dt>
 <dd className="font-mono text-xs text-foreground">{detail.value}</dd>
 </motion.div>
 ))}
 </dl>
 </Reveal>
 </div>

 <Reveal delay={0.1} className="mt-14">
 <HeroCarousel key={project.id} project={project} />
 </Reveal>
 </>
 )}

 {/* Brief, dynamic cards + architecture */}
 <ProjectBrief project={project} />

 {showChallenges ? <ChallengesPanel project={project} /> : null}

 {/* Methodology */}
 {showMethod ? (
 <section id="method" className="mt-28 scroll-mt-24">
 <SectionHeading
 eyebrow="Methodology_and_approach"
 title="How it was built"
 description={
 project.methodology.every((step) => !step.body)
 ? `${project.methodology.length}-phase delivery cycle from foundation to launch.`
 : `${project.methodology.length} checkpoints from first commit to production, each phase building on the last.`
 }
 />
 <MethodCheckpoints project={project} />
 </section>
 ) : null}

 {/* Tech stack */}
 <section id="stack" className="mt-28 scroll-mt-24">
 <SectionHeading eyebrow="Tech_stack" title="What it runs on" />
 <StackDeck project={project} />
 </section>

 {showSchema && project.schema ? <DatabaseErd schema={project.schema} /> : null}

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

 <Footer />
 </div>
 );
}
