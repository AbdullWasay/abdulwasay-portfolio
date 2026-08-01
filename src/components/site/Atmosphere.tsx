import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent accent-glow"
    />
  );
}

export function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const count = Math.min(90, Math.floor(width / 16));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight };
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const render = () => {
      context.clearRect(0, 0, width, height);
      const mx = pointer.current.x * width;
      const my = pointer.current.y * height;

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dist = Math.hypot(p.x - mx, p.y - my);
        const near = Math.max(0, 1 - dist / 260);
        context.beginPath();
        context.arc(p.x, p.y, p.r + near * 1.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(74, 255, 148, ${0.12 + near * 0.5})`;
        context.fill();

        if (near > 0.12) {
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(mx, my);
          context.strokeStyle = `rgba(74, 255, 148, ${near * 0.14})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div
        className="absolute inset-0 animate-drift"
        style={{ backgroundImage: "var(--gradient-aurora)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;

    const move = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, input, textarea, [data-cursor]"));
      if (ring.current) ring.current.dataset["active"] = interactive ? "true" : "false";
    };

    let frame = 0;
    const loop = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      frame = window.requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-accent" />
      <div
        ref={ring}
        data-active="false"
        className="absolute left-0 top-0 size-9 rounded-full border border-accent/40 transition-[width,height,opacity] duration-200 data-[active=true]:border-accent data-[active=true]:bg-accent/10"
      />
    </div>
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPct((value) => {
        const next = value + Math.random() * 18 + 6;
        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setDone(true), 320);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-background"
    >
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">Booting console</div>
      <div className="h-px w-56 overflow-hidden bg-border">
        <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </div>
      <div className="font-mono text-4xl font-bold text-foreground tabular-nums">{Math.floor(pct)}%</div>
    </motion.div>
  );
}