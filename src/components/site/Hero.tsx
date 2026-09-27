import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AIConsole } from "./AIConsole";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { TextRise } from "./primitives";
import { profile, projects, resumeDownloadName, resumeUrl, stack } from "@/data/portfolio";
import { TechIcon } from "./MacWindow";
import { scrollToTarget } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

const metrics = [
  { label: "Years shipping", value: `${profile.years}+` },
  { label: "Products live", value: `${projects.length}` },
  { label: "Based in", value: "Islamabad" },
];

function RiseLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const nameParts = profile.fullName.split(" ");

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <HeroAtmosphere />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="space-y-8">
          <RiseLine delay={0.05}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#94a3b8] sm:text-base">
              {profile.role}
            </p>
          </RiseLine>

          <div className="space-y-5">
            <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-foreground">
              {nameParts.map((part, i) => (
                <span key={part} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.12 + i * 0.1, ease }}
                    className="inline-block pr-[0.22em]"
                  >
                    {part}
                  </motion.span>
                </span>
              ))}
            </h1>

            <RiseLine delay={0.32}>
              <p className="max-w-[38ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.tagline}
              </p>
            </RiseLine>
          </div>

          <RiseLine delay={0.42} className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToTarget("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#64748b,#38bdf8)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(56,189,248,0.55)] transition-[transform,opacity] hover:opacity-95 active:scale-[0.98]"
            >
              View selected work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <a
              href={resumeUrl}
              download={resumeDownloadName}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-[#94a3b8]/40 hover:bg-white/[0.06]"
            >
              <Download className="size-4 text-[#94a3b8]" aria-hidden />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => scrollToTarget("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-[#94a3b8]/40 hover:bg-white/[0.06]"
            >
              <Mail className="size-4 text-[#94a3b8]" aria-hidden />
              Hire me
            </button>
            <a
              href={profile.socials[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-[#c4b5fd]"
            >
              @{profile.socials[0]?.handle}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </RiseLine>

          <RiseLine delay={0.52}>
            <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {metrics.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </RiseLine>
        </div>

        <RiseLine delay={0.35} className="lg:justify-self-end lg:w-full lg:max-w-md">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-2xl opacity-40 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, #38bdf8 25%, transparent), transparent 60%)",
              }}
            />
            <AIConsole />
          </div>
        </RiseLine>
      </div>
    </section>
  );
}

export function StackMarquee() {
  const items = [...stack, ...stack];
  const tint = ["#64748b", "#38bdf8", "#818cf8", "#94a3b8", "#6366f1", "#7dd3fc"];
  return (
    <TextRise>
      <div className="relative overflow-hidden border-y border-border/70 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
        />
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {items.map((tech, index) => (
            <span
              key={`${tech.name}-${index}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-2 text-sm text-foreground/85 backdrop-blur-sm"
            >
              <span
                className="grid size-7 place-items-center rounded-full"
                style={{ background: `color-mix(in srgb, ${tint[index % tint.length]} 18%, #f4f6f8)` }}
              >
                <TechIcon name={tech.name} size={15} />
              </span>
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </TextRise>
  );
}
