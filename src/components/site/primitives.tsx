import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  blur?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(4px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/** Bottom-to-top text rise used across the site. */
export function TextRise({
  children,
  delay = 0,
  y = 48,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
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

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 900 }}
      className={cn("relative will-change-transform", className)}
      whileHover={{ z: 20 }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
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
      ease: easeOut,
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to]);

  const formatted =
    to >= 1000 && decimals === 0 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(decimals);

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

export function SplitTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h2 className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1 text-foreground", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.04 + i * 0.055, ease: easeOut }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

const WASHES = {
  cyan: {
    a: "linear-gradient(135deg, #38bdf8, #64748b)",
    b: "linear-gradient(200deg, #818cf8, #38bdf8)",
    aPos: "-left-24 top-0",
    bPos: "right-[-18%] bottom-[-10%]",
  },
  ember: {
    a: "linear-gradient(160deg, #64748b, #818cf8)",
    b: "linear-gradient(40deg, #38bdf8, #6366f1)",
    aPos: "right-[-12%] top-[-18%]",
    bPos: "left-[-18%] bottom-[-8%]",
  },
  rose: {
    a: "linear-gradient(200deg, #818cf8, #64748b)",
    b: "linear-gradient(120deg, #38bdf8, #94a3b8)",
    aPos: "left-[10%] top-[-20%]",
    bPos: "right-[-8%] bottom-[5%]",
  },
  slate: {
    a: "linear-gradient(145deg, #94a3b8, #64748b)",
    b: "linear-gradient(220deg, #38bdf8, #818cf8)",
    aPos: "-right-20 top-[10%]",
    bPos: "-left-24 bottom-[15%]",
  },
} as const;

export function SectionShell({
  id,
  children,
  className,
  wash = "cyan",
  dense = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  wash?: keyof typeof WASHES;
  dense?: boolean;
}) {
  const palette = WASHES[wash];
  return (
    <section id={id} className={cn("relative overflow-hidden", dense ? "py-14" : "py-20 md:py-24", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute h-[22rem] w-[22rem] rounded-full opacity-[0.12] blur-[100px] md:h-[30rem] md:w-[30rem]",
            palette.aPos,
          )}
          style={{ background: palette.a }}
        />
        <div
          className={cn(
            "absolute h-[18rem] w-[18rem] rounded-full opacity-[0.09] blur-[90px] md:h-[24rem] md:w-[24rem]",
            palette.bPos,
          )}
          style={{ background: palette.b }}
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <div className="h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-[#64748b]/55 to-transparent" />
        </div>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-7xl justify-center px-6">
          <div className="h-px w-16 bg-[#818cf8]/50" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <TextRise>{children}</TextRise>
      </div>
    </section>
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
    <div className="relative mb-12 md:mb-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <TextRise y={28}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {eyebrow.replace(/_/g, " ")}
            </span>
          </TextRise>
          <TextRise y={52} delay={0.06}>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.85rem] md:leading-[1.05]">
              {title}
            </h2>
          </TextRise>
          {description ? (
            <TextRise y={36} delay={0.12}>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground">{description}</p>
            </TextRise>
          ) : null}
        </div>
        {right ? <TextRise delay={0.14}>{right}</TextRise> : null}
      </div>
    </div>
  );
}
