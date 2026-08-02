import { useEffect, useRef, useState } from "react";
import { profile, skillGroups, projects } from "@/data/portfolio";
import { TrafficLights } from "./MacWindow";

const help = [
  "available commands:",
  "  help       list commands",
  "  about      who I am",
  "  skills     technology matrix",
  "  projects   recent work",
  "  contact    how to reach me",
  "  resume     download instructions",
  "  clear      wipe the buffer",
];

function run(command: string): string[] {
  switch (command.trim().toLowerCase()) {
    case "help":
      return help;
    case "about":
      return [profile.summary, `location: ${profile.location}`, `experience: ${profile.years} years`];
    case "skills":
      return skillGroups.map((group) => `${group.category.padEnd(12)} ${group.items.join(", ")}`);
    case "projects":
      return projects.slice(0, 4).map((project) => `${project.year}  ${project.name} — ${project.tech.join(" / ")}`);
    case "contact":
      return [`email: ${profile.email}`, ...profile.socials.map((social) => `${social.label}: ${social.url}`)];
    case "resume":
      return ["resume.pdf is not attached yet — add the file and this command will serve it."];
    case "":
      return [];
    default:
      return [`command not found: ${command}. try 'help'.`];
  }
}

export function TerminalSection() {
  const [lines, setLines] = useState<string[]>(["welcome to abdul.sh — type 'help' to begin", ""]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  return (
    <section id="terminal" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/80 bg-background/85 shadow-[0_28px_90px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="relative flex items-center gap-2 border-b border-border/70 bg-gradient-to-b from-secondary/70 to-secondary/20 px-4 py-2.5">
          <TrafficLights />
          <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[11px] tracking-wide text-foreground/80">
            abdul — zsh — 96×24
          </span>
        </div>
        <div ref={scrollRef} className="h-72 space-y-1 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed">
          {lines.map((line, index) => (
            <p key={index} className={line.startsWith("$") ? "text-accent" : "text-muted-foreground"}>
              {line}
            </p>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (value.trim().toLowerCase() === "clear") {
              setLines([]);
              setValue("");
              return;
            }
            setLines((previous) => [...previous, `$ ${value}`, ...run(value), ""]);
            setValue("");
          }}
          className="flex items-center gap-2 border-t border-border px-5 py-3"
        >
          <span className="font-mono text-sm text-accent">$</span>
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="terminal-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command"
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </form>
      </div>
    </section>
  );
}