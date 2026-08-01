import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Primary">
        <a href="#home" className="flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">System.Active</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active === section.id ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
                {active === section.id ? (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-accent" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Command className="size-3" aria-hidden />
          <span>K</span>
        </button>
      </nav>
    </header>
  );
}