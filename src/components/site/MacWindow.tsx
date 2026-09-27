import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Flat gradient-border shell — replaces Mac window chrome. */
export function MediaFrame({
  title,
  subtitle,
  right,
  children,
  className,
  bodyClassName,
  headerClassName,
  scanline = false,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  scanline?: boolean;
}) {
  const showHeader = Boolean(title || subtitle || right);

  return (
    <div className={cn("media-frame", className)}>
      {showHeader ? (
        <div
          className={cn(
            "relative flex items-center gap-3 border-b border-border/60 bg-surface/80 px-4 py-3",
            headerClassName,
          )}
        >
          <div className="min-w-0 flex-1">
            {title ? (
              <p className="truncate font-mono text-[11px] tracking-wide text-foreground/85">{title}</p>
            ) : null}
            {subtitle ? (
              <p className="truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </div>
          {right ? <div className="ml-auto flex shrink-0 items-center gap-2">{right}</div> : null}
        </div>
      ) : null}
      {scanline ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 h-px animate-scanline bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
      ) : null}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** @deprecated Use MediaFrame — kept as alias for gradual migration. */
export function MacWindow(props: Parameters<typeof MediaFrame>[0] & { showTrafficLights?: boolean }) {
  const { showTrafficLights: _ignored, ...rest } = props;
  return <MediaFrame {...rest} />;
}

/** @deprecated Prefer importing from ./TechIcon — re-exported for compatibility. */
export { TechIcon } from "./TechIcon";

