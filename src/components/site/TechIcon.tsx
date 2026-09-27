import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { resolveStackIcon, stackIconInitials } from "@/lib/stack-icons";

/**
 * Renders actual brand logos via resolveStackIcon (direct CDN / simple-icons / iconify).
 * Falls through icon URL candidates on error.
 */
export function TechIcon({
  name,
  className,
  size = 22,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const resolved = resolveStackIcon(name);
  const urls = resolved.iconUrls;
  const [index, setIndex] = useState(0);
  const src = urls[index];

  if (!src || index >= urls.length) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-tight text-accent",
          className,
        )}
        style={{ width: size, height: size, fontSize: Math.max(8, size * 0.32) }}
        title={resolved.label}
      >
        {stackIconInitials(resolved.label)}
      </span>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={`${resolved.label} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
      onError={() => setIndex((prev) => prev + 1)}
    />
  );
}
