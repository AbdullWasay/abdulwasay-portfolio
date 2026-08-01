import { motion, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-flex", className)}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to]);

  const formatted =
    to >= 1000 && decimals === 0
      ? `${(value / 1000).toFixed(1)}k`
      : value.toFixed(decimals);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export function Scramble({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>/\\";

  const run = () => {
    let frame = 0;
    const interval = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) =>
            index < frame / 2 || char === " " ? char : chars[Math.floor(Math.random() * chars.length)],
          )
          .join(""),
      );
      frame += 1;
      if (frame / 2 >= text.length) {
        window.clearInterval(interval);
        setDisplay(text);
      }
    }, 28);
  };

  return (
    <span className={className} onMouseEnter={run}>
      {display}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl space-y-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">// {eyebrow}</span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {description ? <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p> : null}
      </Reveal>
      {right ? <Reveal delay={0.1}>{right}</Reveal> : null}
    </div>
  );
}