import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Loader2, Minus, Plus, RotateCcw } from "lucide-react";
import { SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

function ZoomableMermaid({ code, title, defaultScale = 1.2 }: { code: string; title: string; defaultScale?: number }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(defaultScale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    setScale(defaultScale);
  }, [code, defaultScale]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSvg(null);

    import("https://esm.sh/mermaid@11.6.0")
      .then(async (mod) => {
        const mermaid = mod.default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#162123",
            primaryTextColor: "#f5f7f7",
            primaryBorderColor: "#38bdf8",
            lineColor: "#9a958c",
            secondaryColor: "#12151b",
            tertiaryColor: "#0c0e12",
            attributeBackgroundColorOdd: "#12151b",
            attributeBackgroundColorEven: "#0c1018",
            fontSize: "15px",
          },
          er: { useMaxWidth: false, layoutDirection: "TB", diagramPadding: 24 },
        });
        const { svg: rendered } = await mermaid.render(`erd-${id}-${Date.now()}`, code);
        if (!cancelled) setSvg(rendered);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Diagram render failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(4, Math.max(0.4, +(s + delta).toFixed(1))));
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      zoom(e.deltaY > 0 ? -0.15 : 0.15);
    }
  }, [zoom]);

  return (
    <div className="overflow-hidden media-frame bg-card">
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface/80 px-4 py-2.5">
        <Database className="size-3.5 text-accent" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title}</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="mr-2 hidden font-mono text-[9px] text-muted-foreground/70 sm:inline">Ctrl + scroll to zoom</span>
          <button type="button" onClick={() => zoom(-0.2)} aria-label="Zoom out" className="rounded-md border border-border bg-card p-1.5 text-muted-foreground hover:border-accent/50 hover:text-accent">
            <Minus className="size-3.5" />
          </button>
          <span className="min-w-[3ch] text-center font-mono text-[10px] text-muted-foreground">{Math.round(scale * 100)}%</span>
          <button type="button" onClick={() => zoom(0.2)} aria-label="Zoom in" className="rounded-md border border-border bg-card p-1.5 text-muted-foreground hover:border-accent/50 hover:text-accent">
            <Plus className="size-3.5" />
          </button>
          <button type="button" onClick={() => setScale(defaultScale)} aria-label="Reset zoom" className="rounded-md border border-border bg-card p-1.5 text-muted-foreground hover:border-accent/50 hover:text-accent">
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="relative h-[min(70vh,640px)] overflow-auto bg-background p-6"
      >
        {loading ? (
          <div className="flex h-full min-h-[400px] items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-accent" aria-hidden />
            Rendering ERD…
          </div>
        ) : null}
        {error ? (
          <p className="flex h-full min-h-[400px] items-center justify-center px-4 text-center font-mono text-xs text-destructive">{error}</p>
        ) : null}
        {svg ? (
          <div
            className="inline-block min-w-full origin-top-left [&_svg]:min-w-[900px] [&_svg_text]:fill-[#e8eef6] [&_svg_.entityBox]:fill-[#0c1018] [&_svg_.entityLabel]:fill-[#38bdf8]"
            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function DatabaseErd({ schema }: { schema: NonNullable<Project["schema"]> }) {
  const tabs = schema.domains.map((d, i) => ({
    id: `domain-${i}`,
    label: d.label,
    mermaid: d.mermaid,
    scale: 1.15,
  }));
  const [active, setActive] = useState(0);
  const tab = tabs[active]!;

  return (
    <section id="schema" className="mt-28 scroll-mt-24">
      <SectionHeading
        eyebrow="Database_schema"
        title="Entity relationship diagram"
        description={`${schema.modelCount} models on ${schema.provider}`}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors",
              i === active ? "border-accent/50 text-accent" : "border-border text-muted-foreground hover:border-accent/30",
            )}
          >
            {i === active ? <motion.span layoutId="erd-pill" className="absolute inset-0 rounded-full bg-accent/10" /> : null}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {tab.mermaid ? <ZoomableMermaid code={tab.mermaid} title={tab.label} defaultScale={tab.scale} /> : null}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
