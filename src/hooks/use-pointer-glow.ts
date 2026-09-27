import { useEffect, type RefObject } from "react";

type Options = {
  defaultX?: number;
  defaultY?: number;
  lerp?: number;
  influence?: number;
};

/**
 * Lightweight pointer-follow wash — inspired by LantroTech's craft,
 * without the full spring/title-coupling stack.
 */
export function usePointerGlow(
  rootRef: RefObject<HTMLElement | null>,
  {
    defaultX = 0.72,
    defaultY = 0.42,
    lerp = 0.08,
    influence = 0.85,
  }: Options = {},
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = defaultX;
    let targetY = defaultY;
    let currentX = defaultX;
    let currentY = defaultY;
    let active = 0;
    let targetActive = 0;
    let frame = 0;
    let running = true;

    const paint = () => {
      root.style.setProperty("--glow-x", `${currentX * 100}%`);
      root.style.setProperty("--glow-y", `${currentY * 100}%`);
      root.style.setProperty("--glow-active", String(active));
    };

    const tick = () => {
      if (!running) return;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      active += (targetActive - active) * 0.06;
      paint();

      const settled =
        Math.abs(currentX - targetX) < 0.0008 &&
        Math.abs(currentY - targetY) < 0.0008 &&
        Math.abs(active - targetActive) < 0.01;

      if (settled) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const aim = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      const nx = (clientX - rect.left) / Math.max(rect.width, 1);
      const ny = (clientY - rect.top) / Math.max(rect.height, 1);
      targetX = defaultX + (Math.min(1, Math.max(0, nx)) - defaultX) * influence;
      targetY = defaultY + (Math.min(1, Math.max(0, ny)) - defaultY) * influence;
      targetActive = 1;
      start();
    };

    const onEnter = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const onMove = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const onLeave = () => {
      targetX = defaultX;
      targetY = defaultY;
      targetActive = 0;
      start();
    };

    paint();
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [rootRef, defaultX, defaultY, lerp, influence]);
}
