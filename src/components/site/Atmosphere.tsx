import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, #38bdf8 7%, transparent), transparent 55%)",
        }}
      />
    </div>
  );
}

export function Cursor() {
  return null;
}

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 24 + 12);
      setPct(value);
      if (value >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setHidden(true), 350);
      }
    }, 60);
    return () => window.clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-background"
    >
      <div className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Loading</div>
      <div className="h-px w-40 overflow-hidden bg-border">
        <div className="h-full bg-accent transition-[width] duration-100" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-2xl font-medium tabular-nums text-foreground">{Math.floor(pct)}%</div>
    </div>
  );
}
