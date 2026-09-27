import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "education", label: "Education" },
  { id: "toolkit", label: "Toolkit" },
  { id: "chat", label: "Chat" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToTarget(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4",
          scrolled
            ? "border-border/90 bg-background/85 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            : "border-transparent bg-background/35 backdrop-blur-md",
        )}
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            go("home");
          }}
          className="pl-1 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Abdul Wasay
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(section.id);
                }}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[12px] transition-colors",
                  active === section.id
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-1.5 rounded-full border border-border/80 bg-background/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground sm:inline-flex"
          >
            <Command className="size-3" aria-hidden />
            K
          </button>
          <a
            href={`#contact`}
            onClick={(event) => {
              event.preventDefault();
              go("contact");
            }}
            className="hidden rounded-full bg-[linear-gradient(135deg,#64748b,#38bdf8)] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_8px_20px_-12px_rgba(56,189,248,0.5)] transition-opacity hover:opacity-90 md:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-xl border border-border text-foreground xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden"
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm transition-colors",
                      active === section.id
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-white/[0.04]",
                    )}
                  >
                    {section.label}
                    {active === section.id ? (
                      <span className="size-1.5 rounded-full bg-accent" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
