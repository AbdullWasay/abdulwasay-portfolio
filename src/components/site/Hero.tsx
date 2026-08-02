import { ArrowRight, Download, MessageSquare, Mail } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { AIConsole } from "./AIConsole";
import { OrbitStack } from "./OrbitStack";
import { Magnetic } from "./primitives";
import { profile, stack } from "@/data/portfolio";
import { TechIcon } from "./MacWindow";

const ctas = [
  { label: "Explore projects", href: "#projects", icon: ArrowRight, primary: true },
  { label: "Ask AI about me", href: "#ai-input", icon: MessageSquare },
  { label: "Download resume", href: "#resume", icon: Download },
  { label: "Contact me", href: "#contact", icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {profile.availability}
            </span>
            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl">
              Hi, I&apos;m {profile.name}.
              <span className="mt-2 block text-accent text-glow">Full Stack</span>
              Software Engineer.
            </h1>
            <p className="max-w-[52ch] font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
              &gt; {profile.summary}
            </p>
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
            className="flex flex-wrap gap-3"
          >
            {ctas.map((cta) => (
              <Magnetic key={cta.label}>
                <a
                  href={cta.href}
                  onClick={
                    cta.href === "#resume"
                      ? (event) => {
                          event.preventDefault();
                          toast.info("Resume", { description: "Attach your PDF to enable the download." });
                        }
                      : undefined
                  }
                  className={
                    cta.primary
                      ? "inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground"
                      : "inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  }
                >
                  <cta.icon className="size-3.5" aria-hidden />
                  {cta.label}
                </a>
              </Magnetic>
            ))}
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