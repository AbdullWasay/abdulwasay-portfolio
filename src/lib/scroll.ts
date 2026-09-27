import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll to a section id, element, or pixel offset — uses Lenis when available. */
export function scrollToTarget(
  target: string | number | HTMLElement,
  options?: { offset?: number; immediate?: boolean },
) {
  const offset = options?.offset ?? (typeof target === "number" ? 0 : -72);
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;

  const motion = options?.immediate
    ? { immediate: true }
    : { duration: 0.85 };

  if (typeof target === "number") {
    if (lenis) {
      lenis.scrollTo(target, { offset, ...motion });
    } else {
      window.scrollTo({ top: target, behavior: options?.immediate ? "auto" : "smooth" });
    }
    return;
  }

  const resolved = typeof target === "string" ? (target.startsWith("#") ? target : `#${target}`) : target;

  if (lenis) {
    lenis.scrollTo(resolved, { offset, ...motion });
    return;
  }

  if (typeof resolved === "string") {
    document.querySelector(resolved)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    resolved.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
