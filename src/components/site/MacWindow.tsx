import type { ReactNode } from "react";
import { techIconUrl, techBySlug } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function TrafficLights({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-hidden>
      <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.45)]" />
      <span className="size-3 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.4)]" />
      <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.4)]" />
    </div>
  );
}

export function MacWindow({
  title,
  subtitle,
  right,
  children,
  className,
  bodyClassName,
  scanline = false,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  scanline?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="relative flex items-center gap-3 border-b border-border/70 bg-gradient-to-b from-secondary/70 to-secondary/30 px-4 py-2.5">
        <TrafficLights />
        <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center">
          <span className="font-mono text-[11px] tracking-wide text-foreground/80">{title}</span>
          {subtitle ? (
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
        <div className="ml-auto flex items-center gap-2">{right}</div>
      </div>
      {scanline ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 h-px animate-scanline bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      ) : null}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export function TechIcon({
  name,
  className,
  size = 22,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const tech = techBySlug(name);
  if (!tech || !tech.slug) {
    return (
      <span
        className={cn("font-mono text-[9px] font-bold uppercase tracking-tight text-accent", className)}
        style={{ fontSize: Math.max(8, size * 0.42) }}
      >
        {(tech?.short ?? name.slice(0, 3)).slice(0, 4)}
      </span>
    );
  }
  return (
    <img
      src={techIconUrl(tech.slug, tech.color)}
      alt={`${tech.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
