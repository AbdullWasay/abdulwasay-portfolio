import { ArrowRight, Command } from "lucide-react";
import { motion } from "motion/react";
import { AIConsole } from "./AIConsole";
import { OrbitStack } from "./OrbitStack";
import { Magnetic } from "./primitives";
import { profile, stack } from "@/data/portfolio";
import { TechIcon } from "./MacWindow";

const facts = [
  { k: "Focus", v: "Full stack" },
  { k: "Exp", v: `${profile.years} yrs` },
  { k: "Base", v: profile.location.replace("Remote — ", "") },
];

export function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="space-y-9 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {profile.availability}
            </span>
            <h1 className="text-[clamp(2.9rem,9vw,6.5rem)] font-extrabold leading-[0.86] tracking-tighter">
              <span className="block text-beam">{profile.fullName}</span>
              <span className="mt-5 block font-mono text-[clamp(0.7rem,1.6vw,1.05rem)] font-normal uppercase tracking-[0.42em] text-muted-foreground">
                {profile.role}
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-l-2 border-accent/40 pl-4">
              {facts.map((fact) => (
                <div key={fact.k}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70">{fact.k}</p>
                  <p className="font-mono text-sm text-foreground">{fact.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <AIConsole />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <ArrowRight className="size-3.5" aria-hidden />
                Explore work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Hire me
              </a>
            </Magnetic>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              <Command className="size-3" aria-hidden />K for everything else
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <OrbitStack />
        </motion.div>
      </div>
    </section>
  );
}

export function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="relative overflow-hidden border-y border-border py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((tech, index) => (
          <span
            key={`${tech.name}-${index}`}
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <TechIcon name={tech.name} size={16} className="opacity-70" />
            {tech.name}
            <span className="ml-7 text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}