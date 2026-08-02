import { useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { stack, profile } from "@/data/portfolio";
import { TechIcon } from "./MacWindow";
import { cn } from "@/lib/utils";

const rings = [
  { radius: 118, duration: 26 },
  { radius: 172, duration: 38 },
  { radius: 226, duration: 52 },
];

export function OrbitStack() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      {rings.map((ring) => (
        <div
          key={ring.radius}
          aria-hidden
          className="absolute rounded-full border border-accent/10"
          style={{ width: ring.radius * 2, height: ring.radius * 2 }}
        />
      ))}
      <div className="absolute size-40 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative z-10 size-32 rotate-3 rounded-2xl border-2 border-accent/30 bg-card p-1 accent-glow">
        <img
          src={profileImg}
          alt={`${profile.fullName}, ${profile.role}`}
          width={640}
          height={640}
          className="size-full rounded-xl object-cover"
        />
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          {profile.initials}
        </span>
      </div>
      {stack.map((tech, index) => {
        const ring = rings[Math.min(tech.ring, rings.length - 1)]!;
        const sameRing = stack.filter((item) => item.ring === tech.ring);
        const offset = (sameRing.indexOf(tech) / sameRing.length) * ring.duration;
        const isActive = hovered === tech.name;

        return (
          <div
            key={tech.name}
            className="absolute animate-orbit"
            style={
              {
                "--orbit-radius": `${ring.radius}px`,
                "--orbit-duration": `${ring.duration}s`,
                animationDelay: `-${offset}s`,
                animationPlayState: paused ? "paused" : "running",
                zIndex: index,
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              onMouseEnter={() => setHovered(tech.name)}
              onFocus={() => setHovered(tech.name)}
              aria-label={tech.name}
              className={cn(
                "relative grid size-12 place-items-center rounded-xl border bg-background/80 backdrop-blur transition-all duration-300",
                isActive
                  ? "scale-125 border-accent accent-glow"
                  : "border-border/80 hover:border-accent/50",
              )}
            >
              <TechIcon
                name={tech.name}
                size={22}
                className={cn("transition-all duration-300", isActive ? "opacity-100" : "opacity-70 saturate-[0.6]")}
              />
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-8 whitespace-nowrap rounded border border-border bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-foreground transition-opacity",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                {tech.name}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}