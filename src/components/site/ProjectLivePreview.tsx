import { useState } from "react";
import { cn } from "@/lib/utils";

function embedDemoUrl(demo: string) {
  const url = demo.startsWith("http") ? demo : `https://${demo}`;
  return url.replace(/\/$/, "") + "/";
}

type ProjectLivePreviewProps = {
  demo: string;
  name: string;
  className?: string;
};

/** Compact live iframe for homepage project cards — non-interactive by default. */
export function ProjectLivePreview({ demo, name, className }: ProjectLivePreviewProps) {
  const [ready, setReady] = useState(false);
  const embedUrl = embedDemoUrl(demo);
  const domain = embedUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className={cn("relative size-full bg-secondary/30", className)}>
      {!ready ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span
            className="size-5 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
            aria-hidden
          />
          <p className="font-mono text-[10px] text-muted-foreground">Loading {domain}…</p>
        </div>
      ) : null}
      <iframe
        src={embedUrl}
        title={`${name} live preview`}
        loading="lazy"
        tabIndex={-1}
        onLoad={() => setReady(true)}
        className={cn(
          "pointer-events-none size-full border-0 bg-white transition-opacity duration-500",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function projectUsesLiveGridPreview(project: {
  embedCover?: boolean;
  demo?: string;
  gallery?: unknown[];
}) {
  return Boolean(project.embedCover && project.demo && (!project.gallery || project.gallery.length === 0));
}
